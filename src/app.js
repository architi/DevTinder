const express = require("express");
const app = express();
const ConnectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUp } = require("./utils/validatation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const {userAuth} = require("./middlewares/Auth");


app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  //creating new instance in the collection.
  //validation , validator , util fn
  //password encription from validation ,passwordHash
  //save the user in db with the passwordHash saltround password
  try {
    //validation
    validateSignUp(req);

    const { firstName, lastName, emailId, password } = req.body;

    //password encryption
    const passwordHash = await bcrypt.hash(password, 10);

    //saving the data in db with the passwordHash
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("new user has succesfully been created!" + user);
  } catch (error) {
    res.status(400).send("error in signing up please check" + error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const validUser = await User.findOne({ emailId: emailId });
    if (!validUser) {
      throw new Error("invalid credentials");
    }

    const validPassword = await bcrypt.compare(password, validUser.password);
    if (validPassword) {

      //creating a JWT token
      const {token} = await jwt.sign({_id:User._id},"mysecret@key", { expiresIn: "7d" });

      res.cookie("token", token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
      res.send("successful login!");
    } else {
      throw new Error("invalid credentials");
    }
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log("hi welcome back"+ user);

    res.send(user);

} catch (error) {
  res.status(400).send("please log in again");
}
});

app.post("/sendConnectionRequest", userAuth, async(req,res)=>{
  try{
    console.log("connection request sent");
   res.send("connection request sent");
  }catch(error){
    res.status(400).send("error in sending connection request");
  }
})
app.get("/feed", async (req, res) => {
  try {
    const feed = await User.find({});
    res.send(feed);
  } catch (error) {
    res.status(400).send("error saving the user" + error.message);
  }
});

app.get("/user", async (req, res) => {
  const UserEmailId = req.body.emailId;

  try {
    const users = await User.find({ emailId: UserEmailId });
    res.send(users);
  } catch (error) {
    res.send("error has been detected in fetching user by emailId");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const del = await User.findByIdAndDelete(userId);
    //const del = await User.findByIdAndDelete({_id: userId});

    res.send("deleted this successfully", del);
  } catch (err) {
    res.status(400).send("caught some error");
  }
});

//API - to update data of the user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const updationAllowed = ["skills", "gender"];
    const checkUpdation = Object.keys(data).every((key) =>
      updationAllowed.includes(key),
    );

    if (!checkUpdation) {
      throw new Error("update not allowed");
    }

    if (data?.skills.length > 10) {
      throw new Error("skills cant be more than 10");
    }
    const user = await User.findOneAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("user updated successfully!");
  } catch (error) {
    res.status(400).send("something went wrong while updating");
  }
});

ConnectDB()
  .then(() => {
    console.log("now the db is connect and only THEN the server is listening");
    app.listen(7777, () => {
      console.log("Server is listening / running on port 7777");
    });
  })
  .catch((error) => {
    console.log("caught an error in connecting the DB mb dawg");
  });

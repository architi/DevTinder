const express = require("express");
const app = express();
const ConnectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
  } catch (error) {
    res.status(400).res("error in signing up please check" + error.message);
  }
});

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
    const checkUpdation = object
      .keys(data)
      .every((key) => updationAllowed.includes(key));

    if (!checkUpdation) {
      throw new error("update not allowed");
    }

    if (data?.skills.length>10) {
      throw new error("skills cant be more than 10")
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

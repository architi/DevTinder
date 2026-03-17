const express = require("express");
const ConnectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.get("/feed", async (req, res) => {
  try {
    const feed = await User.find({});
    res.send(feed);
  } catch (error) {
    res.status(400).send("error saving the user" + error.message);
  }
});

app.get("/user", async (req,res) => {
    const UserEmailId = req.body.emailId;

    try {
        const users = await User.find({ emailId : UserEmailId });
        res.send(users)

    } catch (error) {
        res.send("error has been detected in fetching user by emailId")
    }
})

app.delete("/user",async(req,res) => {
   const userId = req.body.userId;
   try {
    const del = await User.findByIdAndDelete(userId);
    //const del = await User.findByIdAndDelete({_id: userId});

    res.send("deleted this successfully",del);
   } catch (err) {
    res.status(400).send("caught some error")
   }
})

//API - to update data of the user 
app.patch("/user",async(req,res)=>{
    const userIdToUpdate = req.body.userId;
    const updatedData = req.body;

    try {
         await User.findOneAndUpdate({_id:userIdToUpdate},updatedData);   
    } catch (error) {
        res.status(400).send("something went wrong while updating")
    }
})

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

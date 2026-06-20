const express = require("express");
const app = express();
const ConnectDB = require("./config/database");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const requestRouter = require("./routes/request");
const profileRouter = require("./routes/profile");

app.use("/", (req,res,next)=>{
  next();
})

app.post("/user", (req,res)=>{
  next();
},
(req,res)=>{
  res.send("hello from second middleware but i am a request handler cause i am sending the actual response to the client");
})


// //API - to update data of the user
// app.patch("/user/:userId", async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;

//   try {
//     const updationAllowed = ["skills", "gender"];
//     const checkUpdation = Object.keys(data).every((key) =>
//       updationAllowed.includes(key),
//     );

//     if (!checkUpdation) {
//       throw new Error("update not allowed");
//     }

//     if (data?.skills.length > 10) {
//       throw new Error("skills cant be more than 10");
//     }
//     const user = await user.findOneAndUpdate({ _id: userId }, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });
//     console.log(user);
//     res.send("user updated successfully!");
//   } catch (error) {
//     res.status(400).send("something went wrong while updating");
//   }
// });

ConnectDB()
  .then(() => {
    console.log("now the db is connect and only THEN the server is listening");
    app.listen(7777, () => {
      console.log("Server is listening / running on port 7777");
    });
  })
  .catch((error) => {
    console.log("caught an error in connecting the database:" + error.message);
  });

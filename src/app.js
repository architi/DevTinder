const express = require("express");
const app = express();
const ConnectDB = require("./config/database");
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const requestRouter = require("./routes/request");
const profileRouter = require("./routes/profile");

/*** 
 upating the data present in database

app.patch("/user", async(req,res)=>{
  const userId = req.body.userId;
  const data = req.body;
  const finding = User.findByIdAndUpdate(userId, data, { runValidators: true }) 
  })
***/

ConnectDB()
  .then(() => {
    console.log("database is connected and only THEN the server is listening");
    app.listen(7777, () => {
      console.log("Server is listening / running on port 7777");
    });
  })
  .catch((error) => {
    console.log("caught an error in connecting the database due to:" + error.message);
});

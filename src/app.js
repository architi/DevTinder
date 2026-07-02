const express = require("express");
const app = express();
const ConnectDB = require("./config/database");
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");


app.use("/", authRouter);
app.use("/", profileRouter); 
app.use("/", requestRouter);

/*** 
 upating the data present in database

app.patch("/user", async(req,res)=>{
  const userId = req.body.userId;
  const data = req.body;
  const finding = User.findByIdAndUpdate(userId, data, { runValidators: true }) 
  })

  api level validation
app.patch("/user", async(req,res)=>{
  const userData = req.body;
  const allowedFieldsForUpdate = ["name", "skills"];
  const canIUpdate = Object.keys(userData).every((k) => allowedFieldsForUpdate.includes(k));
  if(!canIUpdate){
  throw new error("sorry smth went wrong")}
  })

  signup api
  app.post("/signup", async(req,res)=>{

    //validation of our signup req.body
    const validationSignUp = (req)=>{
      //destructer using js
      const {firstName,lastName,password,emailId} = req.body;

      if(!firstName || !lastName){
      throw new Error("please fill the fields")}
      elseif(!validator.isEmailId(emailId)){
      throw new error("please fill the emailId correctly")}
      }

      //encrypt the password
      
      //destructure the fields
      const {emailId, password, firstName, lastName} = req.body;

      //encrypt the password
      const passwordHash = await bcrypt(password,10);

      //save the user model instance and User is the class from our schema
      const user = new User ({
        firstName,
        lastName,
        password:passwordHash,
        emailId
      })
        await user.save();
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

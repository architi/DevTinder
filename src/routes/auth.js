const express = require("express");
const authRouter = express.Router();
const { validateSignUp } = require("../utils/validatation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//login api
/*** 
 //this is where compare happens cause we want to check the password and this is where jwt is created and res is sent via cookie
  
 {emailId, password} = req.body
 const emailValid = User.findOne({emailId:emailId});

 await bcrypt.compare(password,passwordHash);
 //create jwt if the password correct too
 const token = await jwt.sign({_id:user_id},"key");

 sending it off
 res.cookie ("token",token);

 //profileedit api accesiing the cookie
 app.patch("/profile", async(res,req)=>{
    const cookie = req.cookies;
    //destructing the token out 
    {token} = cookie;
    //veryfing that token
    const myToken = await jwt.verify(token,"key");
    const {_id} = myToken
  })


*/

authRouter.post("/signup", async (req, res) => {
  //creating new instance in the database-collection
  //validation , validator , util fn
  //password encription from validation ,passwordHash
  //save the user in db with the passwordHash saltround password
  try {
    //validation
    validateSignUp(req);

    //extract fields
    const { firstName, lastName, emailId, password } = req.body;

    //password encryption by hashing
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

//jwt token is made during login
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("invalid credentials");
    }

    //bcyprt.compare is happening in user schema its a method now called validatePassword
    const validPassword = await user.validatePassword(password);

    if (validPassword) {
      //creating a JWT token
      //jwt.sign is sent off to userSchema its now a method
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      res.send("login successfully!");
    } else {
      throw new Error("invalid credentials");
    }
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

authRouter.post("/logout", async(req,res) => {
  //token set to null and expire the cookie
  res.cookie("token",null,{expires: new Date(Date.now())});
  res.json({ message: `${req.user.firstname} logged out successfully` });
})
module.exports = authRouter;

const express = require("express");
const authRouter = express.Router();
const { validateSignUp } = require("../utils/validatation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const validUser = await User.findOne({ emailId: emailId });
    if (!validUser) {
      throw new Error("invalid credentials");
    }

    const validPassword = await validUser.validatePassword(password);
    if (validPassword) {
      //creating a JWT token
      const token = await validUser.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      res.send("successful login!");
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

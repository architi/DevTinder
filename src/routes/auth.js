const express = require("express");
const authRouter = express.Router();
const { validateSignUp } = require("../utils/validatation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/auth");

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
      res.send(user);
    } else {
      throw new Error("invalid credentials");
    }
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

authRouter.post("/logout", userAuth, async (req, res) => {
  //token set to null and expire the cookie
  const firstName = req.user.firstName;
  res.cookie("token", null, { expires: new Date(Date.now()) });
  //or res.clearCookie("token");
  res.json({
    message: `${firstName} logged out successfully`,
  });
});
module.exports = authRouter;

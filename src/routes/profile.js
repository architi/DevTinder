const express = require("express");

const profileRouter = express.Router();
const { userAuth } = require("../middlewares/Auth");
const { validateProfileEdit } = require("../utils/validatation");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log("hi welcome back" + user);

    res.send(user);
  } catch (err) {
    res.status(400).send("please log in again: " + err.message);
  }
});

profileRouter.patch("/profileEdit", userAuth, async(req, res) => {
  try {
    if (!validateProfileEdit(req)) {
      throw new Error("invalid fields");
    }
    
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key)=>{
      loggedInUser[key] = req.body[key]
    })

    await loggedInUser.save();
    res.json({ name: loggedInUser.firstName, message: "Profile updated successfully" });

  } catch (error) {
    res.status(400).send("some error occurred: " + error.message);
  }
});


profileRouter.patch("/profileEditPassword", userAuth, async(req,res)=>{
  try{
    const {newPassword} = req.body;

    if(!validator.isStrongPassword(newPassword)){
      throw new Error("Password is not strong enough");
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    req.user.password = passwordHash;
    await req.user.save();

    res.json({ message: "Password updated successfully" });
  } 
  catch (error) {
    res.status(400).send("some error occurred: " + error.message);
  }
})

module.exports = profileRouter;
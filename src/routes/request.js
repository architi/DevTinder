const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/Auth");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    console.log("connection request sent");
    res.send("connection request sent");
  } catch (error) {
    res.status(400).send("error in sending connection request");
  }
});

module.exports = requestRouter;

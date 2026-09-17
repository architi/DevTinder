const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/Auth");
const ConnectionRequest = require("../models/connectionRequest");

//dynamic for interested & ignored
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const status = req.params.status;
    const toUserId = req.params.toUserId;

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    res.json({
      message:"connection request sent successfully",
      data,
    })

  } catch (error) {
    res.status(400).send("ERROR:"+ error.message);
  }

  res.send(req.user.firstName + "sent the connection request");
});

module.exports = requestRouter;
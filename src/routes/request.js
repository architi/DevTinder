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

    //checking if the status is valid
    const allowedFields = ["interested","ignored"];
    if(!allowedFields.includes(status)){
      return res
      .status(400)
      .json({ message:"invalid status type:"+ status});
    }

    //checking for duplicate request
//   $or: [
//   { fromUserId: A, toUserId: B },   // Akshay → Architi
//   { fromUserId: B, toUserId: A },   // Architi → Akshay
// ]
    const existingRequest = await ConnectionRequest.findOne({
      $or:[
        {fromUserId,toUserId},
        {fromUserId:toUserId, toUserId:fromUserId}
      ]
    });

    if(existingRequest){
      return res.status(400).json({
        message: "request already sent to this user, please wait for their response"
      })
    }

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
});

module.exports = requestRouter;



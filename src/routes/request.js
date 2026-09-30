const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/Auth");
const ConnectionRequest = require("../models/connectionRequest");

const User = require("../models/user");

//dynamic for interested & ignored only
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const status = req.params.status;
    const toUserId = req.params.toUserId;

//CHECK1
    //checking if the status is valid
    const allowedFields = ["interested","ignored"];
    if(!allowedFields.includes(status)){
      return res
      .status(400)
      .json({ message:"invalid status type:"+ status});
    }

//CHECK2
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

//CHECK3
    //checking for toUserId exists in the db 
    const toUser = await User.findById(toUserId);
    if(!toUser){
      return res.status(404).json({
        message:"user with this id does not exist"
      })
    }

//CHECK4
 //checking if the user is trying to send request to themselves
 //pre save hook in the connectionRequestSchema 

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    res.json({
      message: req.user.firstName + " " + status + " " + toUser.firstName,
      data,
    });

  } catch (error) {
    res.status(400).send("ERROR:"+ error.message);
  }
});

requestRouter.post("/request/recieve/:status/:requestId", userAuth,
  async(req,res)=>{
    try{
      //get dets from the request
      const loggedInUser = req.user;
      const{status, requestId} = req.params;

      //validate status
      const allowedStatus = ["accepted","rejected"];
      if(!allowedStatus.includes(status)){
        return res.status(400).json({
          message:"status not allowed"
        });
      }

      //validate connection
      const connectionRequest = await ConnectionRequest.findById({
        _id: requestId,
        toUserId: loggedInUser._Id,
        status: "interested",
      });
      if(!connectionRequest){
        return res.status(404).json({
          message:"connection request not found"
        });
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

    }catch(error){
      res.status(400).send("ERROR:"+error.message);
    }
    
  });
  

module.exports = requestRouter;



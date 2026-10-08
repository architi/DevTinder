const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/Auth");
let connectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = ["firstName", "lastName", "photoUrl", "age", "gender", "skills", "about"];

userRouter.get("/user/request/received", userAuth, async (req, res) => {
    try{
        //reviewing pending req means interested other users but the loggedIn user have not accepted or rejected the req yet

        const loggedInUser = req.user;
        const connectionRequests = await connectionRequest
          .find({
            toUserId: loggedInUser._id,
            status: "interested",
          })
          .populate("fromUserId", "firstName lastName photoUrl age gender skills about");

        res.json({
            message:"data fetched successfully",
            data: connectionRequests,
        })

    }catch(err){
       res
       .statusCode(400)
       .send("ERROR:" + err.message);
    }
});

userRouter.get("/user/connections", userAuth, async(req,res)=>{
    
    try{
        const loggedInUser = req.user;
        const connections = await connectionRequest
        .find({
          $or: [
            {toUserId: loggedInUser._id, status: "accepted" },
            {fromUserId: loggedInUser._id, status:"accepted"},
          ],
        })
        .populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA);

        const data = connections.map(
            (row)=>{
                if(row.fromUserId._id.toString() ===  loggedInUser._id.toString()){
                    return row.toUserId;
                }
                return row.fromUserId;
          });
        res.json({data});
    }catch(err){
        res
        .status(400)
        .send("ERROR:" +err.message);
    }
})

module.exports = userRouter;
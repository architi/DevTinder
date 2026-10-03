const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/Auth");
let connectionRequest = require("../models/connectionRequest");

userRouter.get("/user/request/received", userAuth, async (req, res) => {
    try{
        //reviewing pending req means interested other users but the loggedIn user have not accepted or rejected the req yet

        const loggedInUser = req.user;
        const connectionRequests = await connectionRequest.find({
            toUserId : loggedInUser._id,
            status: "interested",
        })

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

module.exports = userRouter;
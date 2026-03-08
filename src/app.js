const express = require("express");
const app = express();
const {adminAuth, userAuth } = require("./middlewares/Auth.jsx")

//way 1 specifically look out for this route but this is a good way to do it 
app.get("/route",(err,req,res,next)=>{
    try {
        //logic
        throw new Error("this is an error");
    } catch (error) {
        res.status(500).send("something went wrong , contact support team");
    }
})

//way 2 this is a universal way this handles all errors in the app as the route is "/" and uses the "use" method
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong , contact support team");
    }
});


app.listen(7777,()=>{
    console.log("Server is listening / running on port 7777");
})
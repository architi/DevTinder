const express = require("express");
const app = express();
const {adminAuth, userAuth } = require("./middlewares/Auth.jsx")

app.use("/route", adminAuth);

app.get("/route/One", (req,res)=>{
    res.send("user data sent");
})

app.delete("/user/data",userAuth, (req,res) => {
    res.send("user data has been deleted!");
})

app.use("/user/login", (req,res)=>{
    res.send("hi there!")
})

app.listen(7777,()=>{
    console.log("Server is listening / running on port 7777");
})
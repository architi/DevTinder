const express = require("express");
const ConnectDB = require("./config/database");
const app = express();

ConnectDB()
    .then(()=>{
        console.log("now the db is connect and only THEN the server is listening");
        app.listen(7777,()=>{
            console.log("Server is listening / running on port 7777");
        });
    })
    .catch((error)=>{
    console.log("caught an error mb dawg")
    });



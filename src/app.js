const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("this is req handler for test route");
});

app.use("/hello", (req, res) => {
  res.send("hello from 7777 port");
 });

app.listen(7777, () => {
  console.log("welcome, 7777 web server is listening!");
});

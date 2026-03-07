const express = require("express");
const app = express();

app.use("/home", (req, res) => {
  res.send("welcome this is the home page");
});

app.get("/user", (req, res) => {
  res.send({ firstName: "architi", lastName: "dadhwal" });
});

app.post("/user", (req, res) => {
  res.send("omg it looks like the db has saved the data sucessfully");
});

app.put("/user", (req, res) => {
  res.send("data updated successfully");
});

app.delete("/user", (req, res) => {
  res.send("you rmbr the data? yeah its deleted now");
});

app.listen(7777, () => {
  console.log("hello user!the server is listening on port 7777");
});

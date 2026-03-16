const express = require("express");
const ConnectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.get("/signup", async (req, res) => {

  const useremailId = req.body.emailId;

  try {
    const matchEmail = new User.findOne({emailId : useremailId});
    res.send(matchEmail);
  } catch (error) {
    res.status(400).send("error saving the user" + error.message);
  }
});

ConnectDB()
  .then(() => {
    console.log("now the db is connect and only THEN the server is listening");
    app.listen(7777, () => {
      console.log("Server is listening / running on port 7777");
    });
  })
  .catch((error) => {
    console.log("caught an error in connecting the DB mb dawg");
  });

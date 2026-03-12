const { default: mongoose } = require("mongoose");
const Mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
});

const User = Mongoose.model("User", userSchema);
module.exports = User;

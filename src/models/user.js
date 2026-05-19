const { default: mongoose } = require("mongoose");
const validator = require("validator");
const Mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
  },

  lastName: {
    type: String,
    minLength: 3,
    maxLength: 15,
  },

  emailId: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
    trim: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("invalid email address:" + value);
      }
    },
  },

  password: {
    type: String,
    minLength: 2,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Oops! not a strong password, try again" + value);
      }
    },
  },

  skills: {
    type: [String],
  },
 
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("gender data is not valid");
      }
    },
  },
},
  {timestamps:true},
);

const User = Mongoose.model("User", userSchema);
module.exports = User;

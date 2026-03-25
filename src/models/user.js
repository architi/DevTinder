const { default: mongoose } = require("mongoose");
const Mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
    minLength: 2,
    maxLength: 20,
  },
  lastName: {
    type: String,
    minLength: 2,
    maxLength: 20,
  },
  emailId: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    minLength: 2,
    maxLength: 20,
  },
  skills: {
    type: [String],
  },
  phoneNumber: {
    type: Number,
    default: "XXX-XXXX-XXX",
    min: 10,
    max: 10,
  },
  gender:{
    type: String,
    validate(value){
      if(!["male","female","others"].includes(value)){
        throw new error ("gender data is not valid")
      }
    }
  },
  timestamp: true,
});

const User = Mongoose.model("User", userSchema);
module.exports = User;

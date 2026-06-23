const { default: mongoose } = require("mongoose");
const validator = require("validator");
const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


// userSchema is a class
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
    required: true,
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

userSchema.methods.getJWT = async function(){
  const user = this;

  const token = jwt.sign({_id:user._id},"mysecret@key",{expiresIn:"7d"});
  return token;
}

userSchema.methods.validatePassword = async function(password){
  const user = this;
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
}

//User is an instance/model of the class userSchema
const User = Mongoose.model("User", userSchema);
module.exports = User;

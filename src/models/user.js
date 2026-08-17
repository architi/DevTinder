const { default: mongoose } = require("mongoose");
const validator = require("validator"); // built in fn that helps with validation for fields
const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// userSchema is class
const userSchema = new mongoose.Schema(
  {
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
      enum: {
        values: ["male", "female", "others"],
        message: `gender data is not valid, please try again`,
      },
      // validate(value) {
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("gender data is not valid");
      //   }
      // },
    },
  },
  { timestamps: true }, //creates updated and created timestamp in db for each user instances
);

//jwt token offloaded here to make cause it is closely related to user and called back in login api

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id }, "mysecret@key", {
    expiresIn: "7d",
  });

  return token;
};

//takes in the password by user and compare it from the db's hashed password to match
userSchema.methods.validatePassword = async function (passwordByUser) {
  const user = this;
  const passwordHash = user.password;

  const isMatch = await bcrypt.compare(passwordByUser, passwordHash);
  return isMatch;
};

//User is an instance/model of the class userSchema
const User = Mongoose.model("User", userSchema);
module.exports = User;

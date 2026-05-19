const jwt = require("jsonwebtoken");
const user = require("../models/user");

const cookies = require()
const userAuth = async(req, res, next) => {
  try {
    //get the cookie by require then extract the token from the cookie
    const cookies = req.cookies;
    const {token} = cookies;
    if(!token){
      throw new Error("No token provided");
    }
  
    //verify token
    const decodedObj =  await jwt.verify(token,"mysecret@key");
  
    //return user token/ data if valid
    const {_id} = decodedObj;
  
    const user = await User.findById(_id);
    if(!user){
      throw new Error("user does not exist");
    }
    next();
   
  } catch (error) {
    res.status(401).send("Unauthorized: " + error.message);
  }
};

module.exports = {
  userAuth,
};

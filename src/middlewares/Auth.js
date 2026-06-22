//the userAuth middleware is responsible for verifying the user's authentication status by checking the token sent in the cookie. It ensures that only authenticated users can access protected routes, such as viewing and editing their profiles. If the token is valid, it allows the request to proceed; otherwise, it responds with an unauthorized error message.

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const cookies = require();

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

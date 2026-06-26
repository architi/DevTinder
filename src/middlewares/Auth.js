//for all the other APIs token authentication
// the userAuth middleware is responsible for verifying the user's authentication status by checking the token sent in the cookie. It ensures that only authenticated users can access protected routes, such as viewing and editing their profiles. If the token is valid, it allows the request to proceed; otherwise, it responds with an unauthorized error message.

//cookie issue!

//verification of token and sending the user in req back 

const jwt = require("jsonwebtoken");
const User = require("../models/user");


const userAuth = async(req, res, next) => {
  try {
    //get the cookie by require then extract/destructure the token from the cookie
    // const cookies = req.cookie;
    const {token} = req.cookies;
    if(!token){
      throw new Error("No token provided");
    }
  
    //verify token
    const decodedObj = jwt.verify(token,"mysecret@key");
  
    //return user token/ data if valid
    const {_id} = decodedObj;
 
    const user = await User.findById(_id);
    if(!user){
      throw new Error("user does not exist");
    }
    req.user = user;
    next();
   
  } catch (error) {
    res.status(401).send("Unauthorized: " + error.message);
  }
};

module.exports = {
  userAuth,
};


const validator = require("validator");

const validateSignUp = (req) => {
    const {firstName,lastName,emailId,password} = req.body;

    if(!firstName || !lastName ){
        throw new Error("error with your name");
    }else if (!validator.isEmail(emailId)){
        throw new Error ("invalid email address");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("not a strong enough password");
    }
}
module.exports = {validateSignUp}; 
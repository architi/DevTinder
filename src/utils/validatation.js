const validator = require("validator");

const validateSignUp = (req)=>{
    const {firstName,lastName,emailId,password} = req.body;

    if(!firstName || !lastName ){
        throw new error("error with your name");
    }else if (!validator.isEmail(emailId)){
        throw new error ("invalid email address");
    }else if(!validator.isStrongPassword(password)){
        throw new error("not a strong enough password");
    }
}

exports.modules = {validateSignUp}; 

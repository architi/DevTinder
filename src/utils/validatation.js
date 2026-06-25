//api level validation function for checking req.body data 

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

const validateProfileEdit = (req) => {
    const allowedFields = ["firstName", "lastName", "skills", "gender"];

    const isValid = Object.keys(req.body).every((field) => allowedFields.includes(field));

    return isValid;
}
module.exports = {validateSignUp, validateProfileEdit}; 
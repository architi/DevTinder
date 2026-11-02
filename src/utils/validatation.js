//api level validation function for checking req.body data

const validator = require("validator");

const validateSignUp = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("error with your name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("invalid email address");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("not a strong enough password");
  }
};

const validateProfileEdit = (req) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "skills",
    "gender",
    "about",
    "photoUrl",
    "age",
  ];

  const isValid = Object.keys(req.body).every((field) =>
    allowedFields.includes(field),
  );

  if (!isValid) {
    throw new Error("Invalid fields in profile update.");
  }

  if (req.body.age !== undefined) {
    const age = req.body.age;

    if (
      typeof age !== "number" ||
      !Number.isInteger(age) ||
      age < 10 ||
      age > 100
    ) {
      throw new Error("Age must be a whole number between 10 and 100.");
    }
  }

  return true;
};

module.exports = { validateSignUp, validateProfileEdit };

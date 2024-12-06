const Validator = require("validator");
const validateSignUpData = (req) => {
  /**Extract the mandatory data for signup */
  const { firstName, lastName, emailId, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   const existingUser = await User.find({ emailId });
  /**Validate presence of all required fields */
  if (!firstName || !lastName || !emailId || !password) {
    throw new Error("All fields are required.");
  } else if (!emailRegex.test(emailId)) {
    throw new Error("Invalid Email Format");
  } else if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  } else if (!Validator.isStrongPassword(password)) {
    throw new Error("Password in weak make a Strong Password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "about",
    "skills",
    "gender",
    "age",
  ];

  const isEditAllowed= Object.keys(req.body).every((field) => allowedEditFields.includes(field));
  return isEditAllowed;
};

module.exports = { validateSignUpData, validateEditProfileData };

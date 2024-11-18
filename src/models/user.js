const mongoose = require("mongoose");

/** Creating the Schema */
const userSchema = new mongoose.Schema({
 
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

/** Creating the model */
const User= mongoose.model("User", userSchema);
module.exports= User;
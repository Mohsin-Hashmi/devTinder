const mongoose = require("mongoose");

/** Creating the Schema */
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
      trim:true
    },
    lastName: {
      type: String,
      trim:true
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match:[
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regex to validate email pattern
        'Please Provide a Valid Email....'
      ]
    },
    password: {
      type: String,
      required: true,
      minLength: [6, 'Password must be at least 6 characters long']
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Invalid gender");
        }
      },
    },
    photoUrl: {
      type: String,
    },
    about: {
      type: String,
      default: "This is a default about of the user",
    },
    skills: {
      type: [String],
      
    },
  },
  {
    timestamps: true,
  }
);

/** Creating the model */
const User = mongoose.model("User", userSchema);
module.exports = User;

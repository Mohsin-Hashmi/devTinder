const express= require('express');
const authRouter= express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");
/**Create the POST API */
authRouter.post("/signup", async (req, res, next) => {
    try {
      validateSignUpData(req);
      /**Hash the password before saving */
      const { firstName, lastName, emailId, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      /**Creating the new instance of the User model */
      const users = new User({
        firstName,
        lastName,
        emailId,
        password: hashedPassword,
      });
  
      await users.save();
      res.json({ message: "User signed up successfully" });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  });


/**Creating the login API */
authRouter.post("/login", async (req, res) => {
    try {
      const { emailId, password } = req.body;
      if (!validator.isEmail(emailId)) {
        return res.status(400).send("Invalid Email ID ");
      }
      const user = await User.findOne({ emailId: emailId });
      if (!user) {
        throw new Error("Invalid Credentials");
      }
      const isPasswordValid = await user.validatePassword(password)
      if (isPasswordValid) {
        // Creating the JWT token
  
        const token = await user.getJWT();
        // Add a token in to Cookie and send back to the user.
  
        res.cookie("token", token, {expires: new Date(Date.now() + 900000)});
        res.json({ message: "Login Successfully!!!" });
      } else {
        throw new Error("Invalid Credentials");
      }
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }); 


module.exports= authRouter;

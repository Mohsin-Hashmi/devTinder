const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res, next) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
    /**Hash the password before saving */
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

    if (!emailId || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const user = await User.findOne({ emailId });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const token = await user.getJWT();
    res.cookie("token", token, { httpOnly: true });

    res.status(200).json(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post('/logout', async(req,res)=>{
  try{
    res.cookie("token", null, {
      expires: new Date(Date.now())
    })
    res.json({message: "User logged out successfully"})
  }catch(err){
    res.status(400).send("ERROR: " + err.message);
  }
})


module.exports = authRouter;

const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
/**Creating the API to get the profile of the user by using userAuth middleware */
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
    if (!user) {
      throw new Error("User Not Found");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;

const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
/**Creating the API to get the profile of the user by using userAuth middleware */
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User Not Found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;

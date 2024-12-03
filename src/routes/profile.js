const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
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

/**Creating the API to edit the profile of the user */
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request!!");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({message: `${loggedInUser.firstName} your profile updated successfully.`, data:loggedInUser});
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});


/**Creating the API to Update the password of the user forget password API */
profileRouter.patch("/profile/password", async(req,res)=>{
  try{

  }catch(err){
    res.status(400).send("ERROR : " + err.message);
  }
});
module.exports = profileRouter;

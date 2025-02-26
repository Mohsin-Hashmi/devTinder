const jwt = require("jsonwebtoken");
const User = require("../models/user");
/** user Auth middleware
 *  Read the token from the req cookies
 *  validate the token
 *  Find the user
 */
const userAuth = async (req, res, next) => {
  try {
    // Read the token
    const cookies = req.cookies;
    const { token } = cookies;


    // validate the token
    if(!token){
      return res.status(401).send("Please Login");
    }
    const decodedObj = await jwt.verify(token, "DEV@Tinder$798");/**Verify the token */
    if(!decodedObj){
      throw new Error("Invalid token");
    }
    const { _id } = decodedObj;/**Exract the user id from the token */
 
    const user = await User.findById(_id);/**Finding the user id in database */
    if (!user) {
      throw new Error("User Not Found");
    }

    req.user= user;
    next();/**it is used to move control to next request handler.*/ 
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};
module.exports = { userAuth };

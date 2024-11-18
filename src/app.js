const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { adminAuth, userAuth } = require("./middlewares/auth");

app.use(
  express.json()
); /* Express JSON middleware it convert JSON data to Javascript object...*/

/**Create the POST API */
app.post("/signup", async (req, res, next) => {
  /** Creating a new instance of the User Model */
  const users = new User(req.body);
  try {
    await users.save();
    res.send("User added Successfully...");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

/**Creating the GET API to find or get the data of single user... */
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    }else{
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something went wrong!!");
  }
});
/**Creating the Feed API - GET/Feed - get all the user from the database...*/
app.get("/feed", async (req, res) => {
  try{
    const users= await User.find({});
    res.send(users);
  }catch(err){
    res.status(400).send("something went wrong!!");
  }
});
/**Creating the API to find user by Id */
app.get('/userId',async (req,res)=>{
  const userID =req.body._id;
  try{
    const user=await User.findById({_id:userID});
    if(!user){
      res.status(404).send('User not found!');
    }else{
      res.send(user);
    }

  }catch(err){
    res.status(400).send("something went wrong!!");
  }
})
/**Connection to the Database and Staring the Server... */
connectDB()
  .then(() => {
    console.log("connected to database...");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected");
  });

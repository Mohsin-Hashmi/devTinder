const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("./utils/validation");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(
  express.json()
); /* Express JSON middleware it convert JSON data to Javascript object...*/

app.use(cookieParser()); /* cookie-parser middleware it parse cookie data */

/**Create the POST API */
app.post("/signup", async (req, res, next) => {
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
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      return res.status(400).send("Invalid Email ID ");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      // Creating the JWT token.
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$798");
      // Add a token in to Cookie and send back to the user.
      res.cookie("token", token);
      res.json({ message: "Login Successfully!!!" });
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

/**Creating the API to get the profile of the user by using userAuth middleware */
app.get("/profile", userAuth, async (req, res) => {
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

/**Creating the send connection request API */
app.post('/sendConnectionRequest', async (req,res)=>{
  try{

  }catch(err){
    res.status(400).send("ERROR : " + err.message);
  }
})

/**Creating the GET API to find or get the data of single user... */
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  if (!userEmail) {
    return res.status(400).json({ error: "Email ID is required..." });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userEmail)) {
    return res.status(400).json({ error: "Invalid email format..." });
  }
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something went wrong!!");
  }
});

/**Creating the Feed API - GET/Feed - get all the user from the database...*/
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong!!");
  }
});

/**Creating the API to find user by Id */
app.get("/userId", async (req, res) => {
  const userID = req.body._id;
  if (!userID) {
    return res.status(400).json({ error: "User Id not Exist..." });
  } else {
    try {
      const user = await User.findById({ _id: userID });
      if (!user) {
        res.status(404).send("User not found!");
      } else {
        res.send(user);
      }
    } catch (err) {
      res.status(400).send("something went wrong!!");
    }
  }
});

/**Creating the API to delete the user by Id */
app.delete("/user", async (req, res) => {
  const userId = req.body._id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).send("User not found!");
    } else {
      res.send("User Deleted Successfully!!!!");
    }
  } catch (err) {
    res.status(400).send("something went wrong!!");
  }
});

/**Creating the API to update the user by Id */
app.patch("/user/:_id", async (req, res) => {
  const userId = req.params?._id;
  const data = req.body;

  try {
    const ALLOWED_UPDATED = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATED.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update Not Allowed!!!");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    if (req.body.skills.length > 10) {
      res.status(400).json({ meaage: "Skills can't be more than 10." });
    }
    if (!user) {
      res.status(404).send("User not found!");
    } else {
      res.send("User updated Successfully!!!");
    }
  } catch (err) {
    res.status(400).send("something went wrong!!" + err.message);
  }
});

/**Creating the API to update the user by emailId */
app.patch("/user/emailId", async (req, res) => {
  const userEmailId = req.body.emailId;
  const data = req.body;
  try {
    const user = await User.updateOne({ emailId: userEmailId }, data);
    if (!user) {
      res.status(404).send("User not found!");
    } else {
      res.send("User updated Successfully!!!");
    }
  } catch (err) {
    res.status(400).send("something went wrong!!");
  }
});

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

const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { adminAuth, userAuth } = require("./middlewares/auth");

app.use(express.json());

/**Create the POST API */
app.post("/signup", async (req, res, next) => {
  try {
    /** Creating a new instance of the User Model */
    const users = new User(req.body);
    await users.save();
    res.send("User added Successfully...");
  } catch (err) {
    res.status(400).send("Error saving the user:"+ err.message);
  }
});

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

const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

app.use(
  express.json()
); /* Express JSON middleware it convert JSON data to Javascript object...*/

app.use(cookieParser()); /* cookie-parser middleware it parse cookie data */

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);

/**Connection to the Database and Staring the Server... */
connectDB()
  .then(() => { 
    console.log("connected to database...");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected" + err.message);
  });

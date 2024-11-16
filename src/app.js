const express = require("express");
const app = express();
const {adminAuth,userAuth}= require("./middlewares/auth")

 /**below this the middleware because it execute in all the request handlers */
app.use("/admin", adminAuth);



app.get("/user", userAuth, (req,res)=>{
  res.send("user data sent");
});
app.get("/admin/getAllData", (req, res) => {
  res.send("All data sent");
});
app.get("/admin/deleteUser", (req, res) => {
  res.send("User Deleted");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});

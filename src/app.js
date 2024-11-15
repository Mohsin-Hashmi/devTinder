const express = require("express");
const app = express();

// This is will only handle GET to /user
app.get("/user", (req, res) => {
  res.send({
    firstName: "Mohsin",
    lastName: "Hashmi",
  });
});

app.post("/user", (req, res) => {
    // saving data to the DB
  console.log("save data to the database");
  res.send("data successfully saved to the database!");
});

app.put("/user", (req, res)=>{
    res.send({
        firstName: "Mohsin",
        lastName: "Hashmi",
        city: "Islamabad"
      });
});

app.patch("/user", (req,res)=>{
    res.send("patch response is send")
})
app.delete("/user", (req,res)=>{
    res.send(
        {
            lastName: "Hashmi"
        }
    );
})
// this is match all the http methods APIs calls to /test
app.use("/test", (req, res) => {
  res.send("test");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});

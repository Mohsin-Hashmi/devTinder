const express = require("express");
const app = express();

// // This is will only handle GET to /user
// app.get("/user/:userId/:name/:password", (req, res) => {
//     console.log(req.params);
//   res.send({
//     firstName: "Mohsin",
//     lastName: "Hashmi",
//   });
// });

// app.post("/user", (req, res) => {
//     // saving data to the DB
//   console.log("save data to the database");
//   res.send("data successfully saved to the database!");
// });

// app.put("/user", (req, res)=>{
//     res.send({
//         firstName: "Mohsin",
//         lastName: "Hashmi",
//         city: "Islamabad"
//       });
// });

// app.patch("/user", (req,res)=>{
//     res.send("patch response is send")
// })
// app.delete("/user", (req,res)=>{
//     res.send(
//         {
//             lastName: "Hashmi"
//         }
//     );
// })
// // this is match all the http methods APIs calls to /test
// app.use("/test", (req, res) => {
//   res.send("test");
// });

app.use(
  "/user",
  (req, res, next) => {
    console.log("Handling the user request");
    next();
  },
  (req, res, next) => {
    console.log("First Response");
    // res.send("First Response")
    next();
  },
  (req, res, next) => {
    console.log("Second Response");
    next();
  },
  (req, res, next) => {
    console.log("Third Response");
    next();
  },
  (req, res, next) => {
    console.log("Fourth Response")
    res.send("Fourth Response!");
  }
);

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});

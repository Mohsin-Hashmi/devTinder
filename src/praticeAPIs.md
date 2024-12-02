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
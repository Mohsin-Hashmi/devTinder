const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName age photoUrl gender skills";

/** Creating the API that gets all the pending request for the loggedIn user  */
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    res.json({
      message: "Data fetched successfully",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

/** Creating the API that gets all the connections for the loggedIn user  */
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequestModel.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({
      data,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

/**Creating the feed API */

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    /**
     * User should see all the user card expect
     *  1. His own card
     *  2. His Connection
     *  3. Ignored People
     *  4. Already send the connection request
     */

    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id, toUserId: loggedInUser._id }],
    })
      .select("fromUserId  toUserId")
      .populate("fromUserId", "firstName")
      .populate("toUserId", "firstName");

    const hideUserFromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId);
      hideUserFromFeed.add(req.toUserId);
    });

    res.send(connectionRequest);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = userRouter;

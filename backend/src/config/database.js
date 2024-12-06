const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://mnadeemhashmi2000:s4J2l9OA7FVoDTKa@usercluster.sibc9.mongodb.net/devTinder"
  );
};

module.exports = connectDB;

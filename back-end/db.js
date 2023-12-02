const mongoose = require("mongoose");
require("dotenv").config();

const connect_db = async () => {
  try {
    const mongoURL = process.env.MONGODB_URI;
    await mongoose.connect(mongoURL, {
    });
    console.log("Connected to database.");
  } catch (error) {
    console.error("Error connecting to database: ", error);
    process.exit(1);
  }
};

module.exports = connect_db;

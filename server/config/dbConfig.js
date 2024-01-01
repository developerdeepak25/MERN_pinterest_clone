// server/config/dbConfig.js

// Sample database configuration
const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI

const connectDB = async () => {
  try {
    // Replace 'mongodb://localhost:27017/pinterest_clone' with your actual MongoDB URL
    await mongoose.connect(URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process with a failure code
  }
};

module.exports = connectDB;

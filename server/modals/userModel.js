// server/models/userModel.js

const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userPic: {
    type: String,
    required: false,
    unique: false,
    default: null
  },
  userPicRef: {
    type: String,
    required: false,
    unique: false,
    default: null
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  savedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  // Add other fields as needed
});

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;

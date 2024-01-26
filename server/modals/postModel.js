// server/models/postModel.js

const mongoose = require("mongoose");

// Define the User schema
const postSchema = new mongoose.Schema({
  imageTitle: {
    type: String,
    unique: false,
  },
  imageDescirption: {
    type: String,
    unique: false,
  },
  image: {
    type: String,
    required: true,
    unique: true,
  },
  imageRef: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  saves: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  // Add other fields as needed
});

// Create the post model
const Post = mongoose.model("Post", postSchema);

module.exports = Post;

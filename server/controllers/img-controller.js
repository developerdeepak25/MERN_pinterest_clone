const Post = require("../modals/postModel");
const User = require("../modals/userModel");
const getDataFromToken = require("../utils/getDataFromToken");
const fs = require("fs");

const getUserProfile = async (req, res) => {
  try {
    const userId = getDataFromToken(req);

    console.log("id", userId);
    const userData = await User.findOne({ _id: userId }).select(
      "-password -posts -savedPosts"
    );
    // const userData = await User.findById(userId);
    console.log(
      " ~ file: img-controller.js:13 ~ getData ~ userData:",
      userData
    );

    res.json({ message: "data sent", data: userData });
  } catch (error) {
    res.json({ message: "Error: " + error.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const userId = getDataFromToken(req);
    // const data =  req.cookies.token
    // const userData = await User.findOne({ _id: userId }).select("-password");
    // console.log(userData);
    console.log("idd", userId);
    const userData = await User.findOne({ _id: userId })
      .populate("posts savedPosts")
      .select("-password");
    // const userData = await User.findById(userId);
    console.log(
      " ~ file: img-controller.js:13 ~ getData ~ userData:",
      userData
    );

    res.json({ message: "data sent", data: userData });
  } catch (error) {
    res.json({ message: "Error: " + error.message });
  }
};

// leaving unused for now saved posts and retrived with above controller for now

const getSavedPosts = async (req, res) => {
  try {
    const userId = getDataFromToken(req);
    // const data =  req.cookies.token
    // const userData = await User.findOne({ _id: userId }).select("-password");
    // console.log(userData);
    console.log("idd", userId);
    const userData = await User.findOne({ _id: userId })
      .populate({
        path: "savedPosts",
        populate: {
          path: "user",
          model: "User",
        },
      })
      .select("-password");
    // const userData = await User.findById(userId);
    console.log(
      " ~ file: img-controller.js:13 ~ getData ~ userData:",
      userData
    );

    res.json({ message: "data sent", data: userData.savedPosts });
  } catch (error) {
    res.json({ message: "Error: " + error.message });
  }
};

const uploadFile = async (req, res) => {
  try {
    // const { pinTitle, pinDescription } = req.body; // fbase modification
    const { pinTitle, pinDescription, uploadFile, fileName } = req.body;
    console.log("🚀 ~ uploadFile ~ upload_file:", uploadFile);
    // if (!req.file) {
    //   return res.status(404).json({ message: "no files were given" });
    // }

    const userId = getDataFromToken(req);
    const user = await User.findOne({ _id: userId });
    const post = await Post.create({
      imageRef: fileName,
      imageTitle: pinTitle,
      imageDescirption: pinDescription,
      image: uploadFile,
      user: user._id,
    });
    user.posts.push(post._id);

    console.log("post", post);
    console.log("user", user);
    await user.save();

    // res.send("file uploaded successfully")
    res.status(200).json({ message: "uploaded successfully" });
  } catch (error) {
    res.json({ message: "Error: " + error.message });
  }
};
const uploadUserPic = async (req, res) => {
  const { uploadFile, fileName } = req.body;
  try {
    // if (!req.file) {
    //   return res.status(404).json({ message: "no files were given" });
    // }
    if (!(uploadFile || fileName)) {
      return res.status(404).json({ message: "no files were given" });
    }

    const userId = getDataFromToken(req);

    // Retrieve old user picture filename
    const user = await User.findOne({ _id: userId });
    const oldUserPic = user.userPicRef;
    // const filePath = `./public/pic_uploads/${oldUserPic}`;

    // if (fs.existsSync(filePath)) {
    //   fs.unlinkSync(filePath);
    // }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { userPic: uploadFile, userPicRef: fileName },
      { new: true }
    );

    console.log("user", updatedUser);
    // await user.save();

    // res.send("file uploaded successfully")
    res
      .status(200)
      .json({
        message: "uploaded successfully",
        userPic: updatedUser.userPic,
        oldUserPic,
      });
  } catch (error) {
    res.json({ message: "Error: " + error.message });
  }
};

const getAllData = async (req, res) => {
  try {
    const postsData = await Post.find({}).populate({
      path: "user",
      select: "-password -posts",
    }); // Populate the 'posts' field with actual post data

    console.log(
      " ~ file: img-controller.js:13 ~ getData ~ userData:",
      postsData
    );

    res.json({ message: "data sent", posts: postsData });
  } catch (error) {
    res.json({ message: "Error: " + error.message });
  }
};

// Get the single post data

const getSinglePostData = async (req, res) => {
  try {
    const postId = req.params.postId;
    console.log(
      "🚀 ~ file: img-controller.js:78 ~ getSinglePostData= ~ postId:",
      postId
    );
    if (!postId) {
      return res.status(400).json({ message: "Post ID is required." });
    }
    const userId = getDataFromToken(req);

    // if (postId) {
    // let isSaved = false;
    const postData = await Post.findOne({ _id: postId }).populate({
      path: "user",
      select: "-password -posts",
    });
    // if (postData && postData.saves.includes(userId)) {
    //   isSaved = true;
    // }

    console.log(
      "🚀 ~ file: img-controller.js:87 ~ getSinglePostData= ~ postData:",
      postData
    );
    // }

    // res.json({ message: "data sent", postData: { ...postData, isSaved } });
    res.json({ message: "data sent", postData });
  } catch (error) {
    res.json({ message: "Error: " + error.message });
  }
};

const savePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    console.log(
      "🚀 ~ file: img-controller.js:80 ~ getSinglePostData= ~ postId:",
      postId
    );

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required." });
    }
    const userId = getDataFromToken(req);
    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (post.saves.includes(userId)) {
      console.log("allready: saved post");
      return res
        .status(400)
        .json({ message: "You have already saved this post." });
    }

    // giving the userId to the post
    post.saves.push(userId);
    await post.save();

    //givin the postId to the user
    user.savedPosts.push(postId);
    await user.save();

    return res.json({ message: "post saved" });
  } catch (error) {
    res.json({ message: "Error: " + error.message });
  }
};

const unSavePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    console.log(
      "🚀 ~ file: img-controller.js:80 ~ getSinglePostData= ~ postId:",
      postId
    );

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required." });
    }
    const userId = getDataFromToken(req);
    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (!post.saves.includes(userId)) {
      //  console.log("allready: saved post");
      return res.status(400).json({ message: "post is not saved to unsave." });
    }

    // giving the userId to the post
    post.saves.pull(userId);
    await post.save();

    //givin the postId to the user
    user.savedPosts.pull(postId);
    await user.save();

    return res.json({ message: "post unsaved" });
  } catch (error) {
    res.json({ message: "Error: " + error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = getDataFromToken(req);

    console.log("inside delete post server side");

    const user = await User.findOne({ _id: userId });

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required." });
    }
    if (!user.posts.includes(postId)) {
      return res.status(404).json({ message: "Post does not exist." });
    }

    const deletedpost = await Post.findOneAndDelete({ _id: postId });

    user.posts.pull(postId);
    await user.save();

    // const filePath = `./public/uploads/${deletedpost.image}`;

    // if (fs.existsSync(filePath)) {
    //   // Delete the file
    //   fs.unlinkSync(filePath);
    res.status(200).json({ message: "File deleted successfully" });
    // } else {
    //   res.status(404).json({ message: "File not found" });
    // }
  } catch (error) {
    res.json({ message: "Error: " + error.message });
  }
};

module.exports = {
  getUserProfile,
  getUserPosts,
  getSavedPosts,
  uploadFile,
  uploadUserPic,
  getAllData,
  getSinglePostData,
  savePost,
  unSavePost,
  deletePost,
};

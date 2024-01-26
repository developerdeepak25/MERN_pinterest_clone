const express = require("express");
const {
  getUserPosts,
  uploadFile,
  getAllData,
  getSinglePostData,
  savePost,
  unSavePost,
  getSavedPosts,
  uploadUserPic,
  deletePost,
  getUserProfile,
} = require("../controllers/img-controller");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const isAuthenticated = require("../middleware/isAuthenticated");



// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/uploads");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     console.log(path.extname(file.originalname));
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({ storage: storage });


const createDiskStorage = (folder) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/${folder}`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
      );
    },
  });
};

// // Configuration for storing posts
// const postStorage = createDiskStorage('uploads'); // fbase modification

// Configuration for storing user profile pictures
const profilePicStorage = createDiskStorage('pic_uploads');



// Middleware for posts
// const uploadPost = multer({ storage: postStorage });  // fbase modification

// Middleware for user pic
const uploadProfilePic = multer({ storage: profilePicStorage });



router.use(isAuthenticated)

//data upload route (post upload route)
router.post("/upload",  uploadFile);
// //data upload route (post upload route)
// router.post("/upload", uploadPost.single("upload_file"), uploadFile);

//userpic upload route (post upload route)
router.post(
  "/uploaduserpic",
  uploadProfilePic.single("upload_pic_file"),
  uploadUserPic
);

//user posts data send route
router.get("/getuserprofile", getUserProfile);

//user posts data send route
router.get("/getuserposts", getUserPosts);

// user saved posts data send route
router.get("/getsavedposts", getSavedPosts);

//all posts data send route
router.get("/getalldata", getAllData);

// get  post data route
router.get("/getpostdata/:postId", getSinglePostData);

//like post route
router.get("/savepost/:postId", savePost);

//unlike post route
router.get("/unsavepost/:postId", unSavePost);

//delelte post route
router.delete("/deletepost/:postId", deletePost);


module.exports = router;

// server/routes/index.js

const express = require("express");
// const { testingController } = require("../controllers/testingController");
const { signup, login, logout } = require("../controllers/auth-controller");
const router = express.Router();


// Sample route
// router.get("/", (req, res) => {
//   res.json({ message: "Welcome to the Pinterest Clone API!!!!!" });
// });

// signup route

router.post("/signup",  signup);

// login route

router.post("/login",  login);

//logout route
router.get("/logout",  logout);

// //user data send route
// router.get("/getdata",  getData);







// router.get("/create", async (req, res) => {
//   const newUser = new User({
//     username: "myname2",
//     email: "email4@example.com",
//     password: "password",
//   });

//   // Save the new user to the database
//   await newUser.save();
//   console.log("🚀 ~ file: index.js:21 ~ router.get ~ new̥User:", newUser);
//   // res.json({ message: "user created" });
//   res.redirect("/");
// });


// router.get("/test", testingController);

module.exports = router;

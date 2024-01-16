// server/app.js

const express = require("express");
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
var cookieParser = require("cookie-parser");


const app = express();

var corsOptions = {
  origin: "https://mern-pinterest-clone.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

// // Middleware
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Passport initialization
app.use(passport.initialize());

// MongoDB connection (replace the connection string with your actual MongoDB URL)
// mongoose
//   .connect("mongodb://localhost:27017/pinterest_clone", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// Set up routes (replace with your actual routes)
const indexRouter = require("./routes/index");
const imageRouter = require("./routes/image-router");
// const usersRouter = require("./routes/users");
app.use("/", indexRouter);
app.use("/image", imageRouter);
// app.use("/users", usersRouter);

// 404 error handler
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

module.exports = app;

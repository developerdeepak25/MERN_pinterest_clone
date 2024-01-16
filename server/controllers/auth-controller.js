// const jwt =  require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const User = require("../modals/userModel");
const getDataFromToken = require("../utils/getDataFromToken");

// signup controller
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "user already exists" });
    }
    // console.log(req.body);

    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    console.log(savedUser);

    res.status(200).json({ message: "user created successfully" });
    // console.log(req.body);
  } catch (error) {
    console.log("🚀 ~ file: auth-controller.js:23 ~ signup ~ error:", error);
    res.status(400).json({ message: "Error: " + error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    if (password !== user.password) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET);
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .json({ message: "user login successfully", id: user._id });
    // console.log(req.body);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

const logout = async (req, res) => {
  try {
    res
      .cookie("token", "", {
        expires: new Date(0),
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .status(200)
      .json({ message: "user logout  successfully" });
  } catch (error) {
    res.json({ message: "Error: " + error.message });
  }
};

// const getData = async (req, res) => {
//   try {
//     const userId = getDataFromToken(req);
//     // const data =  req.cookies.token
//     console.log("id", userId);
//     const userData = await User.findOne({ _id: userId }).select("-password");
//     console.log(userData);

//     res.json({ message: "data sent", data: userData });
//   } catch (error) {
//     res.json({ message: "Error: " + error.message });
//   }
// };

module.exports = { signup, login, logout };

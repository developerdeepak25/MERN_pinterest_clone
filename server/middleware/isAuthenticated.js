const User = require("../modals/userModel");
const getDataFromToken = require("../utils/getDataFromToken");

const isAuthenticated = async (req, res, next) => {
  try {
    const id = getDataFromToken(req);

    const rootUser = await User.findById(id);
    if (!rootUser) {
      throw new Error("User cannot find!!");
    }
    console.log("user autherized");
    next();
  } catch (error) {
    console.log('in catch');
    res.status(401).json({ message: "Authentication problem!!" + error });
  }
};

module.exports = isAuthenticated;

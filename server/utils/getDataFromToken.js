const jwt =  require("jsonwebtoken")
const  getDataFromToken = (req) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    // console.log(token);
    return decodedToken.id;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getDataFromToken;

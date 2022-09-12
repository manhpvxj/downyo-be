const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const auth = require("./authMiddleware");

const verify = asyncHandler( async (req, res, next) => {
    const token = req.headers.authorization;
  if (token) {
    try {
      // Get token from header
      const accessToken = req.headers.authorization.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");
      if(req.user.username == req.params.id) {
        console.log("passed");
        next();
      }
      else {
        res.status(400).json("You are not allowed to do this");
      }
    } catch (error) {
      res.status(403);
      throw new Error("Not authorization");
    }
  }
  else {
    res.status(401);
    throw new Error("You need to login");
  }
})


module.exports = { verify };
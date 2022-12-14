const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;
  // Check if input is empty
  if (!username || !email || !password) {
    res.status(400).json({
      errCode: 1,
      errMsg: "Please add all field",
    });
  }
  // Validate
  if(!validator.isAlphanumeric(username)) {
    res.status(400).json({errMsg:"Invalid username"})
  }
  else if(!validator.isLength(username, {min:6})) {
    res.status(400).json({errMsg:"Username must be at least 6 characters"})
  }
  else if(!validator.isEmail(email)) {
    res.status(400).json({errMsg:"Invalid email"})
  }
  else if(!validator.isLength(password, {min:6})) {
    res.status(400).json({errMsg:"Password must be at least 6 characters"})
  }
  else {
  // Check if user exists
  const userExists = await User.findOne({ username });
  const emailExists = await User.findOne({ email });
  if (userExists) {
    res.status(403).json({
      errCode: 2,
      errMsg: "User already exists",
    })
  }
  else if (emailExists) {
    res.status(403).json({
      errCode: 2,
      errMsg: "Email already exists",
    })
  }
  else {
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    username,
    email,
    password: hashPassword,
  });

  await Profile.create({
    username, 
    email,
    description: "",
  })
  if (user) {
    res.status(201).json({
      msg: "Register successfully",
      _id: user.id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }}}}
  catch (e){
    throw new Error(e);
  }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  //Check if input is empty
  if (!username || !password) {
    res.status(400).json({
      errCode: 1,
      errMsg: "Please add all field",
    });
  }
  // check for username
  const user = await User.findOne({ username });
    if(!user || !bcrypt.compareSync(password, user.password)) {
      res.status(400).json({
        errCode: 3,
        errMsg: "Username or password is invalid",
      })
    }
    else {
      res.status(200).json({
        msg: "Login successful",
        _id: user.id,
        username: user.username,
        token: generateToken(user.id),
        })
      }
    
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_KEY, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser };
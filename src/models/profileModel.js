const mongoose = require("mongoose");

const profileSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    followers: {
      type: Number,
      default: 0,
    },
    posts: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: String,
      default:"https://i.imgur.com/gAN7yuY.png"
    },
    web1: {
      type: String,
      require: false,
    },
    web2: {
      type: String,
      require: false,
    },
    web3: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("userProfile", profileSchema);
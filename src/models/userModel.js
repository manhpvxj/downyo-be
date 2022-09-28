
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
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
    password: {
      type: String,
      required: [true, "Please add a password"],
      validate(value) {
        if(!validator.isLength(value, {min:6})) {
          throw new Error("Password must be at least 6 characters")
        }
      },
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("User", userSchema);

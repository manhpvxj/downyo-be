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
    }
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("userProfile", profileSchema);
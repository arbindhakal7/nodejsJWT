const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    max: 100,
    min: 5,
  },
  email: {
    type: String,
    required: true,
    max: 100,
    min: 7,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 100,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);

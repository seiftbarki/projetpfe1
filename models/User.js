const mongoose = require("mongoose");

const User = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  isAdmin : {
    type : Boolean ,
    default : false
  }
});
module.exports = mongoose.model("user", User);

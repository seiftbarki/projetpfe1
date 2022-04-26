const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

// @des register user
// public route
// @path : /register

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ status: true, msg: "User Already Exists !!!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
    });
    res
      .status(200)
      .json({ status: true, msg: "User created successfully", data: user });
  } catch (err) {
    res.status(500).json({ status: false, msg: err });
  }
});

// @des login user
// public route
// @path : /login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // verifying the user exists or not
    const user = await User.findOne({ email: email });
    if (user) {
      // comparing the passwords
      const comparedPasswords = await bcrypt.compare(password, user.password);
      if (comparedPasswords) {
        const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        return res.status(200).json({
          status: true,
          msg: "Logged in successfully",
          token: token,
          data: user,
        });
      } else {
        return res.status(400).json({ status: true, msg: "Invalid Passwords" });
      }
    } else {
      return res
        .status(400)
        .json({ status: true, msg: "User does not EXIST !!" });
    }
  } catch (err) {
    res.status(500).json({ status: false, msg: err });
  }
});

module.exports = router;

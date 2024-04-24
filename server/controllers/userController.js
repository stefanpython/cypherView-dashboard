const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { body, param, validationResult } = require("express-validator");
require("dotenv").config();

// User SignUp
exports.signup = [
  // Sanitize inputs
  body("username").trim().escape(),
  body("email").trim().escape(),
  body("password").trim().escape(),

  // Validate and create user in database
  async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    // Confirm password
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
      // Check if email already exists in database
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Encrypt password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      // Save new User
      const savedUser = await newUser.save();

      return res
        .status(200)
        .json({ message: "User created succesfully", savedUser });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
];

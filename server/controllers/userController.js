const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { body, param, validationResult } = require("express-validator");
const passport = require("passport");
require("dotenv").config();

// SignUp
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

// Login
exports.login = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token for successful authentication
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.PASSPORT_KEY,
      { expiresIn: "7days" }
    );

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Login succesful", token });
  })(req, res, next);
};

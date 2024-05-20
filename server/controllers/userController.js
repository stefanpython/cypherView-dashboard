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

    return res.json({ message: "Login succesful", token });
  })(req, res, next);
};

// Get user details
exports.get_user_details = [
  // Validate user ID
  param("userId").isMongoId().withMessage("Invalid user Id"),

  async (req, res) => {
    // Check for validation errors
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return req.status(400).json({ errors: validationErrors.array() });
    }

    try {
      // Extract user id from request parameters
      const { userId } = req.params;

      // Find user in db by ID excluding password field
      const user = await User.findById(userId).select("-password");

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      // Send user details as a response to the frontend
      return res
        .status(200)
        .json({ message: "Get user details success", user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
];

exports.demo_user = async (req, res) => {
  try {
    // Authenticate demo user (you may have a dedicated demo user in your database)
    const user = await User.findOne({ username: "cat" });

    if (!user) {
      throw new Error("Demo user not found");
    }

    // Generate JWT token with 'demo' role
    const token = jwt.sign(
      { userId: user._id, role: "demo" },
      process.env.PASSPORT_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

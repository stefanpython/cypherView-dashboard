const Customer = require("../models/Customer");
const { body, param, validationResult } = require("express-validator");

// Create new customer
exports.create_customer = [
  body("firstName").trim().escape(),
  body("lastName").trim().escape(),
  body("email").trim().escape(),
  body("image").trim().escape(),

  async (req, res) => {
    const { firstName, lastName, email, image } = req.body;

    try {
      // Check if email already exists in database
      const existingCustomer = await Customer.findOne({ email });
      if (existingCustomer) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Create new customer
      const newCustomer = new Customer({
        firstName,
        lastName,
        email,
        image,
      });

      // Save customer
      const savedCustomer = await newCustomer.save();

      return res
        .status(200)
        .json({ message: "Customer created successfully", savedCustomer });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
];

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

// Get details of a customer based on id
exports.get_customer_details = [
  // Validate customer ID
  param("customerId").isMongoId().withMessage("Invalid customer ID"),

  async (req, res) => {
    // Check for validation errors
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    try {
      // Extract ID from request parameters
      const { customerId } = req.params;

      // Find customer in database
      const customer = await Customer.findById(customerId);

      // Check if customer exists
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }

      // Send customer details as response
      return res
        .status(200)
        .json({ message: "Get customer details success", customer });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
];

// Get details of all customers
exports.get_all_customers = async (req, res) => {
  try {
    // Retrieve list of all customers
    const customers = await Customer.find();

    // Send list as a response
    return res
      .status(200)
      .json({ message: "Customer list retrieved successfully", customers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update customer details
exports.update_customer = [
  // Validate customer ID
  param("customerId").isMongoId().withMessage("Invalid customer ID"),

  // Validate and sanitize inputs
  body("firstName").trim().escape(),
  body("lastName").trim().escape(),
  body("email").trim().escape(),
  body("image").trim().escape(),

  async (req, res) => {
    // Check for validation errors
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    try {
      // Extract customer ID from the request parameters
      const { customerId } = req.params;

      // Find customer in database and update details
      const updatedCustomer = await Customer.findByIdAndUpdate(
        customerId,
        req.body,
        { new: true }
      );

      if (!updatedCustomer) {
        return res.status(400).json({ message: "Customer not found" });
      }

      // Send the updated customer details as a response
      return res
        .status(200)
        .json({ message: "Customer updated successfully", updatedCustomer });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
];

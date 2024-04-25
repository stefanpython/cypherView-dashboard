const { body, validationResult } = require("express-validator");
const Invoice = require("../models/Invoice");

// Create a new invoice
exports.create_invoice = [
  // Validate and sanitize inputs
  body("customer").trim().escape(),
  body("amount").toFloat(),
  body("date").toDate(),

  async (req, res) => {
    const { customer, amount, date } = req.body;

    try {
      // Check if invoice already exists in database
      const existingInvoice = await Invoice.findOne({ customer, amount, date });
      if (existingInvoice) {
        return res.status(400).json({ message: "Invoice already exists" });
      }

      // Create invoice
      const newInvoice = new Invoice({
        customer,
        amount,
      });

      // Save new invoice
      const savedInvoice = await newInvoice.save();

      return res
        .status(200)
        .json({ message: "Invoice created successfully", savedInvoice });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
];

// Get a list of all invoices
exports.get_all_invoices = async (req, res) => {
  try {
    // Retrieve list of all customers
    const invoices = await Invoice.find();
    if (!invoices) {
      return res
        .status(400)
        .json({ message: "Failed to retrive invoice list" });
    }

    return res
      .status(200)
      .json({ message: "Invoice list retrieved successfully", invoices });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

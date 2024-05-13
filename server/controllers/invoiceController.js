const { body, param, validationResult } = require("express-validator");
const Invoice = require("../models/Invoice");

// Create a new invoice
exports.create_invoice = [
  // Validate and sanitize inputs
  body("customer").trim().escape(),
  body("amount").toFloat(),
  body("date").toDate(),
  body("status").optional().trim().escape(),

  async (req, res) => {
    const { customer, amount, date, status } = req.body;

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
        status,
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
    const invoices = await Invoice.find().populate("customer");
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

// Get details for an invoice based on ID
exports.get_invoice_details = [
  // Validate customer ID
  param("invoiceId").isMongoId().withMessage("Invalid invoice ID"),

  async (req, res) => {
    // Check for validation errors
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    try {
      // Extract ID from parameters
      const { invoiceId } = req.params;

      // Find invoice in db
      const invoice = await Invoice.findById(invoiceId);

      // Check if invoice exists in db
      if (!invoice) {
        return res.status(400).json({ message: "Invoice not found" });
      }

      // Send invoice details as response
      return res
        .status(200)
        .json({ message: "Success GET invoice details", invoice });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
];

// Update invoice
exports.update_invoice = [
  // Validate invoice ID
  param("invoiceId").isMongoId().withMessage("Invalid invoice ID"),

  // Validate and Sanitize inputs
  body("customer").trim().escape(),
  body("amount").trim().escape(),
  body("status").trim().escape(),

  async (req, res) => {
    // Check for validation errors
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    try {
      // Extract invoice id from params
      const { invoiceId } = req.params;

      // Destructure request
      const { customer, amount, status } = req.body;

      const updateFields = {};

      if (customer) updateFields.customer = customer;
      if (amount) updateFields.amount = amount;
      if (status) updateFields.status = status;

      // Find and update invoice in db
      const updatedInvoice = await Invoice.findByIdAndUpdate(
        invoiceId,
        updateFields,
        { new: true }
      );

      // Verify if invoice exists in db
      if (!updatedInvoice) {
        return res.status(400).json({ message: "Failed to update invoice" });
      }

      return res
        .status(200)
        .json({ message: "Invoice updated successfully", updatedInvoice });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
];

// Delete invoice
exports.delete_invoice = [
  // Validate invoice ID
  param("invoiceId").isMongoId().withMessage("Invalid invoice ID"),

  async (req, res) => {
    // Check for validation errors
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    try {
      // Extract customer ID from request params
      const { invoiceId } = req.params;

      // Find customer in database by ID and delete
      const deleteInvoce = await Invoice.findByIdAndDelete(invoiceId);

      if (!deleteInvoce) {
        return res.status(400).json({ message: "Invoice not found" });
      }

      // Send success message to the frontend
      return res.status(200).json({ message: "Invoice deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
];

// Calculate the collected amount from invoices
exports.calculateTotalCollectedAmount = async (req, res) => {
  try {
    const invoices = await Invoice.find({ status: "paid" });
    const totalCollectedAmount = invoices.reduce(
      (total, invoice) => total + invoice.amount,
      0
    );
    res.json({ totalCollectedAmount });
  } catch (error) {
    console.error("BLABLABLA", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Calculate the pending amount from invoices
exports.calculateTotalPendingAmount = async (req, res) => {
  try {
    const invoices = await Invoice.find({ status: "pending" });
    const totalPendingAmount = invoices.reduce(
      (total, invoice) => total + invoice.amount,
      0
    );
    res.json({ totalPendingAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

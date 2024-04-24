var express = require("express");
var router = express.Router();
const passport = require("passport");

const user_controller = require("../controllers/userController");
const customer_controller = require("../controllers/customerController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resources");
});

// USER ROUTES

// -- Signup
router.post("/sign-up", user_controller.signup);

// -- Login
router.post("/login", user_controller.login);

// -- GET a user`s details
router.get(
  "/user/:userId",
  passport.authenticate("jwt", { session: false }),
  user_controller.get_user_details
);

// --------------------------------------------

// CUSTOMER ROUTES

// -- Create customer
router.post("/customers", customer_controller.create_customer);

// -- GET a customer`s details
router.get("/customers/:customerId", customer_controller.get_customer_details);

module.exports = router;

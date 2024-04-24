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

// -- GET user details
router.get(
  "/user/:userId",
  passport.authenticate("jwt", { session: false }),
  user_controller.get_user_details
);

// --------------------------------------------

// CUSTOMER ROUTES

// -- Create customer
router.post("/customer/create", customer_controller.create_customer);

module.exports = router;

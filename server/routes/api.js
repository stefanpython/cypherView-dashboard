var express = require("express");
var router = express.Router();
const passport = require("passport");
const user_controller = require("../controllers/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resources");
});

// USER ROUTES
router.post("/sign-up", user_controller.signup);
router.post("/login", user_controller.login);

module.exports = router;

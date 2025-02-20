const express = require("express");
const controllerUser = require("../controller/controlleruser"); // Ensure correct path
const router = express.Router();

// Define routes
router.post("/signup", controllerUser.signup);
router.post("/login", controllerUser.login);

module.exports = router; // ✅ Correctly export the router

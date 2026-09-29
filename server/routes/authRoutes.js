const express = require("express");

const {
  register,
  login,
  getCurrentUser,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Current logged-in user
router.get("/me", protect, getCurrentUser);

module.exports = router;
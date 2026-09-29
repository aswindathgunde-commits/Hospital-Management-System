const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ==========================================
// Generate Token
// ==========================================
const generateToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// ==========================================
// REGISTER
// POST /api/auth/register
// ==========================================
const register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role,
      profession,
    } = req.body;

    // Required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check existing user
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Only staff and doctor can register
    const userRole =
      role === "doctor" ? "doctor" : "staff";

    // Doctor profession
    if (
      userRole === "doctor" &&
      (!profession || !profession.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "Profession is required for doctor registration",
      });
    }

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: userRole,
      profession:
        userRole === "doctor"
          ? profession.trim()
          : "",
      isActive: true,
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profession: user.profession,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    next(error);
  }
};

// ==========================================
// LOGIN
// POST /api/auth/login
// ==========================================
const login = async (req, res, next) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "User account is inactive",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profession: user.profession,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    next(error);
  }
};

// ==========================================
// CURRENT USER
// GET /api/auth/me
// ==========================================
const getCurrentUser = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error("CURRENT USER ERROR:", error);
    next(error);
  }
};

// ==========================================
// EXPORT
// ==========================================
module.exports = {
  register,
  login,
  getCurrentUser,
};
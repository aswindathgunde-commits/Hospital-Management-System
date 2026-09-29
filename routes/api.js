const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Todo = require("../models/todo");
const User = require("../models/User");

const router = express.Router();

/* =====================================================
   TODO ROUTES
===================================================== */

router.get("/todos", async (req, res, next) => {
  try {
    const data = await Todo.find({}, "action");
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/todos", async (req, res, next) => {
  try {
    if (!req.body.action) {
      return res.status(400).json({
        error: "The input field is empty",
      });
    }

    const data = await Todo.create(req.body);

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/todos/:id", async (req, res, next) => {
  try {
    const data = await Todo.findOneAndDelete({
      _id: req.params.id,
    });

    if (!data) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

/* =====================================================
   REGISTER
   POST /api/auth/register
===================================================== */

router.post("/auth/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    /* ---------- Validation ---------- */

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required.",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (cleanName.length < 2) {
      return res.status(400).json({
        message: "Name must contain at least 2 characters.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters.",
      });
    }

    /* ---------- Check existing user ---------- */

    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered.",
      });
    }

    /* ---------- Hash password ---------- */

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    /* ---------- Create user ---------- */

    const user = await User.create({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
      role: role || "staff",
    });

    /* ---------- Response ---------- */

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Registration failed.",
    });
  }
});

/* =====================================================
   LOGIN
   POST /api/auth/login
===================================================== */

router.post("/auth/login", async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    /* ---------- Validation ---------- */

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    /* ---------- Find user ---------- */

    const user = await User.findOne({
      email: cleanEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    /* ---------- Compare password ---------- */

    const passwordMatched =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatched) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    /* ---------- Create JWT ---------- */

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        role: user.role,
      },
      process.env.JWT_SECRET ||
        "medicare_super_secret_key",
      {
        expiresIn: "1d",
      }
    );

    /* ---------- Response ---------- */

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Login failed.",
    });
  }
});

/* =====================================================
   CURRENT USER
   GET /api/auth/me
===================================================== */

router.get("/auth/me", async (req, res) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        message: "Authorization token missing.",
      });
    }

    const token =
      authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ||
        "medicare_super_secret_key"
    );

    const user = await User.findById(
      decoded.userId
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(
      "CURRENT USER ERROR:",
      error
    );

    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
});

/* =====================================================
   GLOBAL ERROR HANDLER
===================================================== */

router.use((error, req, res, next) => {
  console.error("API ERROR:", error);

  res.status(500).json({
    message:
      error.message || "Something went wrong.",
  });
});

module.exports = router;
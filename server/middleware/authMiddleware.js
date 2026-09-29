const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    // 1. Get Authorization header
    const authHeader = req.headers.authorization;

    // 2. Check whether token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Token required.",
      });
    }

    // 3. Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Token missing.",
      });
    }

    // 4. Verify JWT token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // 5. Find user from database
    const user = await User.findById(decoded.id).select(
      "-password"
    );

    // 6. Check user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    // 7. Check user account is active
    if (user.isActive !== true) {
      return res.status(401).json({
        success: false,
        message: "User account is inactive.",
      });
    }

    // 8. Attach user to request
    req.user = user;

    // 9. Continue to next middleware/controller
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);

    // Invalid or expired token
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    // Other server errors
    return res.status(500).json({
      success: false,
      message: "Authentication failed.",
    });
  }
};

module.exports = {
  protect,
};
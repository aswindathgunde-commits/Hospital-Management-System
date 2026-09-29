const express = require("express");

const {
  getStaff,
  getRegisteredDoctors,
  getHospitalUsers,
} = require(
  "../controllers/staffController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const authorize = require(
  "../middleware/roleMiddleware"
);

const router =
  express.Router();

router.get(
  "/",
  protect,
  authorize("admin"),
  getStaff
);

router.get(
  "/doctors",
  protect,
  authorize("admin"),
  getRegisteredDoctors
);

router.get(
  "/users",
  protect,
  authorize("admin"),
  getHospitalUsers
);

module.exports = router;
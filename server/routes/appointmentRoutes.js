const express = require("express");

const {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require(
  "../controllers/appointmentController"
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

// View all
router.get(
  "/",
  protect,
  authorize(
    "admin",
    "staff",
    "doctor"
  ),
  getAppointments
);

// View one
router.get(
  "/:id",
  protect,
  authorize(
    "admin",
    "staff",
    "doctor"
  ),
  getAppointmentById
);

// Add
router.post(
  "/",
  protect,
  authorize(
    "admin",
    "staff"
  ),
  createAppointment
);

// Edit
router.put(
  "/:id",
  protect,
  authorize(
    "admin",
    "staff"
  ),
  updateAppointment
);

// Delete
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteAppointment
);

module.exports = router;
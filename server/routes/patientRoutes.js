const express = require("express");

const {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
} = require(
  "../controllers/patientController"
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

// View
router.get(
  "/",
  protect,
  authorize(
    "admin",
    "staff",
    "doctor"
  ),
  getPatients
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
  getPatientById
);

// Add
router.post(
  "/",
  protect,
  authorize(
    "admin",
    "staff"
  ),
  createPatient
);

// Edit
router.put(
  "/:id",
  protect,
  authorize(
    "admin",
    "staff"
  ),
  updatePatient
);

// Delete
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deletePatient
);

module.exports = router;
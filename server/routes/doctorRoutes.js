const express = require("express");

const {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

const { protect } = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");

const router = express.Router();


// GET ALL DOCTORS
router.get(
  "/",
  protect,
  authorize("admin", "doctor", "staff"),
  getDoctors
);


// GET DOCTOR BY ID
router.get(
  "/:id",
  protect,
  authorize("admin", "doctor", "staff"),
  getDoctorById
);


// CREATE DOCTOR
router.post(
  "/",
  protect,
  authorize("admin", "staff"),
  createDoctor
);


// UPDATE DOCTOR
router.put(
  "/:id",
  protect,
  authorize("admin", "staff"),
  updateDoctor
);


// DELETE DOCTOR
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteDoctor
);


module.exports = router;
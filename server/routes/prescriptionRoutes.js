const express = require("express");

const {
  getPrescriptions,
  getPrescriptionById,
  createPrescription,
  updatePrescription,
  deletePrescription,
} = require("../controllers/prescriptionController");

const {
  protect,
} = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/",
  protect,
  authorize(
    "admin",
    "doctor",
    "staff"
  ),
  getPrescriptions
);

router.get(
  "/:id",
  protect,
  authorize(
    "admin",
    "doctor",
    "staff"
  ),
  getPrescriptionById
);

router.post(
  "/",
  protect,
  authorize(
    "admin",
    "doctor"
  ),
  createPrescription
);

router.put(
  "/:id",
  protect,
  authorize(
    "admin",
    "doctor"
  ),
  updatePrescription
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deletePrescription
);

module.exports = router;
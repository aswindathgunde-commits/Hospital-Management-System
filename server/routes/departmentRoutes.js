const express = require("express");

const {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

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
  getDepartments
);

router.get(
  "/:id",
  protect,
  authorize(
    "admin",
    "doctor",
    "staff"
  ),
  getDepartmentById
);

router.post(
  "/",
  protect,
  authorize("admin"),
  createDepartment
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateDepartment
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteDepartment
);

module.exports = router;
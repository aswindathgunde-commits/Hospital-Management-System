const express = require("express");

const {
  getBills,
  getBillById,
  createBill,
  updateBill,
  deleteBill,
} = require("../controllers/billingController");

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
    "staff"
  ),
  getBills
);

router.get(
  "/:id",
  protect,
  authorize(
    "admin",
    "staff"
  ),
  getBillById
);

router.post(
  "/",
  protect,
  authorize(
    "admin",
    "staff"
  ),
  createBill
);

router.put(
  "/:id",
  protect,
  authorize(
    "admin",
    "staff"
  ),
  updateBill
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteBill
);

module.exports = router;
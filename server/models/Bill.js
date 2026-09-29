const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    billNumber: {
      type: String,
      unique: true,
      required: true,
    },

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    consultationFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    medicineCharges: {
      type: Number,
      default: 0,
      min: 0,
    },

    labCharges: {
      type: Number,
      default: 0,
      min: 0,
    },

    otherCharges: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalAmount: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Partially Paid",
        "Paid",
      ],
      default: "Pending",
    },

    paymentDate: {
      type: Date,
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Bill",
  billSchema
);
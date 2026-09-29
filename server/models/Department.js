const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    departmentId: {
      type: String,
      unique: true,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    head: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Department",
  departmentSchema
);
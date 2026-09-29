const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
      min: 1,
      max: 120,
    },

    gender: {
      type: String,
      required: true,
      enum: [
        "Male",
        "Female",
        "Other",
      ],
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    bloodGroup: {
      type: String,
      enum: [
        "",
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
      ],
      default: "",
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

    medicalHistory: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model(
    "Patient",
    patientSchema
  );
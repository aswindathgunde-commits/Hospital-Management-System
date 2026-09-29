const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PatientSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true
    },

    age: {
      type: Number,
      required: [true, 'Patient age is required']
    },

    gender: {
      type: String,
      required: [true, 'Patient gender is required']
    },

    phone: {
      type: String,
      required: [true, 'Patient phone number is required']
    },

    email: {
      type: String,
      required: false,
      trim: true
    },

    address: {
      type: String,
      required: false,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;
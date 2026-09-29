const Doctor = require("../models/Doctor");

// ==========================================
// GET ALL DOCTORS
// ==========================================

const getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: doctors.length,
      doctors,
    });
  } catch (error) {
    next(error);
  }
};


// ==========================================
// GET DOCTOR BY ID
// ==========================================

const getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(
      req.params.id
    );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      success: true,
      doctor,
    });
  } catch (error) {
    next(error);
  }
};


// ==========================================
// CREATE DOCTOR
// ==========================================

const createDoctor = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      profession,
      specialization,
      qualification,
      experience,
      department,
      consultationFee,
      availability,
      address,
    } = req.body;

    // ------------------------------
    // REQUIRED FIELDS
    // ------------------------------

    if (!name || !email || !profession) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email and profession are required",
      });
    }

    // ------------------------------
    // CLEAN DATA
    // ------------------------------

    const cleanName = name.trim();
    const cleanEmail = email
      .trim()
      .toLowerCase();

    const cleanProfession =
      profession.trim();

    // ------------------------------
    // CHECK EXISTING DOCTOR
    // ------------------------------

    const existingDoctor =
      await Doctor.findOne({
        email: cleanEmail,
      });

    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message:
          "Doctor already exists with this email",
      });
    }

    // ------------------------------
    // CREATE DOCTOR
    // ------------------------------

    const doctor = await Doctor.create({
      name: cleanName,
      email: cleanEmail,
      phone: phone || "",
      profession: cleanProfession,
      specialization:
        specialization || "",
      qualification:
        qualification || "",
      experience:
        experience || 0,
      department:
        department || "",
      consultationFee:
        consultationFee || 0,
      availability:
        availability || "Available",
      address:
        address || "",
    });

    return res.status(201).json({
      success: true,
      message:
        "Doctor created successfully",
      doctor,
    });
  } catch (error) {
    next(error);
  }
};


// ==========================================
// UPDATE DOCTOR
// ==========================================

const updateDoctor = async (req, res, next) => {
  try {
    const doctor =
      await Doctor.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Doctor updated successfully",
      doctor,
    });
  } catch (error) {
    next(error);
  }
};


// ==========================================
// DELETE DOCTOR
// ==========================================

const deleteDoctor = async (req, res, next) => {
  try {
    const doctor =
      await Doctor.findByIdAndDelete(
        req.params.id
      );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Doctor deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


// ==========================================
// EXPORT
// ==========================================

module.exports = {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
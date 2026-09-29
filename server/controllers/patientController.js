const Patient = require("../models/Patient");

// ======================================================
// GET ALL PATIENTS
// ======================================================

const getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: patients.length,
      patients,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// GET PATIENT BY ID
// ======================================================

const getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findById(
      req.params.id
    );

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    return res.status(200).json({
      success: true,
      patient,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// GENERATE PATIENT ID
// ======================================================

const generatePatientId = async () => {
  const lastPatient = await Patient.findOne()
    .sort({ createdAt: -1 })
    .select("patientId");

  let nextNumber = 1;

  if (lastPatient?.patientId) {
    const numberPart = parseInt(
      lastPatient.patientId.replace("PAT-", ""),
      10
    );

    if (!isNaN(numberPart)) {
      nextNumber = numberPart + 1;
    }
  }

  return `PAT-${String(nextNumber).padStart(4, "0")}`;
};

// ======================================================
// CREATE PATIENT
// ======================================================

const createPatient = async (req, res, next) => {
  try {
    const {
      name,
      age,
      gender,
      phone,
      email,
      bloodGroup,
      address,
      medicalHistory,
    } = req.body;

    // -----------------------------
    // Required field validation
    // -----------------------------

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Patient name is required",
      });
    }

    if (!age) {
      return res.status(400).json({
        success: false,
        message: "Patient age is required",
      });
    }

    if (!gender) {
      return res.status(400).json({
        success: false,
        message: "Patient gender is required",
      });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({
        success: false,
        message: "Patient phone number is required",
      });
    }

    // -----------------------------
    // Validate age
    // -----------------------------

    const patientAge = Number(age);

    if (
      isNaN(patientAge) ||
      patientAge < 1 ||
      patientAge > 120
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid age between 1 and 120",
      });
    }

    // -----------------------------
    // Validate gender
    // -----------------------------

    const allowedGenders = [
      "Male",
      "Female",
      "Other",
    ];

    if (!allowedGenders.includes(gender)) {
      return res.status(400).json({
        success: false,
        message: "Invalid gender",
      });
    }

    // -----------------------------
    // Validate phone
    // -----------------------------

    const cleanPhone = phone.trim();

    if (!/^[0-9]{10}$/.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message:
          "Phone number must contain exactly 10 digits",
      });
    }

    // -----------------------------
    // Validate email if provided
    // -----------------------------

    const cleanEmail =
      email?.trim().toLowerCase() || "";

    if (cleanEmail) {
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(cleanEmail)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address",
        });
      }
    }

    // -----------------------------
    // Generate Patient ID
    // -----------------------------

    const patientId = await generatePatientId();

    // -----------------------------
    // Create Patient
    // -----------------------------

    const patient = await Patient.create({
      patientId,
      name: name.trim(),
      age: patientAge,
      gender,
      phone: cleanPhone,
      email: cleanEmail,
      bloodGroup: bloodGroup || "",
      address: address?.trim() || "",
      medicalHistory:
        medicalHistory?.trim() || "",
    });

    // -----------------------------
    // Response
    // -----------------------------

    return res.status(201).json({
      success: true,
      message: "Patient created successfully",
      patient,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// UPDATE PATIENT
// ======================================================

const updatePatient = async (req, res, next) => {
  try {
    const {
      name,
      age,
      gender,
      phone,
      email,
      bloodGroup,
      address,
      medicalHistory,
    } = req.body;

    // -----------------------------
    // Check patient
    // -----------------------------

    const existingPatient =
      await Patient.findById(req.params.id);

    if (!existingPatient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    // -----------------------------
    // Validation
    // -----------------------------

    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Patient name cannot be empty",
        });
      }
    }

    if (age !== undefined) {
      const patientAge = Number(age);

      if (
        isNaN(patientAge) ||
        patientAge < 1 ||
        patientAge > 120
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter a valid age between 1 and 120",
        });
      }
    }

    if (gender !== undefined) {
      const allowedGenders = [
        "Male",
        "Female",
        "Other",
      ];

      if (!allowedGenders.includes(gender)) {
        return res.status(400).json({
          success: false,
          message: "Invalid gender",
        });
      }
    }

    if (phone !== undefined) {
      if (!/^[0-9]{10}$/.test(phone.trim())) {
        return res.status(400).json({
          success: false,
          message:
            "Phone number must contain exactly 10 digits",
        });
      }
    }

    if (email !== undefined && email.trim()) {
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address",
        });
      }
    }

    // -----------------------------
    // Prepare update data
    // -----------------------------

    const updateData = {};

    if (name !== undefined) {
      updateData.name = name.trim();
    }

    if (age !== undefined) {
      updateData.age = Number(age);
    }

    if (gender !== undefined) {
      updateData.gender = gender;
    }

    if (phone !== undefined) {
      updateData.phone = phone.trim();
    }

    if (email !== undefined) {
      updateData.email =
        email.trim().toLowerCase();
    }

    if (bloodGroup !== undefined) {
      updateData.bloodGroup = bloodGroup;
    }

    if (address !== undefined) {
      updateData.address = address.trim();
    }

    if (medicalHistory !== undefined) {
      updateData.medicalHistory =
        medicalHistory.trim();
    }

    // -----------------------------
    // Update patient
    // -----------------------------

    const patient =
      await Patient.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    return res.status(200).json({
      success: true,
      message: "Patient updated successfully",
      patient,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// DELETE PATIENT
// ======================================================

const deletePatient = async (req, res, next) => {
  try {
    const patient =
      await Patient.findByIdAndDelete(
        req.params.id
      );

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Patient deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// EXPORT CONTROLLERS
// ======================================================

module.exports = {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
};
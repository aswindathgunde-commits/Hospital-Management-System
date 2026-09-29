const Prescription = require("../models/Prescription");

const getPrescriptions = async (
  req,
  res,
  next
) => {
  try {
    const prescriptions =
      await Prescription.find()
        .populate(
          "patient",
          "patientId name"
        )
        .populate(
          "doctor",
          "doctorId name specialization"
        )
        .populate(
          "appointment",
          "appointmentDate status"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count: prescriptions.length,
      data: prescriptions,
    });
  } catch (error) {
    next(error);
  }
};

const getPrescriptionById = async (
  req,
  res,
  next
) => {
  try {
    const prescription =
      await Prescription.findById(
        req.params.id
      )
        .populate(
          "patient",
          "patientId name"
        )
        .populate(
          "doctor",
          "doctorId name specialization"
        )
        .populate(
          "appointment",
          "appointmentDate status"
        );

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: prescription,
    });
  } catch (error) {
    next(error);
  }
};

const createPrescription = async (
  req,
  res,
  next
) => {
  try {
    const prescription =
      await Prescription.create(
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "Prescription created successfully.",
      data: prescription,
    });
  } catch (error) {
    next(error);
  }
};

const updatePrescription = async (
  req,
  res,
  next
) => {
  try {
    const prescription =
      await Prescription.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found.",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Prescription updated successfully.",
      data: prescription,
    });
  } catch (error) {
    next(error);
  }
};

const deletePrescription = async (
  req,
  res,
  next
) => {
  try {
    const prescription =
      await Prescription.findByIdAndDelete(
        req.params.id
      );

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found.",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Prescription deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPrescriptions,
  getPrescriptionById,
  createPrescription,
  updatePrescription,
  deletePrescription,
};
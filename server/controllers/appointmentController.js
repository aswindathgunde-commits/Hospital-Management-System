const Appointment = require("../models/Appointment");

// Get all appointments
const getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find()
      .sort({ appointmentDate: 1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    next(error);
  }
};

// Get appointment by ID
const getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(
      req.params.id
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

// Create appointment
const createAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.create(req.body);

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

// Update appointment
const updateAppointment = async (req, res, next) => {
  try {
    const appointment =
      await Appointment.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

// Delete appointment
const deleteAppointment = async (req, res, next) => {
  try {
    const appointment =
      await Appointment.findByIdAndDelete(
        req.params.id
      );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
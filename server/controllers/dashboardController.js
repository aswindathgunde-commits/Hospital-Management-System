const Patient = require("../models/Patient");
const User = require("../models/User");
const Appointment = require("../models/Appointment");
const Department = require("../models/Department");

// ======================================================
// GET DASHBOARD STATISTICS
// ======================================================

const getDashboardStats = async (req, res, next) => {
  try {
    // --------------------------------------------------
    // TOTAL COUNTS
    // --------------------------------------------------

    const [
      totalPatients,
      totalDoctors,
      totalAppointments,
      totalDepartments,
    ] = await Promise.all([
      // Total patients
      Patient.countDocuments(),

      // Doctors are registered as Users with role = doctor
      User.countDocuments({
        role: "doctor",
        isActive: true,
      }),

      // Total appointments
      Appointment.countDocuments(),

      // Total departments
      Department.countDocuments(),
    ]);

    // --------------------------------------------------
    // TODAY START
    // --------------------------------------------------

    const startOfToday = new Date();

    startOfToday.setHours(0, 0, 0, 0);

    // --------------------------------------------------
    // TODAY END
    // --------------------------------------------------

    const endOfToday = new Date();

    endOfToday.setHours(23, 59, 59, 999);

    // --------------------------------------------------
    // TODAY'S APPOINTMENTS
    // --------------------------------------------------

    const todayAppointments =
      await Appointment.find({
        date: {
          $gte: startOfToday,
          $lte: endOfToday,
        },
      })
        .sort({ date: 1 })
        .limit(10)
        .lean();

    // --------------------------------------------------
    // RECENT PATIENTS
    // --------------------------------------------------

    const recentPatients =
      await Patient.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();

    // --------------------------------------------------
    // RESPONSE
    // --------------------------------------------------

    return res.status(200).json({
      success: true,

      stats: {
        totalPatients,
        totalDoctors,
        totalAppointments,
        totalDepartments,
      },

      todayAppointments,

      recentPatients,
    });
  } catch (error) {
    console.error(
      "Dashboard Controller Error:",
      error
    );

    next(error);
  }
};

module.exports = {
  getDashboardStats,
};
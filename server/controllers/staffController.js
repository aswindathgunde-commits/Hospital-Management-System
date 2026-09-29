const User = require("../models/User");

// =====================================================
// GET STAFF
// =====================================================

const getStaff = async (
  req,
  res,
  next
) => {
  try {
    const staff =
      await User.find({
        role: "staff",
      })
        .select(
          "name email role profession isActive createdAt"
        )
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      success: true,
      count: staff.length,
      staff,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// GET REGISTERED DOCTORS
// =====================================================

const getRegisteredDoctors =
  async (req, res, next) => {
    try {
      const doctors =
        await User.find({
          role: "doctor",
        })
          .select(
            "name email role profession isActive createdAt"
          )
          .sort({
            createdAt: -1,
          });

      return res.status(200).json({
        success: true,
        count:
          doctors.length,
        doctors,
      });
    } catch (error) {
      next(error);
    }
  };

// =====================================================
// GET STAFF + DOCTORS
// =====================================================

const getHospitalUsers =
  async (req, res, next) => {
    try {
      const users =
        await User.find({
          role: {
            $in: [
              "staff",
              "doctor",
            ],
          },
        })
          .select(
            "name email role profession isActive createdAt"
          )
          .sort({
            createdAt: -1,
          });

      return res.status(200).json({
        success: true,
        count: users.length,
        users,
      });
    } catch (error) {
      next(error);
    }
  };

module.exports = {
  getStaff,
  getRegisteredDoctors,
  getHospitalUsers,
};
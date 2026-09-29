const Department = require("../models/Department");

const getDepartments = async (
  req,
  res,
  next
) => {
  try {
    const departments =
      await Department.find()
        .populate(
          "head",
          "name specialization"
        )
        .sort({
          name: 1,
        });

    res.status(200).json({
      success: true,
      count: departments.length,
      data: departments,
    });
  } catch (error) {
    next(error);
  }
};

const getDepartmentById = async (
  req,
  res,
  next
) => {
  try {
    const department =
      await Department.findById(
        req.params.id
      ).populate(
        "head",
        "name specialization"
      );

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

const createDepartment = async (
  req,
  res,
  next
) => {
  try {
    const department =
      await Department.create(
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "Department created successfully.",
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

const updateDepartment = async (
  req,
  res,
  next
) => {
  try {
    const department =
      await Department.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Department updated successfully.",
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

const deleteDepartment = async (
  req,
  res,
  next
) => {
  try {
    const department =
      await Department.findByIdAndDelete(
        req.params.id
      );

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Department deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
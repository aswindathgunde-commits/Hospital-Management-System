const Bill = require("../models/Bill");

const generateBillNumber = () => {
  return `BILL-${Date.now()}`;
};

const calculateTotal = (data) => {
  return (
    Number(data.consultationFee || 0) +
    Number(data.medicineCharges || 0) +
    Number(data.labCharges || 0) +
    Number(data.otherCharges || 0)
  );
};

const getBills = async (
  req,
  res,
  next
) => {
  try {
    const bills =
      await Bill.find()
        .populate(
          "patient",
          "patientId name phone"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count: bills.length,
      data: bills,
    });
  } catch (error) {
    next(error);
  }
};

const getBillById = async (
  req,
  res,
  next
) => {
  try {
    const bill =
      await Bill.findById(
        req.params.id
      ).populate(
        "patient",
        "patientId name phone"
      );

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: bill,
    });
  } catch (error) {
    next(error);
  }
};

const createBill = async (
  req,
  res,
  next
) => {
  try {
    const totalAmount =
      calculateTotal(req.body);

    const bill = await Bill.create({
      ...req.body,
      billNumber:
        req.body.billNumber ||
        generateBillNumber(),
      totalAmount,
    });

    const populatedBill =
      await Bill.findById(
        bill._id
      ).populate(
        "patient",
        "patientId name phone"
      );

    res.status(201).json({
      success: true,
      message: "Bill created successfully.",
      data: populatedBill,
    });
  } catch (error) {
    next(error);
  }
};

const updateBill = async (
  req,
  res,
  next
) => {
  try {
    const totalAmount =
      calculateTotal(req.body);

    const bill =
      await Bill.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          totalAmount,
        },
        {
          new: true,
          runValidators: true,
        }
      ).populate(
        "patient",
        "patientId name phone"
      );

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bill updated successfully.",
      data: bill,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBill = async (
  req,
  res,
  next
) => {
  try {
    const bill =
      await Bill.findByIdAndDelete(
        req.params.id
      );

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bill deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBills,
  getBillById,
  createBill,
  updateBill,
  deleteBill,
};
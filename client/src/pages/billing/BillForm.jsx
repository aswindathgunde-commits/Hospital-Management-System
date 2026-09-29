import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/common/Card/Card";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";

const BillForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patient: "",
    consultationFee: "",
    medicineCharges: "",
    testCharges: "",
    roomCharges: "",
    otherCharges: "",
    paymentStatus: "Pending",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const totalAmount =
    Number(formData.consultationFee || 0) +
    Number(formData.medicineCharges || 0) +
    Number(formData.testCharges || 0) +
    Number(formData.roomCharges || 0) +
    Number(formData.otherCharges || 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const billData = {
      ...formData,
      totalAmount,
    };

    console.log(billData);

    // await billingService.createBill(billData);

    navigate("/billing");
  };

  return (
    <div className="page-container">
      <div className="page-title">
        <h1>Create Bill</h1>
        <p>Generate patient billing information</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <Input
              label="Patient ID"
              name="patient"
              value={formData.patient}
              onChange={handleChange}
              required
            />

            <Input
              label="Consultation Fee"
              name="consultationFee"
              type="number"
              value={formData.consultationFee}
              onChange={handleChange}
            />

            <Input
              label="Medicine Charges"
              name="medicineCharges"
              type="number"
              value={formData.medicineCharges}
              onChange={handleChange}
            />

            <Input
              label="Test Charges"
              name="testCharges"
              type="number"
              value={formData.testCharges}
              onChange={handleChange}
            />

            <Input
              label="Room Charges"
              name="roomCharges"
              type="number"
              value={formData.roomCharges}
              onChange={handleChange}
            />

            <Input
              label="Other Charges"
              name="otherCharges"
              type="number"
              value={formData.otherCharges}
              onChange={handleChange}
            />

            <div className="form-group">
              <label>Payment Status</label>

              <select
                name="paymentStatus"
                value={formData.paymentStatus}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Cancelled">
                  Cancelled
                </option>
              </select>
            </div>
          </div>

          <div className="bill-total">
            <span>Total Amount</span>
            <strong>₹{totalAmount.toFixed(2)}</strong>
          </div>

          <div className="form-actions">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/billing")}
            >
              Cancel
            </Button>

            <Button type="submit">
              Create Bill
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default BillForm;
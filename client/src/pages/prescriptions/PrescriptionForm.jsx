import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/common/Card/Card";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";

const PrescriptionForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    medicines: "",
    dosage: "",
    duration: "",
    instructions: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // await prescriptionService.createPrescription(formData);

    navigate("/prescriptions");
  };

  return (
    <div className="page-container">
      <div className="page-title">
        <h1>Add Prescription</h1>
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
              label="Doctor ID"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              required
            />

            <Input
              label="Medicine"
              name="medicines"
              value={formData.medicines}
              onChange={handleChange}
              required
            />

            <Input
              label="Dosage"
              name="dosage"
              value={formData.dosage}
              onChange={handleChange}
            />

            <Input
              label="Duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />

            <div className="form-group full-width">
              <label>Instructions</label>

              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                rows="4"
                placeholder="Enter instructions"
              />
            </div>
          </div>

          <div className="form-actions">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                navigate("/prescriptions")
              }
            >
              Cancel
            </Button>

            <Button type="submit">
              Save Prescription
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default PrescriptionForm;
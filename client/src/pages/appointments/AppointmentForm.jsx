import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/common/Card/Card";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";

const AppointmentForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    date: "",
    time: "",
    reason: "",
    status: "Scheduled",
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

    // await appointmentService.createAppointment(formData);

    navigate("/appointments");
  };

  return (
    <div className="page-container">
      <div className="page-title">
        <h1>New Appointment</h1>
        <p>Schedule an appointment</p>
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
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <Input
              label="Time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              required
            />

            <div className="form-group">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Scheduled">
                  Scheduled
                </option>
                <option value="Confirmed">
                  Confirmed
                </option>
                <option value="Completed">
                  Completed
                </option>
                <option value="Cancelled">
                  Cancelled
                </option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Reason</label>

              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows="4"
              />
            </div>
          </div>

          <div className="form-actions">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                navigate("/appointments")
              }
            >
              Cancel
            </Button>

            <Button type="submit">
              Save Appointment
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AppointmentForm;
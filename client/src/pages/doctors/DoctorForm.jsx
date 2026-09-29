import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/common/Card/Card";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";

const DoctorForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    qualification: "",
    phone: "",
    email: "",
    experience: "",
    department: "",
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

    // await doctorService.createDoctor(formData);

    navigate("/doctors");
  };

  return (
    <div className="page-container">
      <div className="page-title">
        <h1>Add Doctor</h1>
        <p>Enter doctor information</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <Input
              label="Doctor Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              label="Specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            />

            <Input
              label="Qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
            />

            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              label="Experience"
              name="experience"
              type="number"
              value={formData.experience}
              onChange={handleChange}
            />

            <Input
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/doctors")}
            >
              Cancel
            </Button>

            <Button type="submit">
              Save Doctor
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default DoctorForm;
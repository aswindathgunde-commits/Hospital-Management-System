import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/common/Card/Card";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";

const DepartmentForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    head: "",
    status: "Active",
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

    // await departmentService.createDepartment(formData);

    navigate("/departments");
  };

  return (
    <div className="page-container">
      <div className="page-title">
        <h1>Add Department</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <Input
              label="Department Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              label="Department Head"
              name="head"
              value={formData.head}
              onChange={handleChange}
            />

            <div className="form-group full-width">
              <label>Description</label>

              <textarea
                name="description"
                value={formData.description}
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
                navigate("/departments")
              }
            >
              Cancel
            </Button>

            <Button type="submit">
              Save Department
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default DepartmentForm;
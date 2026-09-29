import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="page-title-row">
        <div>
          <h1>Doctor Details</h1>
          <p>Doctor ID: {id}</p>
        </div>

        <Button
          variant="outline"
          onClick={() => navigate("/doctors")}
        >
          Back
        </Button>
      </div>

      <Card title="Doctor Information">
        <div className="details-grid">
          <div>
            <span>Name</span>
            <strong>Dr. John Smith</strong>
          </div>

          <div>
            <span>Specialization</span>
            <strong>Cardiology</strong>
          </div>

          <div>
            <span>Qualification</span>
            <strong>MBBS, MD</strong>
          </div>

          <div>
            <span>Experience</span>
            <strong>10 Years</strong>
          </div>

          <div>
            <span>Phone</span>
            <strong>9876543210</strong>
          </div>

          <div>
            <span>Email</span>
            <strong>doctor@example.com</strong>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DoctorDetails;
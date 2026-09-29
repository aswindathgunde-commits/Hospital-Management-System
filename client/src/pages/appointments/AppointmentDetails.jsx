import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="page-title-row">
        <div>
          <h1>Appointment Details</h1>
          <p>Appointment ID: {id}</p>
        </div>

        <Button
          variant="outline"
          onClick={() => navigate("/appointments")}
        >
          Back
        </Button>
      </div>

      <Card title="Appointment Information">
        <div className="details-grid">
          <div>
            <span>Patient</span>
            <strong>John Doe</strong>
          </div>

          <div>
            <span>Doctor</span>
            <strong>Dr. Smith</strong>
          </div>

          <div>
            <span>Date</span>
            <strong>20 September 2026</strong>
          </div>

          <div>
            <span>Time</span>
            <strong>10:30 AM</strong>
          </div>

          <div>
            <span>Status</span>
            <strong>Scheduled</strong>
          </div>

          <div>
            <span>Reason</span>
            <strong>Regular consultation</strong>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AppointmentDetails;
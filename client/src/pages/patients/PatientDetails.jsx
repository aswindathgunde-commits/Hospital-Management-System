import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Patient Details</h2>

      <p>
        <strong>Patient ID:</strong> {id}
      </p>

      <button onClick={() => navigate("/patients")}>
        Back to Patients
      </button>
    </div>
  );
};

export default PatientDetails;
import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import Table from "../../components/common/Table/Table";

const PrescriptionList = () => {
  const navigate = useNavigate();

  const prescriptions = [];

  const columns = [
    { key: "patient", label: "Patient" },
    { key: "doctor", label: "Doctor" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="page-container">
      <div className="page-title-row">
        <div>
          <h1>Prescriptions</h1>
          <p>Manage patient prescriptions</p>
        </div>

        <Button
          onClick={() =>
            navigate("/prescriptions/new")
          }
        >
          + Add Prescription
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          data={prescriptions}
          emptyMessage="No prescriptions found"
        />
      </Card>
    </div>
  );
};

export default PrescriptionList;
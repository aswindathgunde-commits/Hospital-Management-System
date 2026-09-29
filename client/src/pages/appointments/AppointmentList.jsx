import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import Table from "../../components/common/Table/Table";

const AppointmentList = () => {
  const navigate = useNavigate();

  const appointments = [];

  const columns = [
    { key: "patient", label: "Patient" },
    { key: "doctor", label: "Doctor" },
    { key: "date", label: "Date" },
    { key: "time", label: "Time" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="page-container">
      <div className="page-title-row">
        <div>
          <h1>Appointments</h1>
          <p>Manage patient appointments</p>
        </div>

        <Button
          onClick={() =>
            navigate("/appointments/new")
          }
        >
          + New Appointment
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          data={appointments}
          emptyMessage="No appointments found"
          onRowClick={(appointment) =>
            navigate(
              `/appointments/${appointment._id}`
            )
          }
        />
      </Card>
    </div>
  );
};

export default AppointmentList;
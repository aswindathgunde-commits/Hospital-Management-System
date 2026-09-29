import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import SearchBar from "../../components/common/SearchBar/SearchBar";
import Table from "../../components/common/Table/Table";

const DoctorList = () => {
  const navigate = useNavigate();

  const doctors = [];

  const columns = [
    { key: "name", label: "Doctor Name" },
    { key: "specialization", label: "Specialization" },
    { key: "phone", label: "Phone" },
    { key: "experience", label: "Experience" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="page-container">
      <div className="page-title-row">
        <div>
          <h1>Doctors</h1>
          <p>Manage hospital doctors</p>
        </div>

        <Button onClick={() => navigate("/doctors/new")}>
          + Add Doctor
        </Button>
      </div>

      <Card>
        <SearchBar placeholder="Search doctors..." />

        <Table
          columns={columns}
          data={doctors}
          emptyMessage="No doctors found"
          onRowClick={(doctor) =>
            navigate(`/doctors/${doctor._id}`)
          }
        />
      </Card>
    </div>
  );
};

export default DoctorList;
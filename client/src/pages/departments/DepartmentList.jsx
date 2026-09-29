import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import Table from "../../components/common/Table/Table";

const DepartmentList = () => {
  const navigate = useNavigate();

  const departments = [];

  const columns = [
    { key: "name", label: "Department" },
    { key: "description", label: "Description" },
    { key: "head", label: "Department Head" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="page-container">
      <div className="page-title-row">
        <div>
          <h1>Departments</h1>
          <p>Manage hospital departments</p>
        </div>

        <Button
          onClick={() =>
            navigate("/departments/new")
          }
        >
          + Add Department
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          data={departments}
          emptyMessage="No departments found"
        />
      </Card>
    </div>
  );
};

export default DepartmentList;
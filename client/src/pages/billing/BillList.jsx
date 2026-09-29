import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/common/Card/Card";
import Button from "../../components/common/Button/Button";
import Table from "../../components/common/Table/Table";

const BillList = () => {
  const navigate = useNavigate();

  const bills = [];

  const columns = [
    { key: "patient", label: "Patient" },
    { key: "totalAmount", label: "Total Amount" },
    { key: "paymentStatus", label: "Payment Status" },
    { key: "paymentDate", label: "Payment Date" },
  ];

  return (
    <div className="page-container">
      <div className="page-title-row">
        <div>
          <h1>Billing</h1>
          <p>Manage patient billing</p>
        </div>

        <Button
          onClick={() => navigate("/billing/new")}
        >
          + Create Bill
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          data={bills}
          emptyMessage="No bills found"
        />
      </Card>
    </div>
  );
};

export default BillList;
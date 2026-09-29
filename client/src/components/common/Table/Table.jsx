import React from "react";
import "./Table.css";

const Table = ({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No records found",
  onRowClick,
}) => {
  return (
    <div className="table-wrapper">
      <table className="common-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="table-message">
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="table-message">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={row._id || row.id || rowIndex}
                onClick={() => onRowClick?.(row)}
                className={onRowClick ? "table-clickable-row" : ""}
              >
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key] ?? "-"}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
import React from "react";
import "./Pagination.css";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="pagination">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      <div className="pagination-pages">
        {pages.map((page) => (
          <button
            type="button"
            key={page}
            className={currentPage === page ? "active" : ""}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
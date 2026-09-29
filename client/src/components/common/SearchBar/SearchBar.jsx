import React from "react";
import "./SearchBar.css";

const SearchBar = ({
  value = "",
  onChange,
  placeholder = "Search...",
  onClear,
}) => {
  return (
    <div className="search-bar">
      <span className="search-icon">⌕</span>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
      />

      {value && (
        <button
          type="button"
          className="search-clear"
          onClick={onClear || (() => onChange(""))}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;
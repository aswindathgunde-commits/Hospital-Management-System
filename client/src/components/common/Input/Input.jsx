import React from "react";
import "./Input.css";

const Input = ({
  label,
  name,
  type = "text",
  value = "",
  placeholder = "",
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  readOnly = false,
  helperText,
  ...rest
}) => {
  return (
    <div className="input-group">
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
          {required && <span className="required-mark"> *</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        readOnly={readOnly}
        className={`common-input ${error ? "input-error" : ""}`}
        {...rest}
      />

      {error && <span className="error-message">{error}</span>}

      {!error && helperText && (
        <span className="helper-text">{helperText}</span>
      )}
    </div>
  );
};

export default Input;
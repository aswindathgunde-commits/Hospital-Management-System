import React from "react";
import "./Button.css";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  className = "",
}) => {
  const buttonClasses = [
    "common-button",
    `button-${variant}`,
    `button-${size}`,
    fullWidth ? "button-full-width" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        <>
          <span className="button-spinner" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
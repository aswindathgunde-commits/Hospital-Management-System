import React from "react";
import "./Loader.css";

const Loader = ({
  size = "medium",
  text = "Loading...",
  fullScreen = false,
}) => {
  return (
    <div className={`loader-wrapper ${fullScreen ? "loader-fullscreen" : ""}`}>
      <div className={`loader-spinner loader-${size}`} />

      {text && <span className="loader-text">{text}</span>}
    </div>
  );
};

export default Loader;
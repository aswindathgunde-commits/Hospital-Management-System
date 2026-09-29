import React from "react";
import "./Card.css";

const Card = ({
  children,
  title,
  subtitle,
  headerAction,
  padding = "medium",
  className = "",
}) => {
  return (
    <div className={`common-card card-padding-${padding} ${className}`}>
      {(title || subtitle || headerAction) && (
        <div className="card-header">
          <div>
            {title && <h3>{title}</h3>}
            {subtitle && <p>{subtitle}</p>}
          </div>

          {headerAction && (
            <div className="card-header-action">{headerAction}</div>
          )}
        </div>
      )}

      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;
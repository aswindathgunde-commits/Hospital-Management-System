import React from "react";
import "./Header.css";

const Header = ({
  title,
  subtitle,
  breadcrumbs = [],
  actions,
}) => {
  return (
    <header className="page-header">
      <div className="page-header-content">
        {breadcrumbs.length > 0 && (
          <div className="breadcrumbs">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                <span>{item}</span>

                {index < breadcrumbs.length - 1 && (
                  <span className="breadcrumb-separator">
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        <div className="page-header-main">
          <div>
            <h1>{title}</h1>

            {subtitle && (
              <p>{subtitle}</p>
            )}
          </div>

          {actions && (
            <div className="page-header-actions">
              {actions}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
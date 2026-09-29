import React from "react";
import { useAuth } from "../../../context/AuthContext.jsx";

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  // Get user initials
  const getInitials = (name = "") => {
    return name
      .trim()
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  // Format role name
  const getRoleName = (role) => {
    if (!role) {
      return "Staff";
    }

    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <header className="app-navbar">

      {/* =========================================
          LEFT SECTION
      ========================================= */}
      <div className="navbar-left">

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="mobile-menu-button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          title="Menu"
        >
          ☰
        </button>

        {/* Page Title */}
        <div className="navbar-page-title">
          <span>Hospital Management</span>
        </div>

      </div>

      {/* =========================================
          RIGHT SECTION
      ========================================= */}
      <div className="navbar-right">

        {/* Notification Button */}
        <button
          type="button"
          className="navbar-icon-button"
          title="Notifications"
          aria-label="Notifications"
        >
          🔔
          <span className="notification-dot"></span>
        </button>

        {/* Divider */}
        <div className="navbar-divider"></div>

        {/* User Information */}
        <div className="navbar-user">

          {/* Avatar */}
          <div className="navbar-user-avatar">
            {getInitials(user?.name || "User")}
          </div>

          {/* User Details */}
          <div className="navbar-user-details">

            <strong>
              {user?.name || "User"}
            </strong>

            <span>
              {getRoleName(user?.role)}
            </span>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;
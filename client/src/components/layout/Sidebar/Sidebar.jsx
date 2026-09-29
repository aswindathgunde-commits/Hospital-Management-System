import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext.jsx";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const role = user?.role;

  // =========================================
  // Logout
  // =========================================
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // =========================================
  // Close sidebar on mobile
  // =========================================
  const handleNavigation = () => {
    if (onClose) {
      onClose();
    }
  };

  // =========================================
  // Active navigation class
  // =========================================
  const getNavClass = ({ isActive }) =>
    `sidebar-nav-link ${isActive ? "active" : ""}`;

  // =========================================
  // Get role label
  // =========================================
  const getRoleName = (role) => {
    if (role === "admin") {
      return "Administrator";
    }

    if (role === "doctor") {
      return "Doctor";
    }

    if (role === "staff") {
      return "Staff";
    }

    return "User";
  };

  return (
    <aside className={`app-sidebar ${isOpen ? "open" : ""}`}>

      {/* =========================================
          SIDEBAR BRAND
      ========================================= */}
      <div className="sidebar-brand">

        <div className="sidebar-logo">
          M
        </div>

        <div className="sidebar-brand-text">
          <h2>MediCare</h2>
          <span>Hospital Management</span>
        </div>

      </div>

      {/* =========================================
          USER INFORMATION
      ========================================= */}
      <div className="sidebar-user">

        <div className="sidebar-user-avatar">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <div className="sidebar-user-info">

          <strong>
            {user?.name || "User"}
          </strong>

          <span>
            {getRoleName(role)}
          </span>

        </div>

      </div>

      {/* =========================================
          NAVIGATION
      ========================================= */}
      <nav className="sidebar-navigation">

        {/* =========================================
            MAIN MENU
        ========================================= */}
        <div className="sidebar-section-title">
          MAIN MENU
        </div>

        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className={getNavClass}
          onClick={handleNavigation}
        >
          <span className="sidebar-nav-icon">
            🏠
          </span>

          <span>
            Dashboard
          </span>
        </NavLink>

        {/* =========================================
            ADMIN MENU
        ========================================= */}
        {role === "admin" && (
          <>
            <div className="sidebar-section-title">
              MANAGEMENT
            </div>

            {/* Doctors */}
            <NavLink
              to="/doctors"
              className={getNavClass}
              onClick={handleNavigation}
            >
              <span className="sidebar-nav-icon">
                👨‍⚕️
              </span>

              <span>
                Doctors
              </span>
            </NavLink>

            {/* Staff */}
            <NavLink
              to="/staff"
              className={getNavClass}
              onClick={handleNavigation}
            >
              <span className="sidebar-nav-icon">
                👥
              </span>

              <span>
                Staff
              </span>
            </NavLink>

            {/* Patients */}
            <NavLink
              to="/patients"
              className={getNavClass}
              onClick={handleNavigation}
            >
              <span className="sidebar-nav-icon">
                🧑‍🤝‍🧑
              </span>

              <span>
                Patients
              </span>
            </NavLink>

            {/* Appointments */}
            <NavLink
              to="/appointments"
              className={getNavClass}
              onClick={handleNavigation}
            >
              <span className="sidebar-nav-icon">
                📅
              </span>

              <span>
                Appointments
              </span>
            </NavLink>

            {/* Departments */}
            <NavLink
              to="/departments"
              className={getNavClass}
              onClick={handleNavigation}
            >
              <span className="sidebar-nav-icon">
                🏥
              </span>

              <span>
                Departments
              </span>
            </NavLink>

            {/* Prescriptions */}
            <NavLink
              to="/prescriptions"
              className={getNavClass}
              onClick={handleNavigation}
            >
              <span className="sidebar-nav-icon">
                💊
              </span>

              <span>
                Prescriptions
              </span>
            </NavLink>

            {/* Billing */}
            <NavLink
              to="/billing"
              className={getNavClass}
              onClick={handleNavigation}
            >
              <span className="sidebar-nav-icon">
                💳
              </span>

              <span>
                Billing
              </span>
            </NavLink>
          </>
        )}

        {/* =========================================
            STAFF MENU
        ========================================= */}
        {role === "staff" && (
          <>
            <div className="sidebar-section-title">
              HOSPITAL
            </div>

            {/* Patients */}
            <NavLink
              to="/patients"
              className={getNavClass}
              onClick={handleNavigation}
            >
              <span className="sidebar-nav-icon">
                🧑‍🤝‍🧑
              </span>

              <span>
                Patients
              </span>
            </NavLink>

            {/* Appointments */}
            <NavLink
              to="/appointments"
              className={getNavClass}
              onClick={handleNavigation}
            >
              <span className="sidebar-nav-icon">
                📅
              </span>

              <span>
                Appointments
              </span>
            </NavLink>
          </>
        )}

        {/* =========================================
            DOCTOR MENU
        ========================================= */}
        {role === "doctor" && (
          <>
            <div className="sidebar-section-title">
              CLINICAL
            </div>

            {/* Patients */}
            <NavLink
              to="/patients"
              className={getNavClass}
              onClick={handleNavigation}
            >
              <span className="sidebar-nav-icon">
                🧑‍🤝‍🧑
              </span>

              <span>
                Patients
              </span>
            </NavLink>

            {/* Appointments */}
            <NavLink
              to="/appointments"
              className={getNavClass}
              onClick={handleNavigation}
            >
              <span className="sidebar-nav-icon">
                📅
              </span>

              <span>
                Appointments
              </span>
            </NavLink>

            {/* Prescriptions */}
            <NavLink
              to="/prescriptions"
              className={getNavClass}
              onClick={handleNavigation}
            >
              <span className="sidebar-nav-icon">
                💊
              </span>

              <span>
                Prescriptions
              </span>
            </NavLink>
          </>
        )}

      </nav>

      {/* =========================================
          SIDEBAR FOOTER
      ========================================= */}
      <div className="sidebar-footer">

        <button
          type="button"
          className="sidebar-logout"
          onClick={handleLogout}
        >
          <span className="sidebar-nav-icon">
            🚪
          </span>

          <span>
            Logout
          </span>
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;
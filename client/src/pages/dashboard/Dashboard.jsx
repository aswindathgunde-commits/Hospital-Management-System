import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import dashboardService from "../../services/dashboardService";

import "../../styles/pages.css";

// ======================================================
// DASHBOARD COMPONENT
// ======================================================

const Dashboard = () => {
  const navigate = useNavigate();

  // --------------------------------------------------
  // STATE
  // --------------------------------------------------

  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    totalDepartments: 0,
  });

  const [todayAppointments, setTodayAppointments] =
    useState([]);

  const [recentPatients, setRecentPatients] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  // ==================================================
  // LOAD DASHBOARD
  // ==================================================

  const loadDashboard = async (
    isRefresh = false
  ) => {
    try {
      // ----------------------------------------------
      // LOADING
      // ----------------------------------------------

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      // ----------------------------------------------
      // API CALL
      // ----------------------------------------------

      const response =
        await dashboardService.getDashboardStats();

      console.log(
        "Dashboard API Response:",
        response
      );

      // ----------------------------------------------
      // STATS
      // ----------------------------------------------

      setStats({
        totalPatients:
          response?.stats?.totalPatients || 0,

        totalDoctors:
          response?.stats?.totalDoctors || 0,

        totalAppointments:
          response?.stats?.totalAppointments || 0,

        totalDepartments:
          response?.stats?.totalDepartments || 0,
      });

      // ----------------------------------------------
      // TODAY APPOINTMENTS
      // ----------------------------------------------

      setTodayAppointments(
        Array.isArray(
          response?.todayAppointments
        )
          ? response.todayAppointments
          : []
      );

      // ----------------------------------------------
      // RECENT PATIENTS
      // ----------------------------------------------

      setRecentPatients(
        Array.isArray(
          response?.recentPatients
        )
          ? response.recentPatients
          : []
      );
    } catch (error) {
      console.error(
        "Dashboard Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ==================================================
  // LOAD ON PAGE OPEN
  // ==================================================

  useEffect(() => {
    loadDashboard();
  }, []);

  // ==================================================
  // FORMAT TIME
  // ==================================================

  const formatTime = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(
      date
    ).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ==================================================
  // GET INITIALS
  // ==================================================

  const getInitials = (name = "") => {
    return name
      .trim()
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) =>
        word.charAt(0).toUpperCase()
      )
      .join("");
  };

  // ==================================================
  // STAT CARDS
  // ==================================================

  const statCards = [
    {
      title: "Total Patients",
      value: stats.totalPatients,
      description: "Registered patients",
      icon: "👥",
      className: "patients-stat",
      path: "/patients",
    },

    {
      title: "Total Doctors",
      value: stats.totalDoctors,
      description: "Registered doctors",
      icon: "🩺",
      className: "doctors-stat",
      path: "/doctors",
    },

    {
      title: "Appointments",
      value: stats.totalAppointments,
      description: "Total appointments",
      icon: "📅",
      className: "appointments-stat",
      path: "/appointments",
    },

    {
      title: "Departments",
      value: stats.totalDepartments,
      description: "Hospital departments",
      icon: "🏥",
      className: "departments-stat",
      path: "/departments",
    },
  ];

  // ==================================================
  // LOADING SCREEN
  // ==================================================

  if (loading) {
    return (
      <div className="dashboard-loading">

        <div className="dashboard-loader"></div>

        <p>
          Loading dashboard...
        </p>

      </div>
    );
  }

  // ==================================================
  // MAIN UI
  // ==================================================

  return (
    <div className="dashboard-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="dashboard-header">

        <div className="dashboard-title-section">

          <div className="dashboard-title-icon">
            🏥
          </div>

          <div>
            <h1>
              Dashboard
            </h1>

            <p>
              Hospital overview and
              daily statistics
            </p>
          </div>

        </div>

        <button
          type="button"
          className="refresh-button"
          onClick={() =>
            loadDashboard(true)
          }
          disabled={refreshing}
        >

          <span
            className={
              refreshing
                ? "refresh-icon spinning"
                : "refresh-icon"
            }
          >
            ↻
          </span>

          {refreshing
            ? "Refreshing..."
            : "Refresh"}

        </button>

      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="dashboard-error">

          <span>!</span>

          <div>
            <strong>
              Unable to load dashboard
            </strong>

            <p>
              {error}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              loadDashboard()
            }
          >
            Retry
          </button>

        </div>
      )}

      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="stats-grid">

        {statCards.map((card) => (
          <button
            type="button"
            key={card.title}
            className={`stat-card ${card.className}`}
            onClick={() =>
              navigate(card.path)
            }
          >

            <div className="stat-card-top">

              <div className="stat-icon">
                {card.icon}
              </div>

              <span className="stat-arrow">
                →
              </span>

            </div>

            <div className="stat-content">

              <span className="stat-label">
                {card.title}
              </span>

              <strong className="stat-value">
                {card.value}
              </strong>

              <span className="stat-description">
                {card.description}
              </span>

            </div>

          </button>
        ))}

      </div>

      {/* =================================================
          QUICK ACTIONS
      ================================================= */}

      <section className="dashboard-section">

        <div className="section-header">

          <div>
            <h2>
              Quick Actions
            </h2>

            <p>
              Manage patients and
              appointments quickly
            </p>
          </div>

        </div>

        <div className="quick-actions-grid">

          {/* ADD PATIENT */}

          <button
            type="button"
            className="quick-action-card"
            onClick={() =>
              navigate(
                "/patients/add"
              )
            }
          >

            <div className="quick-action-icon blue">
              +
            </div>

            <div className="quick-action-content">

              <h3>
                Add Patient
              </h3>

              <p>
                Register a new patient
              </p>

            </div>

            <span className="quick-action-arrow">
              →
            </span>

          </button>

          {/* PATIENTS */}

          <button
            type="button"
            className="quick-action-card"
            onClick={() =>
              navigate("/patients")
            }
          >

            <div className="quick-action-icon green">
              👥
            </div>

            <div className="quick-action-content">

              <h3>
                Patients
              </h3>

              <p>
                View and manage patients
              </p>

            </div>

            <span className="quick-action-arrow">
              →
            </span>

          </button>

          {/* ADD APPOINTMENT */}

          <button
            type="button"
            className="quick-action-card"
            onClick={() =>
              navigate(
                "/appointments/add"
              )
            }
          >

            <div className="quick-action-icon purple">
              +
            </div>

            <div className="quick-action-content">

              <h3>
                Add Appointment
              </h3>

              <p>
                Schedule a new appointment
              </p>

            </div>

            <span className="quick-action-arrow">
              →
            </span>

          </button>

          {/* APPOINTMENTS */}

          <button
            type="button"
            className="quick-action-card"
            onClick={() =>
              navigate(
                "/appointments"
              )
            }
          >

            <div className="quick-action-icon orange">
              📅
            </div>

            <div className="quick-action-content">

              <h3>
                Appointments
              </h3>

              <p>
                View scheduled appointments
              </p>

            </div>

            <span className="quick-action-arrow">
              →
            </span>

          </button>

        </div>

      </section>

      {/* =================================================
          BOTTOM CONTENT
      ================================================= */}

      <div className="dashboard-content-grid">

        {/* =================================================
            TODAY'S APPOINTMENTS
        ================================================= */}

        <section className="dashboard-panel">

          <div className="section-header">

            <div>

              <h2>
                Today's Appointments
              </h2>

              <p>
                Scheduled appointments
                for today
              </p>

            </div>

            <button
              type="button"
              className="view-all-button"
              onClick={() =>
                navigate(
                  "/appointments"
                )
              }
            >

              <strong>
                {todayAppointments.length}
              </strong>

              <span>
                View All
              </span>

            </button>

          </div>

          {todayAppointments.length ===
          0 ? (
            <div className="dashboard-empty">

              <div className="dashboard-empty-icon">
                📅
              </div>

              <h3>
                No appointments today
              </h3>

              <p>
                There are no appointments
                scheduled for today.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/appointments/add"
                  )
                }
              >
                + Schedule Appointment
              </button>

            </div>
          ) : (
            <div className="appointments-list">

              {todayAppointments.map(
                (appointment) => (
                  <div
                    className="appointment-item"
                    key={
                      appointment._id
                    }
                  >

                    <div className="appointment-time">
                      {formatTime(
                        appointment.date
                      )}
                    </div>

                    <div className="appointment-avatar">
                      📅
                    </div>

                    <div className="appointment-info">

                      <strong>
                        {appointment
                          .patient?.name ||
                          appointment.patientName ||
                          "Patient"}
                      </strong>

                      <span>
                        {appointment
                          .doctor?.name ||
                          appointment.doctorName ||
                          "Doctor"}
                      </span>

                    </div>

                    <span className="status-badge">
                      {appointment.status ||
                        "Scheduled"}
                    </span>

                  </div>
                )
              )}

            </div>
          )}

        </section>

        {/* =================================================
            RECENT PATIENTS
        ================================================= */}

        <section className="dashboard-panel">

          <div className="section-header">

            <div>

              <h2>
                Recent Patients
              </h2>

              <p>
                Recently registered
                patients
              </p>

            </div>

            <button
              type="button"
              className="view-all-button"
              onClick={() =>
                navigate("/patients")
              }
            >

              <strong>
                {recentPatients.length}
              </strong>

              <span>
                View All
              </span>

            </button>

          </div>

          {recentPatients.length ===
          0 ? (
            <div className="dashboard-empty">

              <div className="dashboard-empty-icon">
                👤
              </div>

              <h3>
                No recent patients
              </h3>

              <p>
                Newly registered patients
                will appear here.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/patients/add"
                  )
                }
              >
                + Add Patient
              </button>

            </div>
          ) : (
            <div className="patients-list">

              {recentPatients.map(
                (patient) => (
                  <button
                    type="button"
                    className="recent-patient-item"
                    key={patient._id}
                    onClick={() =>
                      navigate(
                        `/patients/${patient._id}`
                      )
                    }
                  >

                    <div className="patient-avatar dashboard-avatar">
                      {getInitials(
                        patient.name
                      )}
                    </div>

                    <div className="recent-patient-info">

                      <strong>
                        {patient.name}
                      </strong>

                      <span>
                        {patient.patientId}
                      </span>

                    </div>

                    <div className="recent-patient-meta">

                      <span>
                        {patient.age} yrs
                      </span>

                      <span>
                        {patient.gender}
                      </span>

                    </div>

                    <span className="patient-row-arrow">
                      →
                    </span>

                  </button>
                )
              )}

            </div>
          )}

        </section>

      </div>

    </div>
  );
};

export default Dashboard;
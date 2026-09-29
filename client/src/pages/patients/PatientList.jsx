import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import patientService from "../../services/patientService";
import { useAuth } from "../../context/AuthContext";

const PatientList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // --------------------------------------------------
  // Fetch Patients
  // --------------------------------------------------
  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await patientService.getPatients();

      const patientData =
        response?.patients ||
        response?.data ||
        [];

      setPatients(
        Array.isArray(patientData) ? patientData : []
      );
    } catch (err) {
      console.error("Failed to fetch patients:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to load patients. Please try again."
      );

      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Load patients when page opens
  // --------------------------------------------------
  useEffect(() => {
    fetchPatients();
  }, []);

  // --------------------------------------------------
  // Search
  // --------------------------------------------------
  const filteredPatients = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return patients;
    }

    return patients.filter((patient) => {
      return (
        patient.name?.toLowerCase().includes(search) ||
        patient.patientId?.toLowerCase().includes(search) ||
        patient.phone?.toLowerCase().includes(search) ||
        patient.email?.toLowerCase().includes(search) ||
        patient.gender?.toLowerCase().includes(search) ||
        patient.bloodGroup?.toLowerCase().includes(search)
      );
    });
  }, [patients, searchTerm]);

  // --------------------------------------------------
  // Add Patient
  // --------------------------------------------------
  const handleAddPatient = () => {
    navigate("/patients/new");
  };

  // --------------------------------------------------
  // View Patient
  // --------------------------------------------------
  const handleViewPatient = (id) => {
    navigate(`/patients/${id}`);
  };

  // --------------------------------------------------
  // Edit Patient
  // --------------------------------------------------
  const handleEditPatient = (id) => {
    navigate(`/patients/${id}/edit`);
  };

  // --------------------------------------------------
  // Delete Patient
  // --------------------------------------------------
  const handleDeletePatient = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      await patientService.deletePatient(id);

      setPatients((prevPatients) =>
        prevPatients.filter(
          (patient) => patient._id !== id
        )
      );
    } catch (err) {
      console.error("Failed to delete patient:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to delete patient. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // --------------------------------------------------
  // Format Date
  // --------------------------------------------------
  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const formattedDate = new Date(date);

    if (Number.isNaN(formattedDate.getTime())) {
      return "-";
    }

    return formattedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // --------------------------------------------------
  // Get Gender Class
  // --------------------------------------------------
  const getGenderClass = (gender) => {
    if (!gender) {
      return "patient-gender-badge";
    }

    return `patient-gender-badge ${gender
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
  };

  // --------------------------------------------------
  // Loading State
  // --------------------------------------------------
  if (loading) {
    return (
      <div className="page-container patient-page">
        <div className="page-header">
          <div>
            <h1>Patients</h1>
            <p>Manage hospital patient records</p>
          </div>
        </div>

        <div className="patient-loading">
          <div className="patient-spinner"></div>
          <p>Loading patients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container patient-page">

      {/* ==================================================
          PAGE HEADER
      ================================================== */}
      <div className="page-header patient-page-header">

        <div className="page-header-content">
          <div className="page-title-section">
            <span className="page-icon">👥</span>

            <div>
              <h1>Patients</h1>

              <p>
                Manage and monitor hospital patient
                records
              </p>
            </div>
          </div>

          {/* Add Patient */}
          {(user?.role === "admin" ||
            user?.role === "staff") && (
            <button
              type="button"
              className="primary-button"
              onClick={handleAddPatient}
            >
              <span className="button-icon">+</span>
              Add Patient
            </button>
          )}
        </div>
      </div>

      {/* ==================================================
          ERROR MESSAGE
      ================================================== */}
      {error && (
        <div className="alert alert-error">
          <div className="alert-icon">!</div>

          <div className="alert-content">
            <strong>Something went wrong</strong>
            <p>{error}</p>
          </div>

          <button
            type="button"
            className="alert-close"
            onClick={() => setError("")}
          >
            ×
          </button>
        </div>
      )}

      {/* ==================================================
          PATIENT STATISTICS
      ================================================== */}
      <div className="patient-stats-grid">

        <div className="patient-stat-card">
          <div className="patient-stat-icon total">
            👥
          </div>

          <div>
            <span>Total Patients</span>
            <strong>{patients.length}</strong>
          </div>
        </div>

        <div className="patient-stat-card">
          <div className="patient-stat-icon male">
            👨
          </div>

          <div>
            <span>Male</span>
            <strong>
              {
                patients.filter(
                  (patient) =>
                    patient.gender === "Male"
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="patient-stat-card">
          <div className="patient-stat-icon female">
            👩
          </div>

          <div>
            <span>Female</span>
            <strong>
              {
                patients.filter(
                  (patient) =>
                    patient.gender === "Female"
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="patient-stat-card">
          <div className="patient-stat-icon other">
            🧑
          </div>

          <div>
            <span>Other</span>
            <strong>
              {
                patients.filter(
                  (patient) =>
                    patient.gender === "Other"
                ).length
              }
            </strong>
          </div>
        </div>

      </div>

      {/* ==================================================
          TABLE CARD
      ================================================== */}
      <div className="patient-table-card">

        {/* Table Header */}
        <div className="patient-table-toolbar">

          <div>
            <h2>Patient Records</h2>

            <p>
              {filteredPatients.length} patient
              {filteredPatients.length !== 1
                ? "s"
                : ""}{" "}
              found
            </p>
          </div>

          <div className="patient-toolbar-actions">

            {/* Search */}
            <div className="patient-search-box">
              <span className="search-icon">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />

              {searchTerm && (
                <button
                  type="button"
                  className="search-clear"
                  onClick={() => setSearchTerm("")}
                >
                  ×
                </button>
              )}
            </div>

            {/* Refresh */}
            <button
              type="button"
              className="secondary-button"
              onClick={fetchPatients}
              disabled={loading}
            >
              ↻ Refresh
            </button>

          </div>
        </div>

        {/* ==================================================
            EMPTY STATE
        ================================================== */}
        {filteredPatients.length === 0 ? (
          <div className="patient-empty-state">

            <div className="empty-icon">
              {searchTerm ? "🔍" : "👥"}
            </div>

            <h3>
              {searchTerm
                ? "No patients found"
                : "No patients available"}
            </h3>

            <p>
              {searchTerm
                ? "Try changing your search term."
                : "There are no patient records yet."}
            </p>

            {!searchTerm &&
              (user?.role === "admin" ||
                user?.role === "staff") && (
                <button
                  type="button"
                  className="primary-button"
                  onClick={handleAddPatient}
                >
                  + Add First Patient
                </button>
              )}

          </div>
        ) : (
          /* ==================================================
             TABLE
          ================================================== */
          <div className="patient-table-wrapper">

            <table className="patient-table">

              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Patient ID</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>Blood Group</th>
                  <th>Registered</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredPatients.map((patient) => (
                  <tr key={patient._id}>

                    {/* Patient */}
                    <td>
                      <div className="patient-info">

                        <div className="patient-avatar">
                          {patient.name
                            ?.charAt(0)
                            ?.toUpperCase() || "P"}
                        </div>

                        <div className="patient-name-info">
                          <strong>
                            {patient.name || "-"}
                          </strong>

                          <span>
                            {patient.email || "No email"}
                          </span>
                        </div>

                      </div>
                    </td>

                    {/* Patient ID */}
                    <td>
                      <span className="patient-id">
                        {patient.patientId || "-"}
                      </span>
                    </td>

                    {/* Age */}
                    <td>
                      <span className="patient-age">
                        {patient.age
                          ? `${patient.age} yrs`
                          : "-"}
                      </span>
                    </td>

                    {/* Gender */}
                    <td>
                      <span
                        className={getGenderClass(
                          patient.gender
                        )}
                      >
                        {patient.gender || "-"}
                      </span>
                    </td>

                    {/* Phone */}
                    <td>
                      <span className="patient-phone">
                        {patient.phone || "-"}
                      </span>
                    </td>

                    {/* Blood Group */}
                    <td>
                      {patient.bloodGroup ? (
                        <span className="blood-group-badge">
                          {patient.bloodGroup}
                        </span>
                      ) : (
                        <span className="not-available">
                          N/A
                        </span>
                      )}
                    </td>

                    {/* Registered Date */}
                    <td>
                      <span className="patient-date">
                        {formatDate(
                          patient.createdAt
                        )}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="patient-actions">

                        {/* View */}
                        <button
                          type="button"
                          className="action-button view"
                          title="View patient"
                          onClick={() =>
                            handleViewPatient(
                              patient._id
                            )
                          }
                        >
                          👁
                        </button>

                        {/* Edit */}
                        {(user?.role === "admin" ||
                          user?.role === "staff") && (
                          <button
                            type="button"
                            className="action-button edit"
                            title="Edit patient"
                            onClick={() =>
                              handleEditPatient(
                                patient._id
                              )
                            }
                          >
                            ✎
                          </button>
                        )}

                        {/* Delete - Admin only */}
                        {user?.role === "admin" && (
                          <button
                            type="button"
                            className="action-button delete"
                            title="Delete patient"
                            disabled={
                              deletingId ===
                              patient._id
                            }
                            onClick={() =>
                              handleDeletePatient(
                                patient._id
                              )
                            }
                          >
                            {deletingId ===
                            patient._id
                              ? "..."
                              : "🗑"}
                          </button>
                        )}

                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          </div>
        )}

        {/* ==================================================
            TABLE FOOTER
        ================================================== */}
        {filteredPatients.length > 0 && (
          <div className="patient-table-footer">

            <span>
              Showing{" "}
              <strong>
                {filteredPatients.length}
              </strong>{" "}
              of{" "}
              <strong>{patients.length}</strong>{" "}
              patients
            </span>

            {searchTerm && (
              <button
                type="button"
                className="clear-search-button"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </button>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default PatientList;
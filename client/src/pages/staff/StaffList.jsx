import React, { useEffect, useMemo, useState } from "react";
import api from "../../services/api";

const StaffList = () => {
  const [users, setUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // Fetch Staff and Doctors
  // --------------------------------------------------
  const fetchUsers = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await api.get("/staff/users");

      const responseData = response.data;

      const userList =
        responseData?.users ||
        responseData?.data ||
        [];

      setUsers(Array.isArray(userList) ? userList : []);
    } catch (err) {
      console.error("Failed to fetch staff and doctors:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to load staff and doctors. Please try again."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // --------------------------------------------------
  // Initial API Call
  // --------------------------------------------------
  useEffect(() => {
    fetchUsers();
  }, []);

  // --------------------------------------------------
  // Filter and Search
  // --------------------------------------------------
  const filteredUsers = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !search ||
        user.name?.toLowerCase().includes(search) ||
        user.email?.toLowerCase().includes(search) ||
        user.profession?.toLowerCase().includes(search) ||
        user.role?.toLowerCase().includes(search);

      const matchesRole =
        roleFilter === "all" ||
        user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  // --------------------------------------------------
  // Format Date
  // --------------------------------------------------
  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // --------------------------------------------------
  // Statistics
  // --------------------------------------------------
  const totalUsers = users.length;

  const totalDoctors = users.filter(
    (user) => user.role === "doctor"
  ).length;

  const totalStaff = users.filter(
    (user) => user.role === "staff"
  ).length;

  const activeUsers = users.filter(
    (user) => user.isActive === true
  ).length;

  // --------------------------------------------------
  // Loading State
  // --------------------------------------------------
  if (loading) {
    return (
      <div className="page-container staff-page">

        <div className="page-header">
          <div>
            <h1>Staff & Doctors</h1>
            <p>
              Manage registered hospital staff and doctors
            </p>
          </div>
        </div>

        <div className="staff-loading">
          <div className="staff-spinner"></div>
          <p>Loading staff and doctors...</p>
        </div>

      </div>
    );
  }

  return (
    <div className="page-container staff-page">

      {/* ================================================
          PAGE HEADER
      ================================================= */}
      <div className="page-header staff-page-header">

        <div className="page-title-section">

          <div className="page-icon">
            👥
          </div>

          <div>
            <h1>Staff & Doctors</h1>

            <p>
              View and monitor registered hospital users
            </p>
          </div>

        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={() => fetchUsers(true)}
          disabled={refreshing}
        >
          {refreshing ? "Refreshing..." : "↻ Refresh"}
        </button>

      </div>

      {/* ================================================
          ERROR MESSAGE
      ================================================= */}
      {error && (
        <div className="alert alert-error staff-alert">

          <div>
            <strong>Unable to load users</strong>
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

      {/* ================================================
          STATISTICS CARDS
      ================================================= */}
      <div className="staff-stats-grid">

        <div className="staff-stat-card">

          <div className="staff-stat-icon total-icon">
            👥
          </div>

          <div className="staff-stat-content">
            <span>Total Users</span>
            <strong>{totalUsers}</strong>
            <small>Registered users</small>
          </div>

        </div>

        <div className="staff-stat-card">

          <div className="staff-stat-icon doctor-icon">
            👨‍⚕️
          </div>

          <div className="staff-stat-content">
            <span>Total Doctors</span>
            <strong>{totalDoctors}</strong>
            <small>Registered doctors</small>
          </div>

        </div>

        <div className="staff-stat-card">

          <div className="staff-stat-icon staff-icon">
            🧑‍💼
          </div>

          <div className="staff-stat-content">
            <span>Total Staff</span>
            <strong>{totalStaff}</strong>
            <small>Registered staff</small>
          </div>

        </div>

        <div className="staff-stat-card">

          <div className="staff-stat-icon active-icon">
            ✓
          </div>

          <div className="staff-stat-content">
            <span>Active Users</span>
            <strong>{activeUsers}</strong>
            <small>Currently active</small>
          </div>

        </div>

      </div>

      {/* ================================================
          USERS TABLE CARD
      ================================================= */}
      <div className="staff-table-card">

        {/* Toolbar */}
        <div className="staff-table-toolbar">

          <div>
            <h2>Registered Users</h2>

            <p>
              {filteredUsers.length} user
              {filteredUsers.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="staff-toolbar-actions">

            {/* Search */}
            <div className="staff-search-box">

              <span className="staff-search-icon">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search name, email, role..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />

              {searchTerm && (
                <button
                  type="button"
                  className="staff-search-clear"
                  onClick={() => setSearchTerm("")}
                >
                  ×
                </button>
              )}

            </div>

            {/* Role Filter */}
            <select
              className="staff-role-filter"
              value={roleFilter}
              onChange={(event) =>
                setRoleFilter(event.target.value)
              }
            >
              <option value="all">All Roles</option>
              <option value="doctor">Doctors</option>
              <option value="staff">Staff</option>
            </select>

          </div>

        </div>

        {/* ================================================
            EMPTY STATE
        ================================================= */}
        {filteredUsers.length === 0 ? (
          <div className="staff-empty-state">

            <div className="staff-empty-icon">
              {searchTerm || roleFilter !== "all"
                ? "🔍"
                : "👥"}
            </div>

            <h3>
              {searchTerm || roleFilter !== "all"
                ? "No matching users found"
                : "No registered users"}
            </h3>

            <p>
              {searchTerm || roleFilter !== "all"
                ? "Try changing your search or filter."
                : "Registered staff and doctors will appear here."}
            </p>

            {(searchTerm || roleFilter !== "all") && (
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  setSearchTerm("");
                  setRoleFilter("all");
                }}
              >
                Clear Filters
              </button>
            )}

          </div>
        ) : (
          /* ================================================
             TABLE
          ================================================= */
          <div className="staff-table-wrapper">

            <table className="staff-table">

              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Profession</th>
                  <th>Status</th>
                  <th>Registered Date</th>
                </tr>
              </thead>

              <tbody>

                {filteredUsers.map((user) => (
                  <tr key={user._id}>

                    {/* User Details */}
                    <td>
                      <div className="staff-user-info">

                        <div className="staff-user-avatar">
                          {user.name
                            ?.charAt(0)
                            ?.toUpperCase() || "U"}
                        </div>

                        <div className="staff-user-details">
                          <strong>
                            {user.name || "-"}
                          </strong>

                          <span>
                            Hospital User
                          </span>
                        </div>

                      </div>
                    </td>

                    {/* Email */}
                    <td>
                      <span className="staff-email">
                        {user.email || "-"}
                      </span>
                    </td>

                    {/* Role */}
                    <td>
                      <span
                        className={`staff-role-badge ${
                          user.role === "doctor"
                            ? "doctor"
                            : "staff"
                        }`}
                      >
                        {user.role === "doctor"
                          ? "Doctor"
                          : "Staff"}
                      </span>
                    </td>

                    {/* Profession */}
                    <td>
                      <span className="staff-profession">
                        {user.profession || "Not specified"}
                      </span>
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`staff-status-badge ${
                          user.isActive
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        <span className="status-dot"></span>

                        {user.isActive
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    {/* Registered Date */}
                    <td>
                      <span className="staff-date">
                        {formatDate(user.createdAt)}
                      </span>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

        {/* ================================================
            FOOTER
        ================================================= */}
        {filteredUsers.length > 0 && (
          <div className="staff-table-footer">

            <span>
              Showing{" "}
              <strong>{filteredUsers.length}</strong>{" "}
              of{" "}
              <strong>{users.length}</strong>{" "}
              users
            </span>

            {(searchTerm || roleFilter !== "all") && (
              <button
                type="button"
                className="clear-filters-button"
                onClick={() => {
                  setSearchTerm("");
                  setRoleFilter("all");
                }}
              >
                Clear Filters
              </button>
            )}

          </div>
        )}

      </div>

    </div>
  );
};

export default StaffList;
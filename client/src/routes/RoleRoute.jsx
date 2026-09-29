import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

const RoleRoute = ({
  allowedRoles,
  children,
}) => {
  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <div className="route-loading">
        <div className="route-loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (
    !allowedRoles.includes(
      user.role
    )
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
};

export default RoleRoute;
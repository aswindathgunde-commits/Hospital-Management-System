import React from "react";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";


// =====================================================
// AUTH
// =====================================================

import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";


// =====================================================
// DASHBOARD
// =====================================================

import Dashboard from "../pages/dashboard/Dashboard.jsx";


// =====================================================
// PATIENTS
// =====================================================

import PatientList from "../pages/patients/PatientList.jsx";
import PatientForm from "../pages/patients/PatientForm.jsx";


// =====================================================
// DOCTORS
// =====================================================

import DoctorList from "../pages/doctors/DoctorList.jsx";
import DoctorDetails from "../pages/doctors/DoctorDetails.jsx";
import DoctorForm from "../pages/doctors/DoctorForm.jsx";


// =====================================================
// APPOINTMENTS
// =====================================================

import AppointmentList from "../pages/appointments/AppointmentList.jsx";
import AppointmentDetails from "../pages/appointments/AppointmentDetails.jsx";
import AppointmentForm from "../pages/appointments/AppointmentForm.jsx";


// =====================================================
// DEPARTMENTS
// =====================================================

import DepartmentList from "../pages/departments/DepartmentList.jsx";
import DepartmentForm from "../pages/departments/DepartmentForm.jsx";


// =====================================================
// PRESCRIPTIONS
// =====================================================

import PrescriptionList from "../pages/prescriptions/PrescriptionList.jsx";
import PrescriptionForm from "../pages/prescriptions/PrescriptionForm.jsx";


// =====================================================
// BILLING
// =====================================================

import BillList from "../pages/billing/BillList.jsx";
import BillForm from "../pages/billing/BillForm.jsx";


// =====================================================
// STAFF
// =====================================================
import StaffList from "../pages/staff/StaffList.jsx";


// =====================================================
// LAYOUT
// =====================================================

import MainLayout from "../components/layout/MainLayout.jsx";


// =====================================================
// ROLE ROUTE
// =====================================================

import RoleRoute from "./RoleRoute.jsx";


// =====================================================
// LOADING
// =====================================================

const RouteLoading = () => {
  return (
    <div className="route-loading">
      <div className="route-loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
};


// =====================================================
// PROTECTED
// =====================================================

const ProtectedRoute = ({
  children,
}) => {
  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return <RouteLoading />;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
};


// =====================================================
// PUBLIC
// =====================================================

const PublicRoute = ({
  children,
}) => {
  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return <RouteLoading />;
  }

  if (user) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
};


// =====================================================
// APP ROUTES
// =====================================================

const AppRoutes = () => {
  return (
    <BrowserRouter>

      <Routes>

        {/* PUBLIC */}

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />


        {/* PROTECTED */}

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >

          {/* Dashboard */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />


          {/* Patients */}

          <Route
            path="/patients"
            element={<PatientList />}
          />

          <Route
            path="/patients/new"
            element={
              <RoleRoute
                allowedRoles={[
                  "admin",
                  "staff",
                ]}
              >
                <PatientForm />
              </RoleRoute>
            }
          />

          <Route
            path="/patients/:id/edit"
            element={
              <RoleRoute
                allowedRoles={[
                  "admin",
                  "staff",
                ]}
              >
                <PatientForm />
              </RoleRoute>
            }
          />


          {/* Doctors */}

          <Route
            path="/doctors"
            element={
              <RoleRoute
                allowedRoles={[
                  "admin",
                  "doctor",
                ]}
              >
                <DoctorList />
              </RoleRoute>
            }
          />

          <Route
            path="/doctors/new"
            element={
              <RoleRoute
                allowedRoles={[
                  "admin",
                ]}
              >
                <DoctorForm />
              </RoleRoute>
            }
          />

          <Route
            path="/doctors/:id"
            element={
              <RoleRoute
                allowedRoles={[
                  "admin",
                  "doctor",
                ]}
              >
                <DoctorDetails />
              </RoleRoute>
            }
          />

          <Route
            path="/doctors/:id/edit"
            element={
              <RoleRoute
                allowedRoles={[
                  "admin",
                ]}
              >
                <DoctorForm />
              </RoleRoute>
            }
          />


          {/* Appointments */}

          <Route
            path="/appointments"
            element={<AppointmentList />}
          />

          <Route
            path="/appointments/new"
            element={
              <RoleRoute
                allowedRoles={[
                  "admin",
                  "staff",
                ]}
              >
                <AppointmentForm />
              </RoleRoute>
            }
          />

          <Route
            path="/appointments/:id"
            element={<AppointmentDetails />}
          />

          <Route
            path="/appointments/:id/edit"
            element={
              <RoleRoute
                allowedRoles={[
                  "admin",
                  "staff",
                ]}
              >
                <AppointmentForm />
              </RoleRoute>
            }
          />


          {/* Departments */}

          <Route
            path="/departments"
            element={
              <RoleRoute
                allowedRoles={[
                  "admin",
                ]}
              >
                <DepartmentList />
              </RoleRoute>
            }
          />

          <Route
            path="/departments/new"
            element={
              <RoleRoute
                allowedRoles={[
                  "admin",
                ]}
              >
                <DepartmentForm />
              </RoleRoute>
            }
          />

          <Route
            path="/departments/:id/edit"
            element={
              <RoleRoute
                allowedRoles={[
                  "admin",
                ]}
              >
                <DepartmentForm />
              </RoleRoute>
            }
          />


          {/* Prescriptions */}

          <Route
            path="/prescriptions"
            element={
              <RoleRoute
                allowedRoles={[
                  "admin",
                  "doctor",
                ]}
              >
                <PrescriptionList />
              </RoleRoute>
            }
          />

          <Route
            path="/prescriptions/new"
            element={
              <RoleRoute
                allowedRoles={[
                  "admin",
                  "doctor",
                ]}
              >
                <PrescriptionForm />
              </RoleRoute>
            }
          />

          <Route
            path="/prescriptions/:id/edit"
            element={
              <RoleRoute
                allowedRoles={[
                  "admin",
                  "doctor",
                ]}
              >
                <PrescriptionForm />
              </RoleRoute>
            }
          />


          {/* Billing */}

          <Route
            path="/billing"
            element={
              <RoleRoute
                allowedRoles={[
                  "admin",
                ]}
              >
                <BillList />
              </RoleRoute>
            }
          />

          <Route
            path="/billing/new"
            element={
              <RoleRoute
                allowedRoles={[
                  "admin",
                ]}
              >
                <BillForm />
              </RoleRoute>
            }
          />

          <Route
            path="/billing/:id/edit"
            element={
              <RoleRoute
                allowedRoles={[
                  "admin",
                ]}
              >
                <BillForm />
              </RoleRoute>
            }
          />


          {/* Staff */}

          <Route
            path="/staff"
            element={
              <RoleRoute
                allowedRoles={[
                  "admin",
                ]}
              >
                <StaffList />
              </RoleRoute>
            }
          />

        </Route>


        {/* ROOT */}

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />


        {/* 404 */}

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;
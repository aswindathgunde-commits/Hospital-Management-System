import React, { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";

import "../../styles/auth.css";

const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "staff",
    profession: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ======================================
  // HANDLE CHANGE
  // ======================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }

    // Clear profession when Staff selected
    if (
      name === "role" &&
      value === "staff"
    ) {
      setFormData((previous) => ({
        ...previous,
        role: value,
        profession: "",
      }));
    }
  };

  // ======================================
  // VALIDATION
  // ======================================

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError(
        "Please enter your full name."
      );
      return false;
    }

    if (!formData.email.trim()) {
      setError(
        "Please enter your email address."
      );
      return false;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      setError(
        "Please enter a valid email address."
      );
      return false;
    }

    if (!formData.password) {
      setError(
        "Please enter your password."
      );
      return false;
    }

    if (formData.password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return false;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return false;
    }

    if (!formData.role) {
      setError(
        "Please select an account role."
      );
      return false;
    }

    // Doctor profession
    if (
      formData.role === "doctor" &&
      !formData.profession.trim()
    ) {
      setError(
        "Please enter your doctor profession."
      );
      return false;
    }

    return true;
  };

  // ======================================
  // SUBMIT
  // ======================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const registerData = {
        name: formData.name.trim(),
        email: formData.email
          .trim()
          .toLowerCase(),
        password: formData.password,
        role: formData.role,
        profession:
          formData.role === "doctor"
            ? formData.profession.trim()
            : "",
      };

      const response =
        await register(registerData);

      console.log(
        "Registration successful:",
        response
      );

      navigate("/login", {
        replace: true,
      });
    } catch (err) {
      console.error(
        "Registration error:",
        err
      );

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-container">

        {/* LEFT */}

        <div className="auth-info">

          <div className="auth-info-content">

            <div className="brand-logo">
              <span>+</span>
            </div>

            <h1>MediCare</h1>

            <h2>
              Hospital Management
              <br />
              System
            </h2>

            <p>
              Create your MediCare account
              and access the hospital
              management system.
            </p>

            <div className="auth-features">

              <div className="feature-item">
                <span className="feature-icon">
                  ✓
                </span>

                <span>
                  Manage patients efficiently
                </span>
              </div>

              <div className="feature-item">
                <span className="feature-icon">
                  ✓
                </span>

                <span>
                  Manage doctors and appointments
                </span>
              </div>

              <div className="feature-item">
                <span className="feature-icon">
                  ✓
                </span>

                <span>
                  Secure healthcare management
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="auth-form-section">

          <div className="auth-card">

            <div className="auth-header">

              <h2>
                Create Account
              </h2>

              <p>
                Register a new MediCare account
              </p>

            </div>

            <form
              className="auth-form"
              onSubmit={handleSubmit}
              noValidate
            >

              {/* NAME */}

              <div className="form-group">

                <label htmlFor="name">
                  Full Name
                  <span className="required">
                    *
                  </span>
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  disabled={loading}
                />

              </div>

              {/* EMAIL */}

              <div className="form-group">

                <label htmlFor="email">
                  Email Address
                  <span className="required">
                    *
                  </span>
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  disabled={loading}
                />

              </div>

              {/* PASSWORD */}

              <div className="form-group">

                <label htmlFor="password">
                  Password
                  <span className="required">
                    *
                  </span>
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  autoComplete="new-password"
                  disabled={loading}
                />

                <small>
                  Minimum 6 characters
                </small>

              </div>

              {/* CONFIRM */}

              <div className="form-group">

                <label htmlFor="confirmPassword">
                  Confirm Password
                  <span className="required">
                    *
                  </span>
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={
                    formData.confirmPassword
                  }
                  onChange={handleChange}
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  disabled={loading}
                />

              </div>

              {/* ROLE */}

              <div className="form-group">

                <label htmlFor="role">
                  Account Role
                </label>

                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={loading}
                >

                  <option value="staff">
                    Staff
                  </option>

                  <option value="doctor">
                    Doctor
                  </option>

                </select>

              </div>

              {/* DOCTOR PROFESSION */}

              {formData.role ===
                "doctor" && (
                <div className="form-group">

                  <label htmlFor="profession">
                    Doctor Profession
                    <span className="required">
                      *
                    </span>
                  </label>

                  <select
                    id="profession"
                    name="profession"
                    value={
                      formData.profession
                    }
                    onChange={handleChange}
                    disabled={loading}
                  >

                    <option value="">
                      Select profession
                    </option>

                    <option value="Cardiologist">
                      Cardiologist
                    </option>

                    <option value="Dermatologist">
                      Dermatologist
                    </option>

                    <option value="General Physician">
                      General Physician
                    </option>

                    <option value="Gynecologist">
                      Gynecologist
                    </option>

                    <option value="Neurologist">
                      Neurologist
                    </option>

                    <option value="Orthopedic">
                      Orthopedic
                    </option>

                    <option value="Pediatrician">
                      Pediatrician
                    </option>

                    <option value="Psychiatrist">
                      Psychiatrist
                    </option>

                    <option value="Dentist">
                      Dentist
                    </option>

                    <option value="Surgeon">
                      Surgeon
                    </option>

                  </select>

                </div>
              )}

              {/* ERROR */}

              {error && (
                <div className="form-error">
                  {error}
                </div>
              )}

              {/* SUBMIT */}

              <button
                type="submit"
                className="auth-button"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="button-spinner"></span>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}

              </button>

            </form>

            <div className="auth-footer">

              <span>
                Already have an account?
              </span>

              <Link to="/login">
                Sign In
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;
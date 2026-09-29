import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";

import "../../styles/auth.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!formData.password) {
      setError("Please enter your password.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      await login({
        email: formData.email.trim(),
        password: formData.password,
      });

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Login error:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Invalid email or password. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        {/* LEFT SIDE */}
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
              Manage patients, doctors, appointments,
              prescriptions and billing from one secure
              healthcare platform.
            </p>

            <div className="auth-features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Secure patient management</span>
              </div>

              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Doctor & appointment management</span>
              </div>

              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Simple and efficient workflow</span>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-form-section">
          <div className="auth-card">

            <div className="auth-header">
              <h2>Welcome Back</h2>

              <p>
                Sign in to access your MediCare account
              </p>
            </div>

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >

              {/* EMAIL */}
              <div className="form-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  disabled={loading}
                />
              </div>

              {/* PASSWORD */}
              <div className="form-group">
                <div className="password-label">
                  <label htmlFor="password">
                    Password
                  </label>

                  <button
                    type="button"
                    className="forgot-password"
                    onClick={() =>
                      setError(
                        "Please contact the administrator to reset your password."
                      )
                    }
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="password-wrapper">
                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={loading}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    disabled={loading}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

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
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

            </form>

            {/* REGISTER */}
            <div className="auth-footer">
              <span>
                Don't have an account?
              </span>

              <Link to="/register">
                Create Account
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
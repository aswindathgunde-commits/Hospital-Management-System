import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import patientService from "../../services/patientService";
import "../../styles/pages.css";

const PatientForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    bloodGroup: "",
    address: "",
    medicalHistory: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove field error while typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Patient name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must contain at least 2 characters";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (
      Number(formData.age) < 1 ||
      Number(formData.age) > 120
    ) {
      newErrors.age = "Enter a valid age";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select gender";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const patientData = {
        name: formData.name.trim(),
        age: Number(formData.age),
        gender: formData.gender,
        phone: formData.phone.trim(),
        email: formData.email.trim().toLowerCase(),
        bloodGroup: formData.bloodGroup,
        address: formData.address.trim(),
        medicalHistory: formData.medicalHistory.trim(),
      };

      await patientService.createPatient(patientData);

      navigate("/patients");
    } catch (error) {
      console.error("Failed to create patient:", error);

      const message =
        error.response?.data?.message ||
        "Failed to create patient. Please try again.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/patients");
  };

  return (
    <div className="patient-form-page">

      {/* Back Navigation */}
      <div className="patient-form-top">
        <button
          type="button"
          className="back-button"
          onClick={handleCancel}
        >
          ← Back to Patients
        </button>
      </div>

      {/* Page Header */}
      <div className="patient-form-header">
        <div>
          <h1>Add New Patient</h1>
          <p>
            Register a new patient with their personal
            and medical information.
          </p>
        </div>

        <div className="patient-header-icon">
          👤
        </div>
      </div>

      {/* Form Card */}
      <form
        className="patient-form-card"
        onSubmit={handleSubmit}
      >

        {/* Personal Information */}
        <section className="form-section">

          <div className="form-section-header">
            <div className="section-icon personal-icon">
              👤
            </div>

            <div>
              <h2>Personal Information</h2>
              <p>
                Basic information about the patient
              </p>
            </div>
          </div>

          <div className="form-grid">

            {/* Name */}
            <div className="form-group form-group-large">
              <label htmlFor="name">
                Patient Name <span>*</span>
              </label>

              <div
                className={`input-wrapper ${
                  errors.name ? "input-error" : ""
                }`}
              >
                <span className="input-icon">👤</span>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter patient name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {errors.name && (
                <small className="error-message">
                  {errors.name}
                </small>
              )}
            </div>

            {/* Age */}
            <div className="form-group">
              <label htmlFor="age">
                Age <span>*</span>
              </label>

              <div
                className={`input-wrapper ${
                  errors.age ? "input-error" : ""
                }`}
              >
                <span className="input-icon">#</span>

                <input
                  id="age"
                  type="number"
                  name="age"
                  placeholder="Enter age"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>

              {errors.age && (
                <small className="error-message">
                  {errors.age}
                </small>
              )}
            </div>

            {/* Gender */}
            <div className="form-group">
              <label htmlFor="gender">
                Gender <span>*</span>
              </label>

              <div
                className={`input-wrapper ${
                  errors.gender ? "input-error" : ""
                }`}
              >
                <span className="input-icon">⚥</span>

                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">
                    Select gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {errors.gender && (
                <small className="error-message">
                  {errors.gender}
                </small>
              )}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">
                Phone <span>*</span>
              </label>

              <div
                className={`input-wrapper ${
                  errors.phone ? "input-error" : ""
                }`}
              >
                <span className="input-icon">☎</span>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  maxLength="10"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {errors.phone && (
                <small className="error-message">
                  {errors.phone}
                </small>
              )}
            </div>

            {/* Email */}
            <div className="form-group form-group-full">
              <label htmlFor="email">
                Email
                <span className="optional-label">
                  Optional
                </span>
              </label>

              <div
                className={`input-wrapper ${
                  errors.email ? "input-error" : ""
                }`}
              >
                <span className="input-icon">✉</span>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {errors.email && (
                <small className="error-message">
                  {errors.email}
                </small>
              )}
            </div>
          </div>
        </section>

        {/* Medical Information */}
        <section className="form-section">

          <div className="form-section-header">
            <div className="section-icon medical-icon">
              +
            </div>

            <div>
              <h2>Medical Information</h2>
              <p>
                Patient's medical and health details
              </p>
            </div>
          </div>

          <div className="form-grid">

            {/* Blood Group */}
            <div className="form-group">
              <label htmlFor="bloodGroup">
                Blood Group
                <span className="optional-label">
                  Optional
                </span>
              </label>

              <div className="input-wrapper">
                <span className="input-icon">🩸</span>

                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                >
                  <option value="">
                    Select blood group
                  </option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            {/* Medical History */}
            <div className="form-group">
              <label htmlFor="medicalHistory">
                Medical History
                <span className="optional-label">
                  Optional
                </span>
              </label>

              <textarea
                id="medicalHistory"
                name="medicalHistory"
                placeholder="Enter previous medical conditions, allergies, medications, etc."
                value={formData.medicalHistory}
                onChange={handleChange}
                rows="4"
              />
            </div>
          </div>
        </section>

        {/* Address */}
        <section className="form-section">

          <div className="form-section-header">
            <div className="section-icon address-icon">
              📍
            </div>

            <div>
              <h2>Address</h2>
              <p>
                Patient's current residential address
              </p>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">
              Address
              <span className="optional-label">
                Optional
              </span>
            </label>

            <textarea
              id="address"
              name="address"
              placeholder="Enter patient's complete address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
            />
          </div>
        </section>

        {/* Form Actions */}
        <div className="patient-form-actions">

          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-patient-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="button-spinner"></span>
                Saving...
              </>
            ) : (
              <>
                ✓ Save Patient
              </>
            )}
          </button>

        </div>

      </form>
    </div>
  );
};

export default PatientForm;
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo">+</span>

          <div>
            <strong>MediCare</strong>
            <span>Hospital Management System</span>
          </div>
        </div>

        <div className="footer-links">
          <Link to="/privacy">Privacy</Link>
          <Link to="/help">Help</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-copyright">
          © {currentYear} MediCare. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
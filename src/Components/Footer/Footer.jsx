import React from "react";
import "./Footer.css";
import logo from "../../Assets/footer-logo.png";
import linkedin from "../../Assets/LinkedIn.png";
import insta from "../../Assets/Logo Instagram.png";
import x from "../../Assets/x.png";
import youtube from "../../Assets/Logo-YouTube.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section social-media">
          <img src={logo} alt="Logo" className="footer-logo" />
          <div className="social-icons">
            <img src={x} alt="X" className="social-icon" />
            <img src={insta} alt="Instagram" className="social-icon" />
            <img src={youtube} alt="YouTube" className="social-icon" />
            <img src={linkedin} alt="LinkedIn" className="social-icon" />
          </div>
        </div>
        <div className="footer-section quick-links">
          <h2>دسترسی سریع</h2>
          <br />
          <ul>
            <li>خدمات</li>
            <li>مجله وی‌ کر</li>
            <li>ارتباط با ما</li>
          </ul>
        </div>
        <div className="footer-section about">
          <h2>درباره وی‌کر</h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

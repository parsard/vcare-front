import React from "react";
import "./Footer.css";
import logo from "../../Assets/footer-logo.png";
import linkedin from "../../Assets/LinkedIn.png";
import insta from "../../Assets/Logo Instagram.png";
import x from "../../Assets/x.png";
import youtube from "../../Assets/Logo-YouTube.png";

const Footer = ({onArticleClick,onAboutClick,onQuickClick}) => {
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
          <h2 style={{
            cursor:'pointer'
          }}
          onClick={onQuickClick}
          >دسترسی سریع</h2>
          <br />
          <ul>
            <li style={{
            cursor:'pointer'
          }}
            >خدمات</li>
            <li style={{
            cursor:'pointer'
          }}
             onClick={onArticleClick}>مجله وی‌ کر</li>
            <li style={{
            cursor:'pointer'
          }}
            >ارتباط با ما</li>
          </ul>
        </div>
        <div className="footer-section about">
          <h2 style={{
            cursor:'pointer'
          }}
           onClick={onAboutClick}>درباره وی‌کر</h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

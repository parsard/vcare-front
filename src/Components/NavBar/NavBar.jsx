// Navbar.js
import React, { useEffect } from "react";
import "./NavBar.css";
import logo from "../../Assets/logo.png";
import vcare from "../../Assets/Vcare.png";
import SignUp from "../SignUp/SignUp";
import userIcon from "../../Assets/user-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slice/authSlice";
import UserProfile from "../UserDashbord/UserProfile";
import { useState } from "react";

const Navbar = ({ onAboutClick, onArticleClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const [isSticky, setIsSticky] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <nav className={`navbar ${isSticky ? "sticky" : ""}`}>
        {isAuthenticated ? (
          <img
            src={userIcon}
            alt="Profile"
            cd
            className="profile-icon"
            onClick={toggleProfile}
          />
        ) : (
          <SignUp />
        )}
        <ul className="navbar-links">
          <li onClick={onArticleClick}>مجله وی کر</li>
          <li>ارتباط باما</li>
          <li onClick={onAboutClick}>درباره ما</li>
          <li>خدمات</li>
        </ul>
        <div className="navbar-logo">
          <img src={logo} alt="" className="logo" />
          <img src={vcare} alt="" className="vcare" />
        </div>
      </nav>
      {isProfileOpen && <UserProfile toggleModal={toggleProfile} />}
    </div>
  );
};

export default Navbar;

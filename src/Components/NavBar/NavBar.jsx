// Navbar.js
import React from "react";
import "./NavBar.css";
import logo from "../../Assets/logo.png";
import person from "../../Assets/person.png";
import vcare from "../../Assets/Vcare.png";
import SignUp from "../SignUp/SignUp";
import userIcon from "../../Assets/user-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../slice/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <nav className="navbar">
        {isAuthenticated ? (
          <img
            src={userIcon}
            alt="Profile"
            className="profile-icon"
            onClick={() => navigate("/profile")}
          />
        ) : (
          <SignUp />
        )}
        <ul className="navbar-links">
          <li>مجله وی کر</li>
          <li>ارتباط باما</li>
          <li>درباره ما</li>
          <li>خدمات</li>
        </ul>
        <div className="navbar-logo">
          <img src={logo} alt="" className="logo" />
          <img src={vcare} alt="" className="vcare" />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

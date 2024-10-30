import React, { useState } from "react";
import "./NavBar.css";
import logo from "../../Assets/logo.png";
import person from "../../Assets/person.png";
import vcare from "../../Assets/Vcare.png";
import SignUp from "../SignUp/SignUp";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <SignUp />
        <ul className="navbar-links">
          <li>مجله وی کر</li>
          <li>ارتباط باما</li>
          <li> درباره ما</li>
          <li> خدمات</li>
        </ul>
        <div className="navbar-logo">
          <img src={logo} alt="" className="logo" />
          <img src={vcare} alt="" className="vcare" />
        </div>
        <div className="navbar-buttons"></div>
      </nav>
    </div>
  );
};

export default Navbar;

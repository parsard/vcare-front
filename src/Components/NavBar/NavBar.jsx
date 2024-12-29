// Navbar.js
import React, { useEffect, useState } from "react";
import logo from "../../Assets/logo.png";
import vcare from "../../Assets/Vcare.png";
import SignUp from "../SignUp/SignUp";
import userIcon from "../../Assets/user-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slice/authSlice";
import UserProfile from "../UserDashbord/UserProfile";

const Navbar = ({ onAboutClick, onArticleClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  // const [isSticky, setIsSticky] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 100) {
  //       setIsSticky(true);
  //     } else {
  //       setIsSticky(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const liStyle = "text-white text-lg cursor-pointer";

  return (
    <div>
      <nav
        className={`flex items-center justify-between w-full h-24 bg-[var(--Main-green,#00818d)] relative z-[1000] transition-all duration-700`}
      >
        <div className="flex items-center">
          {isAuthenticated ? (
            <img
              src={userIcon}
              alt="Profile"
              className="p-5 cursor-pointer"
              onClick={toggleProfile}
            />
          ) : (
            <SignUp />
          )}
        </div>
        <ul className="flex list-none items-center gap-16 ml-auto">
          <li
            className={liStyle}
            style={{ fontSize: "16px", fontWeight: "600", fontStyle: "normal" }}
            onClick={onArticleClick}
          >
            مجله وی کر
          </li>
          <li
            className={liStyle}
            style={{ fontSize: "16px", fontWeight: "600", fontStyle: "normal" }}
          >
            ارتباط باما
          </li>
          <li
            className={liStyle}
            style={{ fontSize: "16px", fontWeight: "600", fontStyle: "normal" }}
            onClick={onAboutClick}
          >
            درباره ما
          </li>
          <li
            className={liStyle}
            style={{ fontSize: "16px", fontWeight: "600", fontStyle: "normal" }}
          >
            خدمات
          </li>
        </ul>
        <div className="flex items-center mr-5 ml-24">
          <img src={logo} alt="Logo" className="mr-5" />
          <img src={vcare} alt="Vcare" className="mr-5 ml-5" />
        </div>
      </nav>
      {isProfileOpen && <UserProfile toggleModal={toggleProfile} />}
    </div>
  );
};

export default Navbar;

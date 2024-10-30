import React from "react";
import "./SignUp.css";
import person from "../../Assets/person.png";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const handleUserLoginClick = () => {
    navigate("/modal");
  };
  return (
    <div className="btn-container">
      <button className="user-btn" onClick={handleUserLoginClick}>
        <span>ورود کابران</span>
      </button>
      <button className="provider-btn">
        <span>ورود خدمات دهندگان</span>
      </button>
    </div>
  );
};

export default SignUp;

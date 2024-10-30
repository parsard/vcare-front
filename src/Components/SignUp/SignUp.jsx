import React from "react";
import "./SignUp.css";
import person from "../../Assets/person.png";
import { useState } from "react";
const SignUp = () => {
  return (
    <div className="btn-container">
      <button className="user-btn">
        <span>ورود کابران</span>
      </button>
      <button className="provider-btn">
        <span>ورود خدمات دهندگان</span>
      </button>
    </div>
  );
};

export default SignUp;

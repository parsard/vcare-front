import React from "react";
import "./SignUp.css";
import { openPopup } from "../../slice/popUpslice";

import { useDispatch } from "react-redux";
const SignUp = () => {
  const dispatch = useDispatch();

  return (
    <div className="btn-container">
      <button className="user-btn" onClick={() => dispatch(openPopup())}>
        <span>ورود کابران</span>
      </button>
      <button className="provider-btn">
        <span>ورود خدمات دهندگان</span>
      </button>
    </div>
  );
};

export default SignUp;

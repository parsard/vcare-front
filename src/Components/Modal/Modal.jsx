import React, { useState } from "react";
import "./Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { closePopup, getOpen } from "../../slice/popUpslice";
import OtpInput from "../Verification/OtpInput";
export const Modal = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setshowOtpInput] = useState(false);

  const isOpen = useSelector((state) => getOpen(state));
  const dispatch = useDispatch();
  if (!isOpen) return;
  const handlePhoneNumber = (e) => {
    e.preventDefault();
    setPhoneNumber(e.target.value);
  };
  const handlePhoneSubmit = (e) => {
    e.preventDefault();

    // Example of simple validation, check if it's exactly 11 digits (Iranian phone number format)
    if (phoneNumber.match(/^09\d{9}$/)) {
      // Consider fetching or making an API request here to verify the phone number
      // before proceeding to the OTP step, if needed.
      setshowOtpInput(true);
    } else {
      alert("Please enter a valid phone number.");
    }
  };
  const onOtpSubmit = (otp) => {
    console.log("Login Successful", otp);
  };

  return (
    <div>
      {!showOtpInput ? (
        <div className="modal-overlay visible">
          <div className="modal-container">
            <span
              onClick={() => dispatch(closePopup())}
              className="modal-close"
            >
              &times;
            </span>
            <h1>ورود به وی کر</h1>
            <p>
              برای استفاده از خدمات وی‌کِر لازم است وارد شوید. شماره موبایل خود
              را وارد کنید
            </p>
            <form onSubmit={handlePhoneSubmit}>
              <div className="input-container">
                <input
                  type="text"
                  placeholder=" 09-- --- ----"
                  value={phoneNumber}
                  maxLength="11"
                  pattern="09[0-9]{9}"
                  required
                  onChange={handlePhoneNumber}
                />
                <button type="submit" className="submit-btn">
                  ارسال کد تایید
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        // <div className="otp-container">
        //   <p className="otp-text">کد ارسال شده را وارد کنید</p>
        <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        // </div>
      )}
    </div>
  );
};

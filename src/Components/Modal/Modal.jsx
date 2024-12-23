import React, { useState } from "react";
import "./Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { closePopup, getOpen } from "../../slice/popUpslice";
import OtpInput from "../Verification/OtpInput";
import sendSms from "../Verification/SendSms";
import Verify from "../Verification/Verify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { setToken } from "../Verification/TokenService";
import { login } from "../../slice/authSlice";

export const Modal = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const isOpen = useSelector((state) => getOpen(state));
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isOpen) {
      setPhoneNumber(""); // Clear phone number when modal is closed
      setShowOtpInput(false);
      setIsVisible(true); // Reset OTP input visibility
    }
  }, [isOpen]);
  if (!isOpen || !isVisible) return null;
  const handlePhoneNumber = (e) => {
    e.preventDefault();
    setPhoneNumber(e.target.value);
  };
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (phoneNumber.match(/^09\d{9}$/)) {
      try {
        await sendSms(phoneNumber);
        setShowOtpInput(true);
      } catch (error) {
        alert("Failed to send OTP. Please try again.");
      }
    } else {
      alert("Please enter a valid phone number.");
    }
  };
  const onOtpSubmit = async (otp) => {
    try {
      const response = await Verify(phoneNumber, otp);
      console.log("response from server", response);
      if (response.data && response.data.accessToken) {
        const accessToken = response.data.accessToken;
        //save tokens in cookie
        dispatch(login(accessToken));
        setShowOtpInput(false);
        setIsVisible(false);
        // Navigate to home page

        // navigate("/");
      } else {
        alert("verification failed");
      }
    } catch (error) {
      alert("Verification failed. Please try again.");
    }
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
            <h1 className="modal-text">ورود به وی کر</h1>
            <p className="modal-text p">
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
        <OtpInput
          length={4}
          onOtpSubmit={onOtpSubmit}
          phoneNumber={phoneNumber}
        />
        // </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Modal.css";

import { closePopup, getOpen } from "../../slice/popUpslice";
import OtpInput from "../Verification/OtpInput";

import sendSms from "../Verification/SendSms";
import Verify from "../Verification/Verify";
import { login } from "../../slice/authSlice";

export const Modal = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const isOpen = useSelector((state) => getOpen(state));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isOpen) {
      setPhoneNumber(""); // Clear phone number when modal is closed
      setShowOtpInput(false);
      setIsVisible(true); // Reset OTP input visibility
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Re-enable scrolling
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handlePhoneNumber = (e) => {
    e.preventDefault();
    setPhoneNumber(e.target.value);
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (phoneNumber.match(/^09\d{9}$/)) {
      try {
        await sendSms(phoneNumber);
        setShowOtpInput(true); // Show OTP input on success
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
      if (response.data && response.data.accessToken) {
        const accessToken = response.data.accessToken;
        dispatch(login(accessToken)); // Save token to Redux
        dispatch(closePopup());
        setShowOtpInput(false);
        setIsVisible(false); // Close modal
      } else {
        alert("Verification failed");
      }
    } catch (error) {
      alert("Verification failed. Please try again.");
    }
  };
  if (!isOpen || !isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white rounded-3xl shadow-lg w-[380px] h-[330px] p-6 flex flex-col justify-center items-center">
        {/* Close Button */}
        <button
          onClick={() => dispatch(closePopup())}
          className="absolute top-4 right-4 text-2xl font-bold text-gray-800 hover:text-gray-600"
        >
          &times;
        </button>

        {/* Title */}
        <h1
          className="text-center mb-4"
          style={{
            color: "#00818D",
            fontSize: "24px",
            fontWeight: "900",
            width: "70%",
          }}
        >
          ورود به وی‌کر
        </h1>
        {!showOtpInput ? (
          <>
            <p
              className="text-center  mb-8 "
              style={{
                color: "#00818D",
                fontSize: "14px",
                fontWeight: "400",
                width: "70%",
              }}
            >
              برای استفاده از خدمات وی‌کِر لازم است وارد شوید. شماره موبایل خود
              را وارد کنید
            </p>

            {/* Phone Input */}
            <form onSubmit={handlePhoneSubmit} className="w-full px-4">
              <div
                className="flex items-center bg-gray-100 border  rounded-xl px-4 py-3 mb-4"
                style={{ borderColor: "#00818D" }}
              >
                <span className="text-teal-700 text-lg font-medium mr-2">
                  +98
                </span>
                <input
                  type="text"
                  placeholder="--- --- ----"
                  value={phoneNumber}
                  maxLength="11"
                  pattern="09[0-9]{9}"
                  required
                  onChange={handlePhoneNumber}
                  className="flex-1 bg-transparent outline-none text-sm tracking-widest"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className=" text-white px-4 py-2 rounded-lg font-semibold "
                  style={{
                    background: "#00818D",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  ارسال کد تایید
                </button>
              </div>
            </form>
          </>
        ) : (
          <OtpInput
            length={4}
            onOtpSubmit={onOtpSubmit}
            phoneNumber={phoneNumber}
          />
        )}
      </div>
    </div>
  );
};

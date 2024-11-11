import { useEffect, useRef, useState } from "react";
import "./OtpInput.css";
import { closePopup, getOpen } from "../../slice/popUpslice";
import { useDispatch, useSelector } from "react-redux";
import sendSms from "./SendSms";

const OtpInput = ({ length = 4, onOtpSubmit = () => {} }, phoneNumber) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };
  const handleResend = async () => {
    try {
      await sendSms(phoneNumber);
      alert("کد مجدداً ارسال شد.");
    } catch (error) {
      alert("ارسال کد مجدد شکست خورد. دوباره امتحان کنید.");
    }
  };
  return (
    <div className="otp-modal-container ">
      <div className="otp-container">
        <span onClick={() => dispatch(closePopup())} className="modal-close">
          &times;
        </span>
        <h1 className="otp-text">کد ارسال شده را وارد کنید</h1>
        <div className="otp-input-wrapper">
          {otp.map((value, index) => {
            return (
              <input
                key={index}
                type="text"
                ref={(input) => (inputRefs.current[index] = input)}
                value={value}
                onChange={(e) => handleChange(index, e)}
                onClick={() => handleClick(index)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="otpInput"
              />
            );
          })}
        </div>
        <button className="otp-submit-btn">تایید کد</button>
        <button className="send-agian" onClick={handleResend}>
          ارسال مجدد
        </button>
      </div>
    </div>
  );
};

export default OtpInput;

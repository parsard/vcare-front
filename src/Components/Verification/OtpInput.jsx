import { useEffect, useRef, useState } from "react";
import { closePopup } from "../../slice/popUpslice";
import { useDispatch } from "react-redux";
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
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-3xl shadow-lg w-[380px] h-[330px] p-6 flex flex-col justify-center items-center">
        {/* Close Button */}
        <button
          onClick={() => dispatch(closePopup())}
          className="absolute top-4 right-4 text-2xl font-bold text-gray-800 hover:text-gray-600"
        >
          &times;
        </button>

        {/* Title */}
        <h1 className="text-lg font-bold text-teal-700 mb-10">
          کد ارسال شده را وارد کنید
        </h1>

        {/* OTP Input Fields */}
        <div className="flex justify-center mb-6">
          {otp.map((value, index) => (
            <input
              key={index}
              placeholder="_"
              type="text"
              ref={(input) => (inputRefs.current[index] = input)}
              value={value}
              onChange={(e) => handleChange(index, e)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-10 h-10 mx-1 text-lg text-center border-2  rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              style={{ borderColor: " rgba(0, 129, 141, 0.25)" }}
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={() => onOtpSubmit(otp.join(""))}
          className="bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold mb-4"
        >
          تایید کد
        </button>

        {/* Resend Code Button */}
        <button
          onClick={handleResend}
          className="text-teal-700 text-sm cursor-pointer"
        >
          ارسال مجدد
        </button>
      </div>
    </div>
  );
};

export default OtpInput;

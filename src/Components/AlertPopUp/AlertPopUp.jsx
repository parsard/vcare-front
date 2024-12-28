import React from "react";

const AlertPopup = ({ type, message, onClose }) => {
  return (
    <div
      className={`fixed top-16 right-1/2 translate-x-1/2 w-72 p-4 rounded-lg shadow-lg text-white flex flex-col items-center justify-center`}
      style={{
        backgroundColor: type === "success" ? "#0B7E42" : "#F03",
        marginTop: "24px",
      }}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-xl font-bold text-white hover:opacity-80"
      ></button>
    </div>
  );
};

export default AlertPopup;

import React from "react";

const AlertPopup = ({ type, message, onClose }) => {
  return (
    <div
      className={`fixed top-5 right-5 w-72 p-4 rounded-lg shadow-lg text-white flex items-center justify-between ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
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

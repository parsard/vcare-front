import React, { useState } from "react";
import { Calendar } from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/teal.css";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const PersianDatePicker = ({ onDateSelect = () => {} }) => {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDateChange = (date) => {
    if (date) {
      const jalaliDate = date.format("YYYY-MM-DD");
      setSelectedDay(jalaliDate);
      onDateSelect(jalaliDate);
    }
  };

  return (
    <div
      className="bg-white rounded-lg flex items-center justify-center p-4"
      style={{
        width: "300px", // Fixed width
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Calendar */}
      <Calendar
        value={selectedDay}
        onChange={handleDateChange}
        calendar={persian}
        locale={persian_fa}
        style={{
          width: "100%",
          margin: "16px 0", // Space above and below calendar
        }}
        weekDays={["ش", "ی", "د", "س", "چ", "پ", "ج"]}
      />

      {/* Select Button */}
      <button
        className=" text-white py-2 px-6 rounded-full shadow hover:bg-teal-600 transition"
        style={{
          width: "90%",
          maxWidth: "150px",
          backgroundColor: "#00818D",
          fontSize: "14px",
          fontWeight: "600",
        }}
      >
        انتخاب ساعت
      </button>
    </div>
  );
};

export default PersianDatePicker;

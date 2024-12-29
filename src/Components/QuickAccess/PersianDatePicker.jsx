import React, { useState } from "react";
import { Calendar } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import moment from "jalali-moment";

const PersianDatePicker = ({ onDateSelect }) => {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDay(date);

    // Convert selected day to Jalali format
    if (date) {
      const { year, month, day } = date;
      const gregorianDate = moment(`${year}-${month}-${day}`, "YYYY-MM-DD");
      const jalaliDate = gregorianDate.locale("fa").format("jYYYY-jMM-jDD");
      onDateSelect(jalaliDate); // Pass Jalali date to the parent component
    }
  };

  return (
    <div dir="rtl" className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">انتخاب تاریخ</h2>
      <Calendar
        value={selectedDay}
        onChange={handleDateChange}
        calendarClassName="persian-calendar"
        shouldHighlightWeekends
        locale="fa"
      />
      <p className="mt-4 text-sm text-gray-600">
        {selectedDay
          ? `تاریخ انتخاب شده: ${moment(
              `${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`,
              "YYYY-MM-DD"
            )
              .locale("fa")
              .format("jYYYY-jMM-jDD")}`
          : "تاریخی انتخاب نشده است."}
      </p>
    </div>
  );
};

export default PersianDatePicker;

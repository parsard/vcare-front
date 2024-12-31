import React, { useState } from "react";

const TimePickerModal = ({ timeSlots, onTimeSelect, onClose, onReserve }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const handleTimeSlotClick = (time) => {
    // onTimeSelect(time);
    setSelectedTime(time);
    console.log("selected slot", time);
    // onReserve();
  };

  const handleConfirm = () => {
    if (selectedTime) {
      onTimeSelect(selectedTime);
      onClose();
      onReserve(selectedTime);
    } else {
      alert("لطفا یک زمان را انتخاب کنید");
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white rounded-lg shadow-lg p-8"
        style={{ width: "320px", textAlign: "center" }}
      >
        <h3 className="text-teal-600 text-lg font-bold mb-4">انتخاب زمان</h3>
        {/* {timeSlots.lenght > 0 ? ( */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {timeSlots.map((time, index) => (
            <button
              key={index}
              className={`border-2 py-2 rounded-md transition ${
                time.status === "reserved"
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed" // Reserved slots
                  : selectedTime === time
                  ? "bg-teal-100 border-teal-500 text-teal-600" // Selected slot
                  : "border-gray-300 text-gray-600 hover:bg-teal-100 hover:border-teal-500 hover:text-teal-600" // Default slot
              }`}
              onClick={
                () => time.status === "available" && handleTimeSlotClick(time) // Only allow available slots to be selected
              }
              disabled={time.status === "reserved"} // Disable reserved slots
            >
              {time.startTime} - {time.endTime}
            </button>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="mt-4 px-6 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition"
            onClick={handleConfirm}
          >
            تایید رزرو
          </button>
          {/* ) : (
          <p className="text-gray-600">زمانی برای رزرو وجود ندارد</p>
          )} */}
          <button
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
            onClick={onClose}
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimePickerModal;

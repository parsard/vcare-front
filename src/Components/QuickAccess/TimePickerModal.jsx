import React from "react";

const TimePickerModal = ({ timeSlots, onTimeSelect, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white rounded-lg shadow-lg p-8"
        style={{ width: "320px", textAlign: "center" }}
      >
        <h3 className="text-teal-600 text-lg font-bold mb-4">انتخاب زمان</h3>
        {timeSlots.lenght > 0 ? (
          <div className="grid grid-cols-3 gap-4 mb-4">
            {timeSlots.map((time, index) => (
              <button
                key={index}
                className="border-2 border-teal-500 text-teal-600 py-2 rounded-md hover:bg-teal-100 transition"
                onClick={() => onTimeSelect(time)}
              >
                {time.startTime} - {time.endTime}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">زمانی برای رزرو وجود ندارد</p>
        )}
        <button
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
          onClick={onClose}
        >
          بستن
        </button>
      </div>
    </div>
  );
};

export default TimePickerModal;

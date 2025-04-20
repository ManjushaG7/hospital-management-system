import React from "react";
import convertTime from "../../utils/convertTime";
const BookingPanel = ({ doctorId, opPrice, timeSlots }) => {
  return (
    <div className="bg-white shadow-xl p-6 rounded-2xl w-full max-w-md space-y-6 border border-gray-100">
      {/* OP Price */}
      <div className="flex items-center justify-between border-b pb-3">
        <h3 className="text-lg font-semibold text-gray-700">OP Consultation Fee</h3>
        <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full font-bold text-sm shadow-sm">
          ₹{opPrice}
        </span>
      </div>

      {/* Time Slots */}
      <div>
        <h4 className="text-md font-semibold text-gray-800 mb-3">Available Time Slots</h4>
        <ul className="space-y-3">
          {timeSlots?.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
            >
              <p className="font-medium text-gray-600">{item.day.charAt(0).toUpperCase() + item.day.slice(1)}</p>
              <p className="text-gray-700 font-semibold">
                {convertTime(item.startingTime)} - {convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Book Button */}
      <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-md">
        Book Appointment
      </button>
    </div>
  );
};

export default BookingPanel;

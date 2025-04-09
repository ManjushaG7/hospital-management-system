import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import { FaMoneyBillWave, FaClock, FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaUserMd } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

const BookingPanel = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [availableSlots, setAvailableSlots] = useState([]);

  // Define available slots for each day of the week
  const timeSlots = {
    Monday: ["9:00 AM", "11:00 AM", "2:00 PM"],
    Tuesday: ["10:00 AM", "12:00 PM", "4:00 PM"],
    Wednesday: ["9:00 AM", "11:00 AM", "1:00 PM", "5:00 PM"],
    Thursday: ["10:00 AM", "2:00 PM", "6:00 PM"],
    Friday: ["9:00 AM", "12:00 PM", "3:00 PM"],
    Saturday: ["10:00 AM", "1:00 PM", "4:00 PM"],
    Sunday: [], // No available slots on Sundays
  };

  // Handle date selection and update available slots
  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Get the day of the week (e.g., Monday, Tuesday)
    const dayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
    setAvailableSlots(timeSlots[dayName] || []);
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 w-full md:w-[350px] sticky top-24"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
        <FaUserMd className="text-blue-500" /> Book an Appointment
      </h3>

      {/* Appointment Fee */}
      <div className="mt-4 flex items-center gap-3 p-3 border border-green-300 bg-green-50 rounded-md">
        <FaMoneyBillWave className="text-green-500 text-2xl" />
        <p className="text-gray-700 font-medium">
          <span className="text-green-600 font-bold text-lg">₹150</span> / session
        </p>
      </div>

      {/* Availability Status */}
      <div className={`mt-3 flex items-center gap-2 p-2 rounded-md ${isAvailable ? "bg-blue-50 border border-blue-300" : "bg-red-50 border border-red-300"}`}>
        {isAvailable ? (
          <>
            <FaCheckCircle className="text-blue-500 text-xl" />
            <p className="text-blue-600 font-medium">Doctor is Available</p>
          </>
        ) : (
          <>
            <FaTimesCircle className="text-red-500 text-xl" />
            <p className="text-red-600 font-medium">Not Available Today</p>
          </>
        )}
      </div>

      {/* Date Selection with Advanced Calendar */}
      <div className="mt-4">
        <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <FaCalendarAlt className="text-blue-500" /> Select Date
        </h4>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()} // Disable past dates
          className="w-full p-2 border rounded-md mt-2"
          dateFormat="dd/MM/yyyy"
          placeholderText="Select a date"
        />
      </div>

      {/* Available Time Slots */}
      <div className="mt-4">
        <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <FaClock className="text-blue-500" /> Select Time Slot
        </h4>
        {availableSlots.length > 0 ? (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {availableSlots.map((slot, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedSlot(slot)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  selectedSlot === slot ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-blue-500 hover:text-white"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {slot}
              </motion.button>
            ))}
          </div>
        ) : (
          <p className="text-red-500 mt-2">No available slots for this date.</p>
        )}
      </div>

      {/* Book Appointment Button */}
      <motion.button
        className="mt-5 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={!selectedDate || !selectedSlot}
      >
        <FaCalendarAlt /> Book Appointment
      </motion.button>
    </motion.div>
  );
};

export default BookingPanel;

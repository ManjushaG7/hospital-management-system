import React from "react";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";

const MyBookings = () => {
  const {
    data: bookings,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/api/v1/users/appointments/my-appointments`);

  if (loading) {
    return <p className="text-center text-blue-600 font-medium">Loading your bookings...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 font-medium">Error: {error}</p>;
  }

  return (
    <div className="space-y-4">
      {bookings && Array.isArray(bookings) && bookings.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {bookings.map((booking) => (
            <li key={booking._id} className="p-4 rounded-xl bg-gray-50 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">📅 Appointment</h4>
                  <p className="text-sm text-gray-600">
                    Date: <span className="font-medium">{new Date(booking.date).toLocaleDateString()}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Time: <span className="font-medium">{booking.time || "N/A"}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Doctor: <span className="font-medium">{booking.doctor?.name || "Not Assigned"}</span>
                  </p>
                </div>
                <span className="inline-block px-4 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                  {booking.status || "Pending"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">You have no bookings yet.</p>
      )}
    </div>
  );
};

export default MyBookings;

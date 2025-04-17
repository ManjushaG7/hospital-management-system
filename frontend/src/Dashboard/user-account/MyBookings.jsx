import React from "react";
import useFetchData from "../../hooks/useFetchData"; // Make sure the path is correct

const MyBookings = () => {
  const { data, loading, error } = useFetchData("/users/appointments/my-appointments");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>My Bookings</h1>
      {/* Check if data exists and is an array before accessing its length */}
      {data && Array.isArray(data) && data.length > 0 ? (
        <ul>
          {data.map((booking) => (
            <li key={booking._id}>{booking.date}</li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default MyBookings;

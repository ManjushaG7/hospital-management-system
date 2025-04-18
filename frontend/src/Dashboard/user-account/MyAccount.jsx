import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import userImg from "../../assets/images/doctor-img01.png";
import MyBookings from "./MyBookings";
import Profile from "./Profile";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";

// Import Loading component
import Loading from "../../components/Loader/Loading"; // Update the path if necessary

const getEmoji = (userData) => {
  if (userData?.role === "doctor") {
    if (userData?.gender === "male") {
      return "🧑🏻‍⚕️"; // Male doctor
    }
    return "👩🏻‍⚕️"; // Female doctor
  }

  if (userData?.role === "patient") {
    return "🧑🏻"; // Patient emoji (You can change it to something else if needed)
  }
};

const MyAccount = () => {
  const { dispatch } = useContext(AuthContext);
  const [tab, setTab] = useState("bookings");
  const [showSpinner, setShowSpinner] = useState(true); // For handling loading spinner time

  const {
    data: userData,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/api/v1/users/profile/me`);

  useEffect(() => {
    // Set a timeout to hide the spinner after a few seconds (e.g., 3 seconds)
    const timer = setTimeout(() => {
      setShowSpinner(false); // Hide spinner after 3 seconds
    }, 2000); // Adjust this to your desired loading time

    // Clear timeout on component unmount to avoid memory leaks
    return () => clearTimeout(timer);
  }, []); // Run only once when the component mounts

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-100 via-white to-teal-100 min-h-screen overflow-hidden py-20 px-5">
      {/* Floating background effects */}
      <div className="absolute top-10 -left-10 w-72 h-72 bg-blue-200 rounded-full opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-pink-200 rounded-full opacity-30 blur-3xl animate-pulse"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 relative z-10">
        {/* Sidebar */}
        <div className="backdrop-blur-xl bg-white/80 border border-white/40 rounded-3xl shadow-2xl p-8 flex flex-col items-center space-y-6">
          <figure className="w-32 h-32 rounded-full overflow-hidden relative shadow-lg ring-4 ring-blue-400/30">
            <img
              src={userData?.photo || userImg}
              alt="User"
              className="w-full h-full object-cover"
            />
          </figure>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800">
              {getEmoji(userData)} {userData?.name || "Guest User"}
            </h3>
            <p className="text-gray-500">📧 {userData?.email || "Email not found"}</p>
            <p className="text-sm text-gray-600 mt-1">
              🩸 Blood Type:{" "}
              <span className="font-bold text-blue-700">
                {userData?.bloodType || "N/A"}
              </span>
            </p>
          </div>

          <div className="w-full pt-4 space-y-3">
            <button
              onClick={handleLogout}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] shadow-md"
            >
              🚪 Logout
            </button>
            <button
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] shadow-md"
            >
              ❌ Delete Account
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          {/* Tabs */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => setTab("bookings")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                tab === "bookings"
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-white text-blue-700 border border-blue-300 hover:bg-blue-50"
              }`}
            >
              📅 My Bookings
            </button>
            <button
              onClick={() => setTab("settings")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                tab === "settings"
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-white text-blue-700 border border-blue-300 hover:bg-blue-50"
              }`}
            >
              ⚙️ Profile Settings
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-3xl shadow-xl p-8 transition-all duration-500">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
              {tab === "bookings" ? "📋 Your Bookings" : "🛠️ Update Profile"}
            </h2>

            <div className="animate-fade-in">
              {/* Loading */}
              {showSpinner && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
                  <Loading />
                </div>
              )}

              {/* Error */}
              {error && <p className="text-red-500">Error: {error}</p>}

              {/* Tab Views */}
              {tab === "bookings" && <MyBookings />}
              {tab === "settings" && <Profile userData={userData} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;

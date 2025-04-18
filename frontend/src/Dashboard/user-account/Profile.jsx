import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Step 1
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL } from "../../config";
import { AuthContext } from "../../context/authContext";

const Profile = ({ userData }) => {
  const navigate = useNavigate(); // ✅ Step 2
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    bloodType: userData?.bloodType || "",
    gender: userData?.gender || "",
    photo: userData?.photo || "",
  });

  const [file, setFile] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");

  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        bloodType: userData.bloodType || "",
        gender: userData.gender || "",
        photo: userData.photo || "",
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      let imageUrl = formData.photo;

      if (file) {
        const uploadRes = await uploadImageToCloudinary(file);
        imageUrl = uploadRes.url;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("No token found. Please login again.");
        setUpdating(false);
        return;
      }

      const res = await fetch(`${BASE_URL}/api/v1/users/${userData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, photo: imageUrl }),
      });

      const result = await res.json();

      if (res.ok) {
        const updatedUser = result.data;
        localStorage.setItem("user", JSON.stringify(updatedUser));

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: updatedUser,
            token,
            role: updatedUser.role || "patient",
          },
        });

        setMessage("✅ Profile updated successfully!");

        // ✅ Step 3: Redirect after success
        setTimeout(() => {
          navigate("/users/profile/me");
        }, 1000);
      } else {
        setMessage(result.message || "❌ Failed to update profile.");
      }

    } catch (err) {
      console.error(err);
      setMessage("⚠️ Something went wrong while updating your profile.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Blood Type</label>
          <input
            type="text"
            name="bloodType"
            value={formData.bloodType}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="col-span-full">
          <label className="block mb-2 text-sm font-medium">Profile Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-all duration-300"
      >
        {updating ? "Updating..." : "Update Profile"}
      </button>

      {message && (
        <p className={`text-center mt-4 text-sm ${message.includes("✅") ? "text-green-600" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </form>
  );
};

export default Profile;

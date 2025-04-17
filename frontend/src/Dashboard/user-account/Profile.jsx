import { useState, useContext } from "react";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL } from "../../config";
import { AuthContext } from "../../context/authContext"; // If you want to dispatch

const Profile = ({ userData }) => {
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

      const url = `${BASE_URL}/api/v1/users/${userData._id}`;

      const res = await fetch(url, {
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

        // ✅ Preserve token (do not overwrite token unless it changes)
        // We keep the token intact to prevent session loss
        const currentToken = localStorage.getItem("token");
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // 🧠 Update AuthContext properly after profile update
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: updatedUser,
            token: currentToken, // Keep the token intact
            role: updatedUser.role || "patient", // Ensure proper role is assigned
          },
        });

        setMessage("✅ Profile updated successfully!");

        // ⏱ Optional: Refresh the view without triggering logout
        setTimeout(() => {
          // No reload needed if state is properly updated
          // window.location.reload();
        }, 1000);
      } else {
        setMessage(result.message || "Failed to update profile.");
      }

      setUpdating(false);
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong while updating profile.");
      setUpdating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full border px-4 py-2 rounded"
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          disabled
          value={formData.email}
          className="w-full border px-4 py-2 rounded bg-gray-100"
        />
      </div>

      <div>
        <label>Blood Type</label>
        <input
          type="text"
          name="bloodType"
          value={formData.bloodType}
          onChange={handleInputChange}
          className="w-full border px-4 py-2 rounded"
        />
      </div>

      <div>
        <label>Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label>Profile Image</label>
        <input type="file" onChange={handleFileChange} />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        {updating ? "Updating..." : "Update Profile"}
      </button>

      {message && (
        <p className="text-sm text-green-500 mt-2">{message}</p>
      )}
    </form>
  );
};

export default Profile;

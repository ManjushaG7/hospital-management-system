import { useState } from 'react';
import signupImg from '../assets/images/signup.gif';
import { Link, useNavigate } from "react-router-dom";
import uploadImageToCloudinary from '../utils/uploadCloudinary';
import { BASE_URL } from '../config';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photo: selectedFile,
    gender: '',
    role: 'patient',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);

    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const submitHandler = async event => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const { message } = await res.json();

      if (!res.ok) {
        // Show custom error for existing user
        if (message.toLowerCase().includes('already')) {
          toast.error("🚫 User already exists! Try logging in.");
        } else {
          throw new Error(message);
        }
        setLoading(false);
        return;
      }

      // Show success message
      toast.success("🎉 User created successfully!");
      setLoading(false);
      navigate('/login');
    } catch (error) {
      toast.error(`❌ ${error.message}`);
      setLoading(false);
      console.log("Form data before submit:", formData);
    }
  };

  return (
    <section className="min-h-screen pt-[100px] flex items-center justify-center bg-gradient-to-br from-[#ffe6f0] via-[#e0f7fa] to-[#e5e5ff] px-5 pb-10 font-sans">
      <div className="max-w-[1150px] w-full grid lg:grid-cols-2 bg-white/30 backdrop-blur-lg rounded-[20px] overflow-hidden shadow-2xl border border-white/40">

        {/* Image side */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-b from-[#8b5cf6] to-[#6366f1] p-10 text-white">
          <img src={signupImg} alt="Sign up" className="w-full object-cover rounded-2xl drop-shadow-xl" />
          <p className="text-lg mt-4 font-semibold animate-pulse">Welcome to the Future 💫</p>
        </div>

        {/* Form side */}
        <div className="py-10 px-6 sm:px-10 bg-white bg-opacity-80 text-[#1f2937]">
          <h2 className="text-3xl font-extrabold text-center mb-8 tracking-wide text-[#4f46e5]">
            Sign Up & Glow Up ✨
          </h2>

          <form onSubmit={submitHandler} className="space-y-5">

            <input
              type="text"
              placeholder="👤 Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:ring-4 ring-[#6366f1] shadow-sm text-sm placeholder:text-gray-500"
              required
            />

            <input
              type="email"
              placeholder="📧 Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:ring-4 ring-[#6366f1] shadow-sm text-sm placeholder:text-gray-500"
              required
            />

            <input
              type="password"
              placeholder="🔒 Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:ring-4 ring-[#6366f1] shadow-sm text-sm placeholder:text-gray-500"
              required
            />

            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
              <label className="text-sm font-medium text-gray-700">
                Role:
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="ml-2 mt-1 px-3 py-2 rounded-lg bg-white border border-gray-300 text-sm"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
              </label>

              <label className="text-sm font-medium text-gray-700">
                Gender:
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="ml-2 mt-1 px-3 py-2 rounded-lg bg-white border border-gray-300 text-sm"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </div>

            <div className="flex items-center gap-4">
              {selectedFile && (
                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#6366f1]">
                  <img src={previewURL} alt="preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="relative w-full">
                <input
                  type="file"
                  id="customFile"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileInputChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <label
                  htmlFor="customFile"
                  className="inline-block w-full text-center px-4 py-2 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold rounded-lg cursor-pointer transition hover:scale-105 shadow-md"
                >
                  📷 Upload Photo
                </label>
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-bold text-base rounded-xl shadow-lg transform transition hover:scale-[1.02] active:scale-95 duration-200"
            >
              {loading ? <HashLoader size={25} color="#ffffff" /> : 'Sign Up 🚀'}
            </button>

            <p className="text-sm text-center mt-4 text-gray-600">
              Already vibin' here?
              <Link to="/login" className="text-[#6366f1] font-medium ml-1 hover:underline">
                Login Instead
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;

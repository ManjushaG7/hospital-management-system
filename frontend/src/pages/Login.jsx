import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import loginBg from "../assets/images/hospital-bg.jpg";
import { motion } from "framer-motion";
import { BASE_URL } from "../config";
import { AuthContext } from "../context/authContext.jsx";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    const hour = new Date().getHours();
    setWelcomeMessage(
      hour < 12
        ? "Rise & Shine! ☀️"
        : hour < 18
        ? "Hey There, Afternoon Vibes! 😎"
        : "Night Owl Mode 🌙"
    );
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "password") {
      const value = e.target.value;
      if (value.length < 6) setPasswordStrength("Weak 🔴");
      else if (value.length < 10) setPasswordStrength("Moderate 🟡");
      else setPasswordStrength("Strong 🟢");
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: result.data,
          role: result.role,
          token: result.token,
        },
      });

      // ✅ Save to localStorage
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.data));

      toast.success(result.message);
      setLoading(false);
      navigate('/home');
    } catch (error) {
      toast.error(`❌ ${error.message}`);
      console.error("❌ Login Error:", error.message);
      setLoading(false);
    }
  };

  return (
    <section
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <motion.div
        className="relative w-full max-w-[500px] bg-white bg-opacity-20 backdrop-blur-lg shadow-2xl rounded-xl p-8 text-white border border-gray-200/40"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h3 className="text-4xl font-extrabold text-center mb-2">{welcomeMessage}</h3>
        <p className="text-center text-gray-200 mb-6">Welcome Back! Let’s Get You In. 🔐</p>

        <form onSubmit={submitHandler} className="space-y-5">
          <div className="relative">
            <input
              type="email"
              placeholder="Email 📧"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white bg-opacity-40 text-white placeholder-gray-200 focus:border-blue-500 focus:outline-none shadow-md backdrop-blur-lg"
              required
            />
            <FaEnvelope className="absolute top-3 right-3 text-gray-300" />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password 🔑"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white bg-opacity-40 text-white placeholder-gray-200 focus:border-blue-500 focus:outline-none shadow-md backdrop-blur-lg"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 text-gray-300"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {formData.password && (
            <motion.p
              className={`text-sm font-medium ${
                passwordStrength.includes("Weak") ? "text-red-400" :
                passwordStrength.includes("Moderate") ? "text-yellow-300" :
                "text-green-400"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {passwordStrength}
            </motion.p>
          )}

          {isLocked && (
            <motion.p
              className="text-red-400 text-center font-semibold"
              animate={{ x: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.4 }}
            >
              Whoops! Too Many Attempts. Try Later. ⏳
            </motion.p>
          )}

          <motion.button
            type="submit"
            className={`relative w-full text-white text-lg font-bold px-6 py-3 rounded-xl shadow-xl transition-all transform
              ${
                isLocked ? "bg-red-500 cursor-not-allowed animate-shake" : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-pink-500"
              }`}
            disabled={isLocked}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Logging in..." : isLocked ? "🚫 Locked" : "🚀 Login"}
          </motion.button>

          <p className="mt-4 text-center text-gray-200">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-pink-300 font-semibold hover:underline">
              Sign Up 🚀
            </Link>
          </p>
        </form>
      </motion.div>
    </section>
  );
};

export default Login;

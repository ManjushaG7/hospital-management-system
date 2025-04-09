import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import loginBg from "../assets/images/hospital-bg.jpg"; // Ensure correct path
import { motion } from "framer-motion"; // Import for animations

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("");

  // Set dynamic welcome message
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

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Password strength checker
    if (e.target.name === "password") {
      const value = e.target.value;
      if (value.length < 6) setPasswordStrength("Weak 🔴");
      else if (value.length < 10) setPasswordStrength("Moderate 🟡");
      else setPasswordStrength("Strong 🟢");
    }
  };

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    if (isLocked) return;

    if (formData.email === "user@example.com" && formData.password === "password123") {
      alert("✨ Login Successful!");
      setLoginAttempts(0);
    } else {
      setLoginAttempts((prev) => prev + 1);
      if (loginAttempts >= 2) setIsLocked(true);
    }
  };

  return (
    <section
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Login Card */}
      <motion.div
        className="relative w-full max-w-[500px] bg-white bg-opacity-20 backdrop-blur-lg shadow-2xl rounded-xl p-8 text-white border border-gray-200/40"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h3 className="text-4xl font-extrabold text-center text-white mb-2 drop-shadow-lg">{welcomeMessage}</h3>
        <p className="text-center text-gray-200 mb-6">Welcome Back! Let’s Get You In. 🔐</p>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
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

          {/* Password Input */}
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

          {/* Password Strength Indicator */}
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

          {/* Locked Message */}
          {isLocked && (
            <motion.p
              className="text-red-400 text-center font-semibold"
              animate={{ x: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.4 }}
            >
              Whoops! Too Many Attempts. Try Later. ⏳
            </motion.p>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            className={`relative w-full text-white text-lg font-bold px-6 py-3 rounded-xl shadow-xl transition-all transform
              ${
                isLocked ? "bg-red-500 cursor-not-allowed animate-shake" : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-pink-500"
              }`}
            disabled={isLocked}
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(255, 105, 180, 0.8)" }}
            whileTap={{ scale: 0.9 }}
            animate={isLocked ? { x: [0, -5, 5, -5, 5, 0] } : { opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {isLocked ? "🚫 Locked" : "🚀 Login"}
          </motion.button>

          {/* Register Link */}
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

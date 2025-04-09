import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import contactBg from "../assets/images/contact-bg.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required!";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format!";
    }
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty!";
    return newErrors;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors on input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsSent(true);
      setIsLoading(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});

      setTimeout(() => setIsSent(false), 3000);
    }, 2000);
  };

  return (
    <section
      className="relative flex justify-center items-center min-h-screen bg-cover bg-center px-5"
      style={{ backgroundImage: `url(${contactBg})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-lg bg-white p-8 rounded-lg shadow-lg z-10"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Get in Touch
        </h2>

        {isSent && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-500 text-center"
          >
            Message Sent Successfully!
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full pl-10 p-3 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none`}
              required
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full pl-10 p-3 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none`}
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="relative">
            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone (Optional)"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleInputChange}
            className={`w-full p-3 border ${
              errors.message ? "border-red-500" : "border-gray-300"
            } rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none h-32`}
            required
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center gap-2 ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } text-white py-3 rounded-md font-semibold text-lg transition-all shadow-md`}
          >
            {isLoading ? "Sending..." : <><FaPaperPlane /> Send Message</>}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    reason: '',
    category: '',
    doctor: ''
  });

  const categories = ['General Checkup', 'Dental', 'Therapy', 'Pediatrics'];

  const doctors = {
    'General Checkup': ['Dr. Alex Morgan', 'Dr. Jamie Lin'],
    'Dental': ['Dr. Chris Evans', 'Dr. Bailey Ray'],
    'Therapy': ['Dr. Mindy Wells', 'Dr. Tony Kim'],
    'Pediatrics': ['Dr. Samira Ali', 'Dr. Nora Patel']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset doctor if category changes
      ...(name === 'category' && { doctor: '' })
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("🎉 Appointment Requested! We'll be in touch ASAP!");
    setFormData({
      name: '',
      date: '',
      time: '',
      reason: '',
      category: '',
      doctor: ''
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-tr from-indigo-100 to-blue-200 p-8 flex justify-center items-center">
      <motion.div 
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">📅 Book Your Appointment</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold">👤 Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Taylor Swift"
              className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-semibold">🏷️ Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Doctor */}
          {formData.category && (
            <div>
              <label className="block text-gray-700 font-semibold">🩺 Select Doctor</label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              >
                <option value="">Choose a doctor</option>
                {doctors[formData.category]?.map((doc, idx) => (
                  <option key={idx} value={doc}>{doc}</option>
                ))}
              </select>
            </div>
          )}

          {/* Date */}
          <div>
            <label className="block text-gray-700 font-semibold">🗓️ Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-gray-700 font-semibold">⏰ Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block text-gray-700 font-semibold">💬 Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Feeling off? Let us know..."
              className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows="3"
              required
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
          >
            Let's Do This 🚀
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default BookAppointment;

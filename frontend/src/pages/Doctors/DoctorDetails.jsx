import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserMd, FaGraduationCap, FaBriefcase, FaStethoscope } from "react-icons/fa";
import doctorimg from "../../assets/images/doctor-img02.png";
import starIcon from "../../assets/images/Star.png";
import heartbeatIcon from "../../assets/images/heartbeat.jpg";
import { Book } from "lucide-react";
import BookingPanel from "./BookingPanel";

const DoctorDetails = () => {
  const [tab, setTab] = useState("about");
  const [rating, setRating] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [reviews, setReviews] = useState([
    { emoji: "😊", text: "Dr. Babu was incredibly professional and caring throughout my treatment." },
    { emoji: "👍", text: "Highly skilled surgeon! My surgery went perfectly, and I recovered fast!" },
  ]);

  const handleSubmit = () => {
    if (feedback.trim() && rating) {
      setReviews([{ emoji: rating, text: feedback }, ...reviews]);
      setFeedback("");
      setRating(null);
    }
  };

  return (
    <section className="pt-[100px] pb-10 bg-gradient-to-b from-blue-600 to-indigo-600">
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[50px] items-start">
          {/* Doctor Profile Card */}
          <motion.div
            className="md:col-span-2 bg-white shadow-lg rounded-xl p-6 relative overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Floating Medical Icon */}
            <img src={heartbeatIcon} alt="Medical Icon" className="absolute top-[-20px] right-[-10px] w-[80px] opacity-50" />

            <div className="flex items-center gap-5">
              {/* Doctor Image */}
              <motion.figure
                className="w-[200px] h-[200px] rounded-full overflow-hidden border-4 border-blue-500 shadow-md"
                whileHover={{ scale: 1.05 }}
              >
                <img src={doctorimg} alt="Doctor" className="w-full" />
              </motion.figure>

              {/* Doctor Info */}
              <div>
                <span className="bg-blue-100 text-blue-600 py-2 px-6 text-[14px] font-semibold rounded-full flex items-center gap-2 shadow-sm">
                  <FaUserMd className="text-blue-500" /> Surgeon
                </span>

                <h3 className="text-gray-800 text-[24px] leading-9 mt-3 font-bold">
                  Dr. Ravinder Babu
                </h3>
                

                {/* Star Ratings */}
                <div className="flex items-center gap-[6px] mt-2">
                  <span className="flex items-center gap-[6px] text-[16px] font-semibold text-gray-700">
                    <img src={starIcon} alt="Star Icon" className="w-5" /> 4.8
                  </span>
                  <span className="text-[14px] font-medium text-gray-500">
                    (272 Reviews)
                  </span>
                </div>

                {/* Bio Summary */}
                <p className="text-gray-600 text-[16px] mt-3 max-w-[390px] leading-6">
                  An experienced surgeon specializing in minimally invasive and robotic surgeries, committed to patient-centered care.
                </p>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="mt-6 border-b border-solid border-gray-300 flex">
              <button
                onClick={() => setTab("about")}
                className={`py-3 px-5 text-[16px] font-semibold transition-all ${
                  tab === "about"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-600 hover:text-blue-500"
                }`}
              >
                About
              </button>

              <button
                onClick={() => setTab("feedback")}
                className={`py-3 px-5 text-[16px] font-semibold transition-all ${
                  tab === "feedback"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-600 hover:text-blue-500"
                }`}
              >
                Feedback
              </button>
            </div>
            

            {/* Tab Content */}
            <motion.div
              className="mt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {tab === "about" && (
                <div className="mt-5 space-y-6">
                  {/* Personal Bio - Blue Theme */}
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 shadow-sm rounded-lg">
                    <h4 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                      <FaStethoscope className="text-blue-500" /> About Dr. Ravinder Babu
                    </h4>
                    <p className="mt-1 text-gray-700">
                      A highly skilled **surgeon** with over **10 years of experience**, Dr. Babu specializes in **minimally invasive and robotic surgeries**. His commitment to **patient-centered care** ensures the best medical outcomes.
                    </p>
                  </div>

                  {/* Education - Green Theme */}
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 shadow-sm rounded-lg">
                    <h4 className="text-lg font-semibold text-green-700 flex items-center gap-2">
                      <FaGraduationCap className="text-green-500" /> Education
                    </h4>
                    <ul className="list-disc list-inside mt-1 text-gray-700 space-y-1">
                      <li><strong>MBBS</strong> - AIIMS, New Delhi 🎓</li>
                      <li><strong>MD (Surgery)</strong> - JIPMER, Puducherry</li>
                      <li><strong>Fellowship in Robotic Surgery</strong> - Harvard Medical School</li>
                    </ul>
                  </div>

                  {/* Experience - Red Theme */}
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 shadow-sm rounded-lg">
                    <h4 className="text-lg font-semibold text-red-700 flex items-center gap-2">
                      <FaBriefcase className="text-red-500" /> Experience
                    </h4>
                    <ul className="list-disc list-inside mt-1 text-gray-700 space-y-1">
                      <li>Senior Consultant **(Apollo Hospitals, Hyderabad)** - 2018 - Present 🏥</li>
                      <li>Assistant Professor **(AIIMS, New Delhi)** - 2015 - 2018</li>
                      <li>Resident Surgeon **(JIPMER, Puducherry)** - 2012 - 2015</li>
                    </ul>
                  </div>

                  {/* Specialization - Purple Theme */}
                  <div className="bg-purple-50 border-l-4 border-purple-500 p-4 shadow-sm rounded-lg">
                    <h4 className="text-lg font-semibold text-purple-700 flex items-center gap-2">
                      🏥 Specialization
                    </h4>
                    <p className="mt-1 text-gray-700">
                      Expert in **Minimally Invasive Surgery, Robotic Surgery, and Trauma Care**. Specializes in **laparoscopic procedures** to ensure quick recovery.
                    </p>
                  </div>
                </div>
              )}
              {tab === "feedback" && (
                <div className="bg-white p-4 shadow-md rounded-lg">
                  <h4 className="text-lg font-semibold text-blue-500 mb-3">Patient Reviews</h4>

                  {/* Emoji Rating */}
                  <div className="flex gap-4 mb-3">
                    {["😊", "😐", "😞"].map((emoji) => (
                      <motion.button
                        key={emoji}
                        whileTap={{ scale: 0.9 }}
                        className={`text-3xl ${rating === emoji ? "text-blue-500" : "text-gray-400"}`}
                        onClick={() => setRating(emoji)}
                      >
                        {emoji}
                      </motion.button>
                    ))}
                  </div>

                  {/* Feedback Input */}
                  <textarea
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your review..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  ></textarea>

                  {/* Submit Button */}
                  <motion.button
                    className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                  >
                    Submit Feedback
                  </motion.button>

                  {/* Reviews List */}
                  <div className="mt-5 space-y-3">
                    {reviews.map((review, index) => (
                      <div key={index} className="p-3 bg-gray-100 rounded-md flex items-start gap-3">
                        <span className="text-2xl">{review.emoji}</span>
                        <p className="text-gray-700">{review.text}</p>
                      </div>
                     
                    ))}
                  </div>
                </div>
                   
                
              )}
            </motion.div>
          </motion.div>   
          {/* Right Side: Booking Panel */}
          <div className="hidden md:block">
            <BookingPanel />
          </div>  
        </div>
      </div>
    </section>
  );
};

export default DoctorDetails;

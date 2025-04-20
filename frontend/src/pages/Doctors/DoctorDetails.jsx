import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserMd, FaGraduationCap, FaBriefcase, FaStethoscope } from "react-icons/fa";
import doctorimg from "../../assets/images/doctor-img02.png";
import starIcon from "../../assets/images/Star.png";
import heartbeatIcon from "../../assets/images/heartbeat.jpg";
import { Book } from "lucide-react";
import BookingPanel from "./BookingPanel";
import { BASE_URL } from '../../config';
import useFetchData from '../../hooks/useFetchData';
import Loader from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import { useParams } from "react-router-dom";
import Feedback from "./Feedback";


const DoctorDetails = () => {
  const [tab, setTab] = useState("about");
  const {id} = useParams()
  const [rating, setRating] = useState(null);
  const [feedback, setFeedback] = useState("");
  const {data:doctor, loading, error} = useFetchData(`${BASE_URL}/api/v1/doctors/${id}`);
  

  const handleSubmit = () => {
    if (feedback.trim() && rating) {
      setReviews([{ emoji: rating, text: feedback }, ...reviews]);
      setFeedback("");
      setRating(null);
    }
  };


const {
      name,
      qualifications,
      experiences,
      timeSlots,
      reviews,
      bio,
      about,
      averageRating,
      totalRating,
      specialization,
      opPrice,
      photo,
      fellowships,
   } = doctor;



  return (
    <section className="pt-[100px] pb-10 bg-gradient-to-b from-blue-600 to-indigo-600">
      <div className="max-w-[1170px] px-5 mx-auto">
      {loading && <Loader/>}
      {error && <Error/>}
        {!loading && !error && (<div className="grid md:grid-cols-3 gap-[50px] items-start">
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
                <img src={photo} alt="" className="w-full h-full object-cover" />
              </motion.figure>

              {/* Doctor Info */}
              <div>
                <span className="bg-blue-100 text-blue-600 py-2 px-6 text-[14px] font-semibold rounded-full flex items-center gap-2 shadow-sm">
                  <FaUserMd className="text-blue-500" /> {specialization}
                </span>

                <h3 className="text-gray-800 text-[24px] leading-9 mt-3 font-bold">
                  {name}
                </h3>
                

                {/* Star Ratings */}
                <div className="flex items-center gap-[6px] mt-2">
                  <span className="flex items-center gap-[6px] text-[16px] font-semibold text-gray-700">
                    <img src={starIcon} alt="Star Icon" className="w-5" /> {averageRating}
                  </span>
                  <span className="text-[14px] font-medium text-gray-500">
                    ({totalRating})
                  </span>
                </div>

                {/* Bio Summary */}
                <p className="text-gray-600 text-[16px] mt-3 max-w-[390px] leading-6">
                  {bio}
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
                      <FaStethoscope className="text-blue-500" /> About {name}
                    </h4>
                    <p className="mt-1 text-gray-700">
                      {about}
                    </p>
                  </div>

                  {/* Education - Green Theme */}
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 shadow-sm rounded-lg">
                    <h4 className="text-lg font-semibold text-green-700 flex items-center gap-2">
                      <FaGraduationCap className="text-green-500" /> Education
                    </h4>
                    
                    <ul className="list-disc pl-5 text-gray-700 mt-2 space-y-1">
                        {qualifications?.length > 0 ? (
                          qualifications.map((item, idx) => (
                            <li key={idx}>
                              <span className="font-semibold">{item.degree}</span> from{" "}
                              {item.university} (from {item.startingDate} to {item.endingDate})
                            </li>
                          ))
                        ) : (
                          <li>No qualifications listed.</li>
                        )}
                    </ul>
                  </div>

                  {/* Experience - Red Theme */}
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 shadow-sm rounded-lg">
                    <h4 className="text-lg font-semibold text-red-700 flex items-center gap-2">
                      <FaBriefcase className="text-red-500" /> Experience
                    </h4>
                    <ul className="list-disc pl-5 text-gray-700 mt-2 space-y-1">
                        {experiences?.length > 0 ? (
                          experiences.map((item, idx) => (
                            <li key={idx}>
                              <span className="font-semibold">{item.position}</span> at{" "}
                              {item.hospital} (from {item.startingDate} to {item.endingDate})
                            </li>
                          ))
                        ) : (
                          <li>No experience listed.</li>
                        )}
                    </ul>
                  </div>

                  {/* Specialization - Purple Theme */}
                  <div className="bg-purple-50 border-l-4 border-purple-500 p-4 shadow-sm rounded-lg">
                    <h4 className="text-lg font-semibold text-purple-700 flex items-center gap-2">
                    Fellowships & Recognitions 
                    </h4>
                    
                    <ul className="list-disc pl-5 text-gray-700 mt-2">
                  {fellowships?.length > 0 ? (
                    fellowships.map((fellow, idx) => (
                      <li key={fellow._id || idx}>
                        <span className="font-medium">{fellow.title}</span> – {fellow.organization} ({fellow.year})
                      </li>
                    ))
                  ) : (
                    <li>No fellowships listed.</li>
                  )}
                </ul>
                    
                  </div>
                </div>
              )}
             {tab === "feedback" && (
              <Feedback reviews={reviews} totalRating={totalRating}/>
             )}
            </motion.div>
          </motion.div>   
          {/* Right Side: Booking Panel */}
          <div className="hidden md:block">
            <BookingPanel doctorId={doctor._id} opPrice={opPrice} timeSlots={timeSlots} />
            
          </div>  
        </div>)}
      </div>
    </section>
  );
};

export default DoctorDetails;

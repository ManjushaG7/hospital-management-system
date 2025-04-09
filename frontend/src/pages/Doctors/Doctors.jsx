import React, { useState, useEffect } from "react";
import {
  Search,
  UserCheck,
  Filter,
  Stethoscope,
  Award,
  Star,
  XCircle,
  Users,
  Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";
import DoctorCard from "../../components/Doctors/DoctorCard";
import { doctors } from "../../assets/data/doctors";
import loaderGif from "../../assets/images/Loader.gif"; // Import Loader

const Doctors = () => {
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  const specializations = [...new Set(doctors.map((doc) => doc.specialization))];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      handleSearch();
      setLoading(false);
    }, 2000); // Loader for better effect
  }, [searchTerm, specialization, experience, sortOption]);

  const handleSearch = () => {
    let filtered = doctors.filter((doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (specialization) {
      filtered = filtered.filter((doc) => doc.specialization === specialization);
    }

    if (experience) {
      filtered = filtered.filter((doc) => doc.experience >= parseInt(experience));
    }

    if (sortOption === "rating") {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "experience") {
      filtered = filtered.sort((a, b) => b.experience - a.experience);
    } else if (sortOption === "name") {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredDoctors(filtered);
  };

  return (
    <>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24 text-center">
        <motion.div
          className="container relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-5xl font-bold flex items-center justify-center gap-3">
            <UserCheck className="text-white" size={42} /> Find Your Doctor
          </h2>
          <p className="text-lg text-gray-200 mt-3 flex items-center justify-center gap-2">
            <Users size={20} /> Search, filter & book top-rated doctors near you.
          </p>

          {/* Mobile Filter Button */}
          <div className="mt-6 md:hidden">
            <button
              className="bg-white text-blue-700 px-4 py-2 rounded-md shadow-lg flex items-center gap-2 font-medium"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? <XCircle size={20} /> : <Filter size={20} />} {showFilters ? "Close Filters" : "Show Filters"}
            </button>
          </div>
        </motion.div>
      </section>

      {/* Filters Section */}
      <motion.div
        className={`container mt-8 ${showFilters ? "block" : "hidden md:flex"} flex-wrap gap-4 bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800 transition-all`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Search Box */}
        <div className="relative flex items-center w-full md:w-auto flex-1">
          <Search className="absolute left-3 text-gray-500 dark:text-white" size={20} />
          <input
            type="search"
            className="py-2 pl-10 pr-3 w-full focus:outline-none bg-transparent text-gray-700 dark:text-white border rounded-md"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Specialization Dropdown */}
        <div className="relative flex items-center w-full md:w-auto">
          <Stethoscope className="absolute left-3 text-gray-500 dark:text-white" size={20} />
          <select
            className="py-2 pl-10 pr-4 bg-transparent text-gray-700 dark:text-white border rounded-md focus:outline-none"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          >
            <option value="">All Specialties</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Filter */}
        <div className="relative flex items-center w-full md:w-24">
          <Award className="absolute left-3 text-gray-500 dark:text-white" size={20} />
          <input
            type="number"
            className="py-2 pl-10 pr-3 w-full bg-transparent text-gray-700 dark:text-white focus:outline-none border rounded-md"
            placeholder="Exp"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>

        {/* Sort By Dropdown */}
        <div className="relative flex items-center w-full md:w-auto">
          <Briefcase className="absolute left-3 text-gray-500 dark:text-white" size={20} />
          <select
            className="py-2 pl-10 pr-4 bg-transparent text-gray-700 dark:text-white border rounded-md focus:outline-none"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="rating">Highest Rating</option>
            <option value="experience">Most Experienced</option>
            <option value="name">A-Z Name</option>
          </select>
        </div>
      </motion.div>

      {/* Doctor Cards Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <motion.div className="container">
          {loading ? (
            // Loader GIF while loading
            <div className="flex justify-center items-center min-h-[300px]">
              <img src={loaderGif} alt="Loading..." className="w-[250px] h-[250px] " />
            </div>
          ) : filteredDoctors.length > 0 ? (
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredDoctors.map((doctor) => (
                <motion.div
                  key={doctor.id}
                  whileHover={{
                    scale: 1.05,
                    rotateX: 5,
                    rotateY: 5,
                    boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.15)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="transform perspective-500"
                >
                  <DoctorCard doctor={doctor} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-300 mt-5">
              <span className="text-4xl mb-2">😞</span>
              No doctors found. <br /> </p>
          )}
        </motion.div>
      </section>
    </>
  );
};

export default Doctors;

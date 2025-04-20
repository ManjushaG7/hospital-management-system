import React from "react";
import { FaUserMd, FaGraduationCap, FaHospital, FaAward } from "react-icons/fa";

// You can define the formatDate function outside or import it as needed
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const DoctorAbout = ({ name, about, qualifications, experiences ,fellowships}) => {
  return (
    <div className="mt-10 space-y-6">
      {/* Header Section */}
      <div className="border-2 border-gray-300 rounded-xl p-6 shadow-md bg-white">
        <h3 className="text-[22px] leading-[32px] text-headingColor font-semibold flex items-center gap-2">
          <FaUserMd className="text-primaryColor text-[26px]" />
          About
          <span className="text-irisBlueColor font-bold text-[24px] leading-9 ml-2">
            {name}
          </span>
        </h3>

        <p className="text-textColor text-[15px] leading-6 mt-3">{about}</p>
      </div>

      {/* Education Section */}
      <div className="border-2 border-gray-300 rounded-xl p-6 shadow-md bg-white">
        <h4 className="text-[20px] font-semibold text-headingColor flex items-center gap-2">
          <FaGraduationCap className="text-primaryColor text-[22px]" />
          Education
        </h4>
        <ul className="list-disc pl-6 text-textColor text-[15px] leading-6 mt-2 space-y-1">
          {qualifications?.map((item, index) => (
            <li key={index} className="flex flex-col gap-1">
              {/* Qualification Degree with Institution */}
              <div className="font-semibold">{item.degree} – {item.university}</div>

              {/* Date Range */}
              <div className="text-sm text-textColor">
                {formatDate(item.startingDate)} - {formatDate(item.endingDate)}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Fellowships Section */}
      <div className="border-2 border-gray-300 rounded-xl p-6 shadow-md bg-white">
        <h4 className="text-[20px] font-semibold text-headingColor flex items-center gap-2">
          <FaAward className="text-primaryColor text-[22px]" />
          Fellowships & Recognitions
        </h4>
        <ul className="list-disc pl-6 text-textColor text-[15px] leading-6 mt-2 space-y-1">
          {fellowships?.map((item, index) => (
            <li key={index} className="flex flex-col gap-1">
              {/* Fellowship Name with Institution */}
              <div className="font-semibold">{item.title} - {item.organization} - {item.year}</div>

             
            </li>
          ))}
        </ul>
      </div>

      {/* Work Experience Section */}
      <div className="border-2 border-gray-300 rounded-xl p-6 shadow-md bg-white">
        <h4 className="text-[20px] font-semibold text-headingColor flex items-center gap-2">
          <FaHospital className="text-primaryColor text-[22px]" />
          Work Experience
        </h4>
        <ul className="list-disc pl-6 text-textColor text-[15px] leading-6 mt-2 space-y-1">
          {experiences?.map((item, index) => (
            <li key={index} className="flex flex-col gap-1">
              {/* Job Role with Institution */}
              <div className="font-semibold">{item.position} – {item.hospital}</div>

              {/* Date Range */}
              <div className="text-sm text-textColor">
                {formatDate(item.startingDate)} - {formatDate(item.endingDate)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorAbout;

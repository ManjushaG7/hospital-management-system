import React from "react";
import { FaUserMd, FaGraduationCap, FaHospital, FaAward } from "react-icons/fa";

const DoctorAbout = ({name, about, qualifications, experiences}) => {
  return (
    <div className="mt-5">
      {/* Header */}
      <h3 className="text-[22px] leading-[32px] text-headingColor font-semibold flex items-center gap-2">
        <FaUserMd className="text-primaryColor text-[26px]" />
        About
        <span className="text-irisBlueColor font-bold text-[24px] leading-9">
          Ravender Babu
        </span>
      </h3>

      {/* Description */}
      <p className="text-textColor text-[15px] leading-6 mt-3">
        Dr. Ravinder Babu is a **senior consultant cardiologist** at Apollo Hospitals, Hyderabad. With over **15 years of experience**, he specializes in **interventional cardiology** and has performed numerous life-saving procedures.
      </p>

      {/* Education & Certifications */}
      <div className="mt-6">
        <h4 className="text-[20px] font-semibold text-headingColor flex items-center gap-2">
          <FaGraduationCap className="text-primaryColor text-[22px]" />
          Education & Certifications
        </h4>
        <ul className="list-disc pl-6 text-textColor text-[15px] leading-6 mt-2">
          <li>MBBS – Osmania Medical College, Hyderabad</li>
          <li>MD (General Medicine) – Osmania Medical College</li>
          <li>DM (Cardiology) – Nizam’s Institute of Medical Sciences</li>
          <li>MRCP – Royal College of Physicians, London</li>
        </ul>
      </div>

      {/* Fellowships & Memberships */}
      <div className="mt-6">
        <h4 className="text-[20px] font-semibold text-headingColor flex items-center gap-2">
          <FaAward className="text-primaryColor text-[22px]" />
          Fellowships & Recognitions
        </h4>
        <ul className="list-disc pl-6 text-textColor text-[15px] leading-6 mt-2">
          <li>FACC – American College of Cardiology</li>
          <li>FESC – European Society of Cardiology</li>
          <li>FSCAI – Society for Cardiovascular Angiography & Interventions</li>
          <li>FAPSIC – Asia-Pacific Society of Interventional Cardiology</li>
          <li>FISE – Indian Society of Electrocardiology</li>
          <li>FICC – Indian College of Cardiology</li>
        </ul>
      </div>

      {/* Work Experience */}
      <div className="mt-6">
        <h4 className="text-[20px] font-semibold text-headingColor flex items-center gap-2">
          <FaHospital className="text-primaryColor text-[22px]" />
          Work Experience
        </h4>
        <p className="text-textColor text-[15px] leading-6 mt-2">
          Currently working as a **Senior Consultant Cardiologist** at **Apollo Hospitals, Jubilee Hills, Hyderabad**. He is known for his expertise in **complex cardiac interventions and patient-centric care**.
        </p>
      </div>
    </div>
  );
};

export default DoctorAbout;

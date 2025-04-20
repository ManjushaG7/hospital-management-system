import React from 'react';
import starIcon from '../../assets/images/Star.png';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';


const DoctorCard = ({ doctor }) => {

const{
  name,
  averageRating,
  totalRating,
  photo,
  specialization,
  experiences
} = doctor;




  return (
    <div className="p-5 bg-white shadow-md hover:shadow-xl hover:scale-105 transition-all duration-500 ease-in-out rounded-xl border border-gray-200">
      {/* Doctor Image */}
      <img src={photo} className="w-full rounded-t-lg" alt={doctor.name} />

      {/* Doctor Name */}
      <h2 className="text-xl font-bold mt-4 text-gray-800">{name}</h2>

      {/* Specialization & Rating */}
      <div className="mt-2 flex items-center justify-between">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-semibold shadow-md">
          {specialization}
        </span>
        <div className="flex items-center gap-2">
          <img src={starIcon} className="w-5" alt="star" />
          <span className="font-semibold text-gray-700">
            {averageRating} <span className="text-gray-500 text-sm">({totalRating})</span>
          </span>
        </div>
      </div>

      {/* Patients & Hospital Info */}
      <div className="mt-4 flex items-center justify-between">
        <div>
          {/*<h3 className="text-lg font-semibold text-gray-800">
            +{doctor.totalPatients} Patients
          </h3>*/}
          <p className="text-gray-500 text-sm">At {experiences && experiences[0]?.hospital}</p>
        </div>

        {/* Navigation Button */}
        <Link
          to={`/doctors/${doctor._id}`}
          className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center shadow-md hover:bg-blue-600 hover:text-white transition-all duration-300"
        >
          <BsArrowRight className="text-xl" />
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;

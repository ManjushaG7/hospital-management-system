import { useState } from 'react';
import {AiOutlineDelete, AiOutlinePlus} from 'react-icons/ai'

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    gender: '',
    specialization: '',
    opPrice: 0,
    qualifications:[{startingDate:'', endingDate:'',degree:'', university:''}],
    experiences:[{startingDate:'', endingDate:'',position:'', hospital:''}],
    timeSlots:[{day:'', startingTime:'', endingTime:'',}],
    about:''

  });

  const handleInputChange = (e) => {
    setFormData({ ...formData,[e.target.name]:e.target.value});
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-8 border-b pb-2">
        Profile Information
      </h2>

      <form className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-600 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed text-gray-500"
            readOnly
            aria-readonly
            disabled="true"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-600 mb-1">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter phone number"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Bio */}
        <div className="mb-5">
          <label htmlFor="bio" className="block text-sm font-semibold text-gray-700 mb-1">
            Bio <span className="text-red-500">*</span>
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Write a short professional bio (max 100 characters)"
            maxLength={100}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <p className="text-xs text-gray-400 mt-1 text-right">
            {formData.bio.length}/100 characters
          </p>
        </div>

        {/* Gender, Specialization, OP Price - Side by Side */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-semibold text-gray-600 mb-1">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Specialization */}
          <div>
            <label htmlFor="specialization" className="block text-sm font-semibold text-gray-600 mb-1">
              Specialization
            </label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="">Select</option>
              <option value="cardiology">Cardiology</option>
              <option value="orthopedics">Orthopedics</option>
              <option value="pediatrics">Pediatrics</option>
              <option value="oncology">Oncology</option>
              <option value="psychiatry">Psychiatry</option>
              <option value="radiology">Radiology</option>
              <option value="gynecology">Gynecology</option>
              <option value="dermatology">Dermatology</option>
              <option value="endocrinology">Endocrinology</option>
              <option value="gastroenterology">Gastroenterology</option>
              <option value="nephrology">Nephrology</option>
              <option value="ophthalmology">Ophthalmology</option>
              <option value="pulmonology">Pulmonology</option>
              <option value="ent">ENT (Ear, Nose, Throat)</option>
              <option value="urology">Urology</option>
              <option value="anesthesiology">Anesthesiology</option>
            </select>
          </div>

          {/* OP Price */}
          <div>
            <label htmlFor="opPrice" className="block text-sm font-semibold text-gray-600 mb-1">
              OP Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="opPrice"
              id="opPrice"
              value={formData.opPrice}
              onChange={handleInputChange}
              placeholder="Enter OP Price"
              className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
        </div>
       {/* Qualifications */}
     <div className="mb-8">
  <p className="form__label text-lg font-semibold mb-4">Qualifications<span className="text-red-500">*</span></p>

  {formData.qualifications?.map((item, index) => (
    <div
      key={index}
      className="mb-6 p-5 border border-gray-300 rounded-xl shadow-sm bg-gray-50 transition-all duration-200"
    >
      {/* Row 1: Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
        <div>
          <label className="form__label block mb-1 text-sm font-medium text-gray-700">Starting Date*</label>
          <input
            type="date"
            name="startingDate"
            value={item.startingDate}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        <div>
          <label className="form__label block mb-1 text-sm font-medium text-gray-700">Ending Date*</label>
          <input
            type="date"
            name="endingDate"
            value={item.endingDate}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
      </div>

      {/* Row 2: Degree & University */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="form__label block mb-1 text-sm font-medium text-gray-700">Degree*</label>
          <input
            type="text"
            name="degree"
            value={item.degree}
            placeholder="e.g. MBBS, MD"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="form__label block mb-1 text-sm font-medium text-gray-700">University*</label>
          <input
            type="text"
            name="university"
            value={item.university}
            placeholder="e.g. Harvard Medical School"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button  className="p-3 rounded-full bg-red-300 text-red-600 hover:bg-red-500 hover:text-white transition duration-300 shadow-sm">
          <AiOutlineDelete size={20}/></button>
      </div>
    </div>
  ))}

    <button className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition duration-300"
    >Add Qualification</button>


     </div>
     
     <div className="mb-8">
  <p className="form__label text-lg font-semibold mb-4">Experiences<span className="text-red-500">*</span></p>

  {formData.experiences?.map((item, index) => (
    <div
      key={index}
      className="mb-6 p-5 border border-gray-300 rounded-xl shadow-sm bg-gray-50 transition-all duration-200"
    >
      {/* Row 1: Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
        <div>
          <label className="form__label block mb-1 text-sm font-medium text-gray-700">Starting Date*</label>
          <input
            type="date"
            name="startingDate"
            value={item.startingDate}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        <div>
          <label className="form__label block mb-1 text-sm font-medium text-gray-700">Ending Date*</label>
          <input
            type="date"
            name="endingDate"
            value={item.endingDate}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
      </div>

      {/* Row 2: Degree & University */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="form__label block mb-1 text-sm font-medium text-gray-700">Position*</label>
          <input
            type="text"
            name="position"
            value={item.position}
            placeholder="e.g. MBBS, MD"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="form__label block mb-1 text-sm font-medium text-gray-700">Hospital*</label>
          <input
            type="text"
            name="hospital"
            value={item.hospital}
            placeholder="e.g. Harvard Medical School"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="p-3 rounded-full bg-red-300 text-red-600 hover:bg-red-500 hover:text-white transition duration-300 shadow-sm">
          <AiOutlineDelete/></button>
      </div>
    </div>
  ))}

    <button className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition duration-300"
    >Add Experience</button>


     </div>
     
     <div className="mb-8">
  <p className="form__label text-lg font-semibold mb-4">Time Slots<span className="text-red-500">*</span></p>

  {formData.timeSlots?.map((item, index) => (
    <div
      key={index}
      className="mb-6 p-5 border border-gray-300 rounded-xl shadow-sm bg-gray-50 transition-all duration-200"
    >
      {/* Row 1: Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-6 p-5 border border-gray-200 rounded-xl shadow-sm bg-gray-50">

  {/* Day Selector */}
  <div>
    <label className="form__label block mb-1 text-sm font-medium text-gray-700">Day*</label>
    <select
      name="day"
      value={item.day}
      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    >
      <option value="">Select</option>
      <option value="monday">Monday</option>
      <option value="tuesday">Tuesday</option>
      <option value="wednesday">Wednesday</option>
      <option value="thursday">Thursday</option>
      <option value="friday">Friday</option>
      <option value="saturday">Saturday</option>
      <option value="sunday">Sunday</option>
    </select>
  </div>

  {/* Starting Time */}
  <div>
    <label className="form__label block mb-1 text-sm font-medium text-gray-700">Starting Time*</label>
    <input
      type="time"
      name="startingTime"
      value={item.startingTime}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    />
  </div>

  {/* Ending Time */}
  <div>
    <label className="form__label block mb-1 text-sm font-medium text-gray-700">Ending Time*</label>
    <input
      type="time"
      name="endingTime"
      value={item.endingTime}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    />
  </div>

  {/* Delete Button */}
  <div className="flex items-end justify-start sm:justify-end">
    <button
      type="button"
      onClick={() => handleDelete(index)} // Make sure you handle this function
      className="p-3 rounded-full bg-red-300 text-red-600 hover:bg-red-500 hover:text-white transition duration-300 shadow-sm"
      title="Delete Slot"
    >
      <AiOutlineDelete className="text-xl" />
    </button>
  </div>

</div>

      
    </div>
  ))}

    <button className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition duration-300"
    >Add Time Slot</button>


     </div>

     <div className="mb-6">
  <label className="form__label block text-sm font-semibold text-gray-700 mb-2">
    About <span className="text-red-500">*</span>
  </label>
  <textarea
    name="about"
    rows={5}
    value={formData.about}
    onChange={handleInputChange}
    placeholder="Write something about yourself..."
    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm resize-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition duration-200"
  ></textarea>
  <p className="text-xs text-gray-400 mt-1 text-right">
    {formData.about?.length || 0}/500 characters
  </p>
    </div>
      </form>
    </div>
  );
};

export default Profile;

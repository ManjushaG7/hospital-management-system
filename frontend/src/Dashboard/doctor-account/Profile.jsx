import { useEffect, useState } from 'react';
import {AiOutlineDelete, AiOutlinePlus} from 'react-icons/ai'
import uploadImageToCloudinary from '../../utils/uploadCloudinary';
import { BASE_URL , token} from '../../config';
import { toast } from 'react-toastify';

const Profile = ({doctorData}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password:'',
    phone: '',
    bio: '',
    gender: '',
    specialization: '',
    opPrice: 0,
    qualifications:[],
    experiences:[],
    fellowships: [],
    timeSlots:[],
    about:'',
    photo:null

  });
  
  useEffect(()=>{
    setFormData({
      name: doctorData?.name || '',
      email: doctorData?.email || '',
    
      phone: doctorData?.phone || '',
      bio: doctorData?.bio || '',
      gender: doctorData?.gender || '',
      specialization: doctorData?.specialization || '',
      opPrice: doctorData?.opPrice || 0,
      qualifications: doctorData?.qualifications || [],
      experiences: doctorData?.experiences || [],
      fellowships: doctorData?.fellowships || [],
      timeSlots: doctorData?.timeSlots || [],
      about: doctorData?.about || '',
      photo: doctorData?.photo || null

    })
  },[doctorData])



  const handleInputChange = (e) => {
    setFormData({ ...formData,[e.target.name]:e.target.value});
  };

  const handleFileInputChange = async event=>{
    const file = event.target.files[0]
    const data = await uploadImageToCloudinary(file);

   setFormData({...formData, photo: data?.url})

  }

  const updateProfileHandler = async e => {
    e.preventDefault();
    
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      toast.error("You are not authenticated. Please log in.");
      return; // Early return if no token is found
    }
  
    try {
      // Make the PUT request
      const res = await fetch(`${BASE_URL}/api/v1/doctors/${doctorData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Send the token in the header
        },
        body: JSON.stringify(formData), // Send the form data
      });
  
      const result = await res.json(); // Parse the response body
  
      // Check if response is ok, if not, throw error
      if (!res.ok) {
        throw new Error(result.message || "An error occurred while updating the profile.");
      }
  
      // Show success toast if everything is okay
      toast.success(result.message || "Profile updated successfully!");
  
    } catch (err) {
      // Handle any error that occurs during the fetch
      toast.error(err.message || "Something went wrong!");
    }
  };

const addItem= (key, item)=>{
  setFormData(prevFormData=> ({...prevFormData, [key]:[...prevFormData[key], item]}))
}

const handleReusableInputChangeFunc = (key, index, event)=>{
   const {name, value} = event.target 

   setFormData(prevFormData => {
    const updateItems = [...prevFormData[key]]

    updateItems[index][name] = value

    return{
      ...prevFormData,
      [key]:updateItems,
    }
   })

}

const deleteItem = (key, index)=>{
  setFormData(prevFormData=> ({...prevFormData, [key]:prevFormData[key].filter((_,i)=>i !== index )
  }))
}

  const addQualification = e =>{
    e.preventDefault()

    addItem('qualifications',{
      startingDate:'', endingDate:'',degree:'', university:''
    })
  }

  const handleQualificationChange = (event,index)=>{

    handleReusableInputChangeFunc('qualifications', index, event)
  }

  const deleteQualification = (e, index)=>{
    e.preventDefault()
    deleteItem('qualifications', index)
  }


  const addExperience = e =>{
    e.preventDefault()

    addItem('experiences',{startingDate:'', endingDate:'',position:'', hospital:''})
  }

  const handleExperienceChange = (event,index)=>{

    handleReusableInputChangeFunc('experiences', index, event)
  }

  const deleteExperience = (e, index)=>{
    e.preventDefault()
    deleteItem('experiences', index)
  }


  const addTimeSlot = e =>{
    e.preventDefault()

    addItem('timeSlots',{day:'', startingTime:'', endingTime:'',})
  }

  const handleTimeSlotChange = (event,index)=>{

    handleReusableInputChangeFunc('timeSlots', index, event)
  }

  const deleteTimeSlot = (e, index)=>{
    e.preventDefault()
    deleteItem('timeSlots', index)
  }

  const addFellowship = e => {
    e.preventDefault();
    addItem('fellowships', {
      title: '',
      organization: '',
      year: ''
    });
  };
  
  const handleFellowshipChange = (event, index) => {
    handleReusableInputChangeFunc('fellowships', index, event);
  };
  
  const deleteFellowship = (e, index) => {
    e.preventDefault();
    deleteItem('fellowships', index);
  };

  console.log(doctorData.fellowships);
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
            disabled={true}
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
            onChange={e=>handleQualificationChange(e, index)}
          />
        </div>

        <div>
          <label className="form__label block mb-1 text-sm font-medium text-gray-700">Ending Date*</label>
          <input
            type="date"
            name="endingDate"
            value={item.endingDate}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            onChange={e=>handleQualificationChange(e, index)}
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
            onChange={e=>handleQualificationChange(e, index)}
            />
        </div>

        <div>
          <label className="form__label block mb-1 text-sm font-medium text-gray-700">University*</label>
          <input
            type="text"
            name="university"
            value={item.university}
            placeholder="Enter Your University Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e=>handleQualificationChange(e, index)}
          />
        </div>

        <button onClick={e=>deleteQualification(e,index)} className="p-3 rounded-full bg-red-300 text-red-600 hover:bg-red-500 hover:text-white transition duration-300 shadow-sm">
          <AiOutlineDelete size={20}/></button>
      </div>
    </div>
  ))}

    <button onClick={addQualification} className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition duration-300"
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
            onChange={e=>handleExperienceChange(e, index)}
          />
        </div>

        <div>
          <label className="form__label block mb-1 text-sm font-medium text-gray-700">Ending Date*</label>
          <input
            type="date"
            name="endingDate"
            value={item.endingDate}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            onChange={e=>handleExperienceChange(e, index)}
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
            placeholder="Position"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e=>handleExperienceChange(e, index)}
          />
        </div>

        <div>
          <label className="form__label block mb-1 text-sm font-medium text-gray-700">Hospital*</label>
          <input
            type="text"
            name="hospital"
            value={item.hospital}
            placeholder="Hospital Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e=>handleExperienceChange(e, index)}
          />
        </div>

        <button onClick={e=>deleteExperience(e,index)} className="p-3 rounded-full bg-red-300 text-red-600 hover:bg-red-500 hover:text-white transition duration-300 shadow-sm">
          <AiOutlineDelete/></button>
      </div>
    </div>
  ))}

    <button onClick={addExperience} className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition duration-300"
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
      onChange={e=>handleTimeSlotChange(e, index)}
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
      onChange={e=>handleTimeSlotChange(e, index)}
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
      onChange={e=>handleTimeSlotChange(e, index)}
    />
  </div>

  {/* Delete Button */}
  <div className="flex items-end justify-start sm:justify-end">
    <button
      type="button"
      onClick={e=>deleteTimeSlot(e,index)} // Make sure you handle this function
      className="p-3 rounded-full bg-red-300 text-red-600 hover:bg-red-500 hover:text-white transition duration-300 shadow-sm"
      title="Delete Slot"
    >
      <AiOutlineDelete className="text-xl" />
    </button>
  </div>

</div>

      
    </div>
  ))}

    <button onClick={addTimeSlot} className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition duration-300"
    >Add Time Slot</button>


     </div>


     <div className="mb-8">
  <p className="form__label text-lg font-semibold mb-4">
    Fellowships & Recognitions <span className="text-red-500">*</span>
  </p>

  {formData.fellowships?.map((item, index) => (
    <div
      key={index}
      className="mb-6 p-5 border border-gray-300 rounded-xl shadow-sm bg-gray-50"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Title*</label>
          <input
            type="text"
            name="title"
            value={item.title}
            onChange={(e) => handleFellowshipChange(e, index)}
            placeholder="Name of Title"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Organization*</label>
          <input
            type="text"
            name="organization"
            value={item.organization}
            onChange={(e) => handleFellowshipChange(e, index)}
            placeholder="Your Organization Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Year*</label>
          <input
            type="number"
            name="year"
            value={item.year}
            onChange={(e) => handleFellowshipChange(e, index)}
            placeholder="Year"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={(e) => deleteFellowship(e, index)}
          className="p-3 rounded-full bg-red-300 text-red-600 hover:bg-red-500 hover:text-white transition duration-300"
        >
          <AiOutlineDelete />
        </button>
      </div>
    </div>
  ))}

  <button
    onClick={addFellowship}
    className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition duration-300"
  >
    <AiOutlinePlus /> Add Fellowship
  </button>
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

    <div className='mb-5 flex items-center gap-3'>
    {formData.photo && (
                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#6366f1]">
                  <img src={formData.photo} alt="preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="relative w-full">
                <input
                  type="file"
                  id="customFile"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileInputChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <label
                  htmlFor="customFile"
                  className="inline-block w-full text-center px-4 py-2 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold rounded-lg cursor-pointer transition hover:scale-105 shadow-md"
                >
                  📷 Upload Photo
                </label>
              </div>
    </div>

    <div className="flex justify-center items-center">
  <button type="submit" onClick={updateProfileHandler} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-md font-medium transition-all duration-200 transform hover:scale-105">
    Update Profile
  </button>
</div>

      </form>
    </div>
  );
};

export default Profile;

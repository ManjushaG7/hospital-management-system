// doctorService.js
import axios from 'axios';

const getDoctorProfile = async (doctorId) => {
  try {
    const response = await axios.get(`/api/v1/doctors/${doctorId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching doctor profile:', error);
    throw error;
  }
};

const updateAvailability = async (doctorId, isAvailable) => {
  try {
    const response = await axios.put(`/api/v1/doctors/${doctorId}/availability`, {
      isAvailable,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating availability:', error);
    throw error;
  }
};

export { updateAvailability, getDoctorProfile };

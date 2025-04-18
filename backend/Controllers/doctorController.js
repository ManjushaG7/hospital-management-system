import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";


export const updateDoctor = async (req, res) => {
    const id = req.params.id;
    
    try {
        // Destructure req.body to ensure photo and other fields are included
        const { name, email, phone, photo, specialization, qualifications, experiences, bio, about, ticketPrice, role } = req.body;
        
        // Update the doctor's profile
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            id,
            { 
                $set: {
                    name, 
                    email, 
                    phone, 
                    photo,  // Ensure the photo URL is updated
                    specialization, 
                    qualifications, 
                    experiences, 
                    bio, 
                    about, 
                    ticketPrice, 
                    role 
                }
            },
            { new: true }  // This returns the updated document
        );

        // If no doctor is found with the given id, return an error
        if (!updatedDoctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        // Respond with the updated doctor data
        res.status(200).json({
            success: true,
            message: "Successfully updated doctor profile",
            data: updatedDoctor,
        });
        
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to update doctor profile" });
    }
};

export const deleteDoctor = async(req, res)=> {
    const id = req.params.id
    
    try {

       await Doctor.findByIdAndDelete (id, 

       );

     res.status(200).json({success: true, message: 'Successfully Deleted', })

    } catch (err) {
        res.status(500).json({success: false, message: "Failed to delete Doctor"})

    }
};

export const getSingleDoctor = async(req, res)=> {
    const id = req.params.id;
    
    try {

        const doctor = await Doctor.findById(id)
        .select("-password")
        .populate({
          path: "reviews",
          populate: {
            path: "user",
            select: "name photo"
          }
        });
     res.status(200).json({success: true, message: 'Doctor found', data: doctor})

    } catch (err) {
        res.status(404).json({success: false, message: "No Doctor found"})

    }
};

export const getAllDoctor = async(req, res)=> {
    
    
    try {

        const {query} = req.query
        let doctors;

        if(query){
            doctors = await Doctor.find({isApproved:'approved',
                $or: [
                    {name: {$regex: query, $options: 'i'}},
                    {specialization: {$regex: query, $options: 'i'}},
                    {location: {$regex: query, $options: 'i'}},
                ]
            }).select("-password");
        }else{
             doctors = await Doctor.find ({isApproved: "approved"} ).select("-password");
        }
        
         res.status(200).json({success: true, message: 'Doctors found', data: doctors})

    } catch (err) {
        res.status(404).json({success: false, message: "Not found"})

    }
};


export const getDoctorProfile = async(req, res)=> {
    const doctorId = req.userId
      
      try {
    
         const doctor = await Doctor.findById (doctorId )
    
        if(!doctor){
          return res.status(404).json({success: false, message: "Doctor Not found"})
        }
       
       const {password, ...rest} = doctor._doc
       const appointments = await Booking.find({doctor:doctorId})

    
          res.status(200).json({success: true, message: 'user found', data:{...rest,appointments}})
    
      } catch (err) {
          res.status(500).json({success: false, message: "No user found"})
    
      }
}
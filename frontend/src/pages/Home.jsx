import React from 'react';
import { motion } from 'framer-motion';  // Import Framer Motion for animations
import heroImg01 from "../assets/images/3.jpeg";
import heroImg02 from "../assets/images/2.jpeg";
import heroImg03 from "../assets/images/4.jpeg";
import featureImg from "../assets/images/feature-img.png";
import videoIcon from "../assets/images/video-icon.png";
import avatarIcon from "../assets/images/avatar-icon.png";
import faqImg from "../assets/images/faq-img.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { FaUserMd, FaLocationArrow, FaCalendarCheck } from 'react-icons/fa';
import About from '../components/About/About';
import ServiceList from '../components/Services/ServiceList';
import Doctorlist from '../components/Doctors/Doctorlist'; 
import FaqList from '../components/Faq/FaqList';
import Testimonial from '../components/Testimonial/Testimonial';


const Home = () => {
  return (
    <>
      {/* ====== hero section =======*/}
      <section className='hero_section pt-[60px] 2xl:h-[800px] bg-gradient-to-r from-blue-600 to-indigo-600'>
        <div className='container'>
          <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>
            {/*====== hero content =========*/}
            <div>
              <div className='lg:w-[570px]'>
                <motion.h1
                  className='text-[36px] leading-[56px] text-white font-[800] md:text-[60px] md:leading-[70px]'
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  We help patients live a healthy, longer life.
                </motion.h1>
                <p className='text-white mt-4'>
                  Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
                </p>
                <button className='btn bg-blue-900 text-white mt-4 hover:bg-blue-800 hover:scale-105 transition duration-300 ease-in-out'>
                  Request an Appointment
                </button>
              </div>

              {/* =========== hero counter ======== */}
              <div className='mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]'>
                <div>
                  <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-white'>30+</h2>
                  <span className='w-[100px] h-2 bg-yellow-500 rounded-full block mt-[-14px]'></span>
                  <p className='text-white'>Years of Experience</p>
                </div>
                <div>
                  <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-white'>15+</h2>
                  <span className='w-[100px] h-2 bg-purple-500 rounded-full block mt-[-14px]'></span>
                  <p className='text-white'>Clinic Locations</p>
                </div>
                <div>
                  <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-white'>100%</h2>
                  <span className='w-[100px] h-2 bg-green-500 rounded-full block mt-[-14px]'></span>
                  <p className='text-white'>Patient Satisfaction</p>
                </div>
              </div>
            </div>
            <div className='flex gap-[30px] justify-end'>
              <div>
                <img src={heroImg01} alt="" className='rounded-lg shadow-lg' loading="lazy" />
              </div>
              <div className='mt-[30px]'>
                <img src={heroImg02} alt="" className='w-full mb-[30px] rounded-lg shadow-lg' loading="lazy" />
                <img src={heroImg03} alt="" className='w-full rounded-lg shadow-lg' loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*======== hero section end ===========*/}

      <section className='bg-gray-100 py-16'>
        <div className='container'>
          <div className='lg:w-[470px] mx-auto text-center'>
            <h2 className='heading text-primaryColor'>
              Providing the best medical services
            </h2>
            <p className='text_para text-center'>
              World-class care for everyone. Our health system offers unmatched, expert health care.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
            <div className='py-[30px] px-5 bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out'>
              <div className='flex items-center justify-center'>
                <FaUserMd className='w-12 h-12 text-indigo-500' />
              </div>
              <div className='mt-[30px] text-center'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700]'>
                  Find a Doctor
                </h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4'>
                  World-class care for everyone. Our health system offers unmatched, expert health care. From the lab to the clinic.
                </p>
                <Link to='/doctors' className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none transition duration-300 ease-in-out">
                  <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>
              </div>
            </div>

            <div className='py-[30px] px-5 bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out'>
              <div className='flex items-center justify-center'>
                <FaLocationArrow className='w-12 h-12 text-purple-500' />
              </div>
              <div className='mt-[30px] text-center'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700]' >
                  Find by Location
                </h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4'>
                  World-class care for everyone. Our health system offers unmatched, expert health care. From the lab to the clinic.
                </p>
                <Link to='/locations' className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none transition duration-300 ease-in-out">
                  <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>
              </div>
            </div>

            <div className='py-[30px] px-5 bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out'>
              <div className='flex items-center justify-center'>
                <FaCalendarCheck className='w-12 h-12 text-green-500' />
              </div>
              <div className='mt-[30px] text-center'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700]'>
                  Book an Appointment
                </h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4'>
                  World-class care for everyone. Our health system offers unmatched, expert health care. From the lab to the clinic.
                </p>
                <Link to='/appointments' className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none transition duration-300 ease-in-out">
                  <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <About /> 

      {/* ====== Why Choose Medicare? Section ====== */}
      <section className='bg-gray-100 py-16'>
        <div className='container'>
          <div className='text-center'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>Why Choose MediCare?</h2>
            <p className='text-gray-600'>We've reimagined the doctor appointment experience to make it seamless, efficient, and focused on what matters most: your health.</p>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10'>
            <div className='bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out'>
              <span className='text-indigo-500 text-3xl'>📅</span>
              <h3 className='text-xl font-semibold mt-3'>Easy Scheduling</h3>
              <p className='text-gray-600 mt-2'>Book appointments with just a few clicks, 24/7.</p>
            </div>

            <div className='bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out'>
              <span className='text-blue-500 text-3xl'>⏳</span>
              <h3 className='text-xl font-semibold mt-3'>Time-Saving</h3>
              <p className='text-gray-600 mt-2'>No more waiting on hold to schedule an appointment.</p>
            </div>

            <div className='bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out'>
              <span className='text-purple-500 text-3xl'>⭐</span>
              <h3 className='text-xl font-semibold mt-3'>Top Specialists</h3>
              <p className='text-gray-600 mt-2'>Access to highly qualified healthcare professionals.</p>
            </div>

            <div className='bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out'>
              <span className='text-green-500 text-3xl'>🔒</span>
              <h3 className='text-xl font-semibold mt-3'>Secure & Private</h3>
              <p className='text-gray-600 mt-2'>Your health information is protected and confidential.</p>
            </div>
          </div>
        </div>
      </section>
      {/* ====== End Why Choose Medicare? Section ====== */}

      {/* ======== services section ===================== */}
      <section className='bg-gradient-to-r from-blue-600 to-indigo-600 py-16'>
        <div className='container'>
          <div className='xl:w-[470px] mx-auto text-center'>
            <h2 className='heading text-white'>Our Medical Services</h2>
            <p className='text_para text-center text-white'>World-class care for everyone. Our health system offers unmatched, expert health care</p>
          </div>
          <ServiceList />
        </div>
      </section>
      {/* ======== services section end===================== */}

      {/* =============== feature section ================= */}
      <section className='bg-gray-100 py-16'>
        <div className="container">
          <div className="flex items-center justify-between flex-col lg:flex-row">
            {/* ========= feature content ========= */}
            <div className='xl:w-[670px]'>
              <h2 className='heading text-primaryColor'>
                Get Virtual Treatment <br /> From Anywhere, Anytime
              </h2>

              <ul className='pl-4'>
                <li className='text_para'>
                  1. Schedule the appointment with the doctor, and get the consultation from the comfort of your home.
                </li>
                <li className='text_para'>
                  2. Search for the doctor, and book the appointment with the doctor.
                </li>
                <li className="text_para">
                  3. View our list of doctors, and choose the doctor that best fits your needs, and book the appointment, use the online scheduling tool to select the date and time that works best for you.
                </li>
              </ul>
              <Link to='/'>
                <button className='btn bg-primaryColor text-white mt-4  hover:bg-blue-900 hover:scale-105 transition duration-300 ease-in-out'>Learn More</button>
              </Link>
            </div>

            {/* =========== feature image ========= */}
            <div className='relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0'>
              <img src={featureImg} alt="" className='w-3/4 rounded-lg shadow-lg' />
              <div className='w-[150px] lg:w-[248px] bg-white absolute bottom-[50px] left-0 md:bottom-[100px] md:left-5 z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px] shadow-lg'>
                <div className="flex items-center justify-between">
                  <div className='flex items-center gap-[6px] lg:gap-3'>
                    <p className='text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-[600]'>Tue, 24</p>
                    <p className='text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-[400]'>10:00 AM</p>
                  </div>
                  <span className='w-5 h-5 lg:w-[34px] lg:h-[34px] flex items-center justify-center bg-yellow-500 rounded py-1 px-[6px] lg:py-3 lg:px-[9px]'>
                    <img src={videoIcon} alt="" />
                  </span>
                </div>

                <div className='w-[65px] lg:w-[96px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-[8px] leading-[8px] lg:text-[12px] lg:leading-4 text-irisBlueColor font-[500] mt-2 lg:mt-4 rounded-full'> Consultation</div>
                <div className='flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]'>
                  <img src={avatarIcon} alt="" />
                  <h4 className='text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700] text-headingColor'>Dr.Raghuvaran</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =============== feature section end ============== */}

      {/* ================ our great doctors ============*/}
      <section className='bg-gradient-to-r from-blue-600 to-indigo-600 py-16'>
        <div className="container">
          <div className='xl:w-[470px] mx-auto text-center'>
            <h2 className='heading text-white'>Our Great Doctors</h2>
            <p className='text_para text-center text-white'>World-class care for everyone. Our health system offers unmatched, expert health care.</p>
          </div>
          <Doctorlist />
        </div>
      </section>
      {/* ================ our great doctors end ============*/}
      
      {/* ================= faq section ===================== */}
      <section>
        <div className="container">
          <div className='flex justify-between gap-[50px] lg:gap-0'>
            <div className='w-1/2 hidden md:block'><img src={faqImg} alt='' loading="lazy" /></div>
            <div className='w-full md:w-1/2'>
            
            <FaqList/>
            
            </div>           
          </div>
        </div>
      </section>
      {/* ================= faq section end ================= */}
            
      {/* =============== testimonial section =============== */}
       <section>
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            
            <Testimonial />
          </div>
          
        </div>
       </section>
      {/* =============== testimonial section end ============== */}
      
    
    </>
  );
};

export default Home;
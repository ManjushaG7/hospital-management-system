import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

// Testimonials Data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Software Engineer 💻",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    feedback: "🔥 The consultation was seamless! Highly recommend for anyone looking for quick and efficient service.",
  },
  {
    id: 2,
    name: "Michael Smith",
    role: "Marketing Manager 📈",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    feedback: "💯 A fantastic platform with professional staff. The experience was smooth and hassle-free!",
  },
  {
    id: 3,
    name: "Emma Brown",
    role: "Freelance Designer 🎨",
    image: "https://randomuser.me/api/portraits/women/35.jpg",
    feedback: "🙌 The service exceeded my expectations! The team was super helpful and professional.",
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Entrepreneur 🚀",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    feedback: "👌 Easy-to-use platform with top-notch service. I'm extremely satisfied!",
  },
];

// Testimonials Component
const Testimonials = () => {
  return (
    <section className="w-screen h-50 flex justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="w-[90%] max-w-[1200px]">
        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-10 uppercase tracking-wide"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          What Our Clients Say 💬
        </motion.h2>

        {/* Swiper Slider */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          className="w-full"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <motion.div
                className="flex flex-col md:flex-row items-center bg-white text-gray-800 p-10 rounded-lg shadow-lg w-full max-w-4xl mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Image */}
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-blue-500 shadow-md mb-6 md:mb-0 md:mr-8"
                />

                {/* Testimonial Content */}
                <div className="text-center md:text-left">
                  <FaQuoteLeft className="text-blue-500 text-3xl inline mb-3" />
                  <p className="text-lg md:text-xl italic font-medium">{testimonial.feedback}</p>
                  <FaQuoteRight className="text-blue-500 text-3xl inline mt-3" />

                  <h4 className="text-xl font-bold mt-4">{testimonial.name}</h4>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;

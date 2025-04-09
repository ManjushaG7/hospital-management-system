import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaHeartbeat } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-600 to-indigo-600 text-white py-10 mt-10">
      <div className="max-w-[1170px] mx-auto px-5 grid md:grid-cols-3 gap-8">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaHeartbeat className="text-red-400" /> MediCare
          </h2>
          <p className="mt-3 text-gray-300">
            Your trusted partner in healthcare. We provide the best medical services with top specialists.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-gray-300">🏠 Home</a></li>
            
            <li><a href="/doctors" className="hover:text-gray-300">👨‍⚕️ Our Doctors</a></li>
            <li><a href="/about" className="hover:text-gray-300">ℹ️ About Us</a></li>
            <li><a href="/contact" className="hover:text-gray-300">📩 Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="flex items-center gap-2"><FaPhone /> +91 9942536798</p>
          <p className="flex items-center gap-2"><FaEnvelope /> support@medicare.com</p>
          <p className="flex items-center gap-2"><FaMapMarkerAlt /> GBC Road,Bapatla (Andhra Pradesh)</p>

          {/* Social Media */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-blue-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-400"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-400"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm mt-8">
        © {new Date().getFullYear()} MediCare. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

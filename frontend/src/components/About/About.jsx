import React from "react";
import aboutImg from "../../assets/images/7.jpeg";
import aboutCardImg from '../../assets/images/about-card.png';
import { Link } from "react-router-dom";

const About = () => {
    return (
        <section className="py-16 dark:bg-gray-900 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
                    
                    {/* About Image */}
                    <div className="relative w-full lg:w-1/2 xl:w-[700px]">
                        <img src={aboutImg} alt="About Us" className="rounded-lg shadow-lg w-full" />
                        <div className="absolute bottom-4 right-[-20px] md:right-[-5%] lg:right-[15%] w-[180px] md:w-[280px] animate-bounce">
                            <img src={aboutCardImg} alt="Achievement" className="rounded-lg shadow-md" />
                        </div>
                    </div>

                    {/* About Content */}
                    <div className="w-full lg:w-1/2 xl:w-[600px]">
                        <h2 className="text-4xl font-bold text-white leading-tight">
                            Proud to be one of the <span className="text-white dark:text-blue-400">nation's best</span>
                        </h2>
                        <p className="text-lg text-white dark:text-gray-300 mt-4">
                            For 30 years in a row, <span className="font-semibold">U.S. News & World Report</span> has 
                            recognized us as one of the best public hospitals in the nation.
                        </p>
                        <p className="text-lg text-white dark:text-gray-300 mt-4">
                            Our best is something we strive for every day—caring for our patients, 
                            improving lives, and setting new standards for excellence in healthcare.
                        </p>

                        {/* Learn More Button */}
                        <Link to='/'>
                            <button className="mt-6 bg-blue-600 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-md 
                            hover:bg-blue-800 transform hover:scale-105 transition-all duration-300">
                                Learn More
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;

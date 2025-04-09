import React, { useState } from "react";
import { FaPlus, FaMinus, FaQuestionCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import faqImg from "../../assets/images/faq.png";

const faqs = [
    {
        question: "How can I book an appointment?",
        answer: "You can book an appointment online through our website or call our support team for assistance.",
    },
    {
        question: "Do you accept insurance?",
        answer: "Yes, we accept most major insurance providers. Please check with our billing department for details.",
    },
    {
        question: "Are emergency services available?",
        answer: "Yes, we offer 24/7 emergency medical services to ensure you get the care you need at any time.",
    },
    {
        question: "Can I request a specific doctor?",
        answer: "Yes, you can request a specific doctor when booking an appointment, based on their availability.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-6 lg:px-12">
                
                {/* Section Title */}
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white flex justify-center items-center gap-3">
                        <FaQuestionCircle className="text-blue-600" /> Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                        Find answers to common queries about our services.
                    </p>
                </div>

                {/* FAQ Layout */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                    
                    {/* FAQ Image */}
                    <div className="w-full md:w-1/2 hidden md:block">
                        <img src={faqImg} alt="FAQ" loading="lazy" className="w-full h-auto rounded-lg shadow-md"/>
                    </div>

                    {/* FAQ List */}
                    <div className="w-full md:w-1/2">
                        {faqs.map((faq, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="mb-4 bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
                            >
                                {/* Question Section */}
                                <button 
                                    onClick={() => toggleFAQ(index)}
                                    className="flex justify-between items-center w-full text-left p-5 font-semibold text-lg 
                                    text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                                >
                                    <span>{faq.question}</span>
                                    {openIndex === index ? (
                                        <FaMinus className="text-blue-700 dark:text-blue-400" />
                                    ) : (
                                        <FaPlus className="text-blue-700 dark:text-blue-400" />
                                    )}
                                </button>

                                {/* Answer Section */}
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="p-5 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700"
                                    >
                                        {faq.answer}
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FAQ;

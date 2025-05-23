import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { motion } from 'framer-motion';

const FaqItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div 
            className='p-3 lg:p-5 rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer transition-all duration-300 hover:shadow-lg' 
            onClick={toggleAccordion}
        >
            <div className='flex items-center justify-between gap-5'>
                <h4 className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-medium'>
                    {item.question}
                </h4>
                <motion.div 
                    className='w-7 h-7 lg:w-8 lg:h-8 border border-solid border-[#141F21] rounded flex items-center justify-center' 
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
                </motion.div>
            </div>
            {isOpen && (
                <motion.div 
                    className='mt-3 text-gray-600 text-[14px] lg:text-[16px]' 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {item.answer}
                </motion.div>
            )}
            {isOpen && (
                <div className='mt-4'>
                    <p className='text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor'>{item.content}</p>
                </div>
            )}
        </div>
    );
};

export default FaqItem;
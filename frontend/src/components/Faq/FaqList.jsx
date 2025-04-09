import { faqs } from "./../../assets/data/faqs";
import FaqItem from "./FaqItem";
import { motion } from "framer-motion"; 
import { MdLiveHelp } from "react-icons/md"; // Fun question mark icon

const FaqList = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-8">
          <MdLiveHelp className="text-4xl text-indigo-500 mx-auto mb-3" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Find answers to common concerns below.
          </p>
        </div>

        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {faqs.map((item, index) => (
            <FaqItem item={item} key={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FaqList;

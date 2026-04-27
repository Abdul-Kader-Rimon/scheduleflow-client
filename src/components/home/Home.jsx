import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="pt-20">
       
      <section className="relative overflow-hidden bg-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight"
            >
              Manage Your Classes <br />
              <span className="text-[#2FA084]">With Efficiency</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto"
            >
              A simple and powerful scheduling system for teachers and students. 
              Book 15-minute slots instantly without any overlaps.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex justify-center gap-4"
            >
              <Link to="/signup">
                <button className="bg-[#2FA084] text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-[#26856c] transition-all shadow-xl shadow-[#2FA084]/30">
                  Join as Teacher
                </button>
              </Link>
              <Link to="/login">
                <button className="bg-white text-[#2FA084] border-2 border-[#2FA084] px-8 py-3 rounded-xl font-bold text-lg hover:bg-[#2FA084]/5 transition-all">
                  Book a Slot
                </button>
              </Link>
            </motion.div>
          </div>
        </div>

      
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-[#2FA084]/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#2FA084]/10 rounded-full blur-3xl"
        />
      </section>

    
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white p-6 rounded-2xl border border-dashed border-[#2FA084] text-center">
            <h3 className="text-[#2FA084] font-bold mb-2">Reviewer Access:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <p><strong>Teacher:</strong> teacher@demo.com | pass: 123456</p>
              <p><strong>Student:</strong> student@demo.com | pass: 123456</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
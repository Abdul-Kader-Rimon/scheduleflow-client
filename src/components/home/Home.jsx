import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Clock, 
  ShieldCheck, 
  Users, 
  Zap, 
  ArrowRight 
} from "lucide-react";

const Home = () => {
  return (
    <div className="pt-20 bg-white min-h-screen">
      
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#2FA084] font-semibold text-xs mb-6 border border-emerald-100"
            >
              <Zap size={14} /> <span>Smart Scheduling Platform</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight"
            >
              Manage Your Classes <br />
              <span className="text-[#2FA084]">With Efficiency</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed"
            >
              A powerful scheduling system for teachers and students. Book 15-minute 
              slots instantly with zero overlaps and real-time dashboard updates.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <Link to="/signup">
                <button className="bg-[#2FA084] text-white px-7 py-3 rounded-xl font-bold hover:bg-[#26856c] transition-all shadow-md flex items-center gap-2">
                  Join Now <ArrowRight size={18} />
                </button>
              </Link>
              <Link to="/login">
                <button className="bg-white text-gray-700 border border-gray-200 px-7 py-3 rounded-xl font-bold hover:border-[#2FA084] hover:text-[#2FA084] transition-all">
                  Book a Slot
                </button>
              </Link>
            </motion.div>
          </div>
        </div>

      
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-10"></div>
      </section>

     
      <section className="py-20 bg-gray-50/50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why ScheduleFlow?</h2>
            <p className="text-gray-500 mt-2 text-sm">Everything you need to manage your time effectively.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Clock size={24} />, 
                title: "15-Min Intervals", 
                desc: "Optimized time blocks for quick consultations and classes." 
              },
              { 
                icon: <ShieldCheck size={24} />, 
                title: "Conflict Free", 
                desc: "Smart system prevents any double-booking automatically." 
              },
              { 
                icon: <Users size={24} />, 
                title: "User Dashboards", 
                desc: "Separate interfaces for students and teachers for easy control." 
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md"
              >
                <div className="text-[#2FA084] mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

       
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gray-900 rounded-3xl p-8 md:p-10 text-center relative overflow-hidden">
            <h3 className="text-white text-lg font-bold mb-8 flex items-center justify-center gap-2">
              <ShieldCheck className="text-[#2FA084]" size={20} /> Reviewer Access
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                <p className="text-[#2FA084] font-bold text-[10px] uppercase tracking-wider mb-2">Teacher</p>
                <p className="text-gray-200 text-sm">teacher@demo.com</p>
                <p className="text-gray-500 text-xs">pass: 12345</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                <p className="text-[#2FA084] font-bold text-[10px] uppercase tracking-wider mb-2">Student</p>
                <p className="text-gray-200 text-sm">student@demo.com</p>
                <p className="text-gray-500 text-xs">pass: 12345</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
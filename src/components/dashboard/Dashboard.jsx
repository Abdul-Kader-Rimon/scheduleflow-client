import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineUsers, HiOutlineCalendar, HiOutlineClock, HiOutlineTrendingUp } from "react-icons/hi";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [totalSlots, setTotalSlots] = useState(0);
  const [bookedSlots, setBookedSlots] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SITE_URL}/api/slots/teacher/${user._id}`);
        setTotalSlots(res.data.length);
         
        const booked = res.data.filter(slot => slot.status === "Booked").length;
        setBookedSlots(booked);
      } catch (err) {
        console.error("Stats fetch error:", err);
      }
    };
    fetchStats();
  }, [user._id]);

  return (
    <div className="space-y-8">
      
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden"
      >
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">
            Welcome back, <span className="text-[#2FA084]">{user?.name}!</span> 
          </h2>
          <p className="text-gray-500 mt-2 font-medium">
            Here's what's happening with your teaching schedule today.
          </p>
        </div>
        <div className="bg-[#2FA084]/10 px-6 py-3 rounded-2xl border border-[#2FA084]/20 relative z-10">
          <span className="text-[#2FA084] font-bold text-sm uppercase tracking-widest">Teacher Account</span>
        </div>
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-32 -mt-32 opacity-50" />
      </motion.div>

       
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-5"
        >
          <div className="w-16 h-16 bg-emerald-50 text-[#2FA084] rounded-2xl flex items-center justify-center">
            <HiOutlineCalendar size={32} />
          </div>
          <div>
            <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Total Slots</p>
            <h3 className="text-3xl font-black text-gray-800">{totalSlots}</h3>
          </div>
        </motion.div>

       
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-5"
        >
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
            <HiOutlineUsers size={32} />
          </div>
          <div>
            <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Booked Slots</p>
            <h3 className="text-3xl font-black text-gray-800">{bookedSlots}</h3>
          </div>
        </motion.div>

         
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-5"
        >
          <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center">
            <HiOutlineTrendingUp size={32} />
          </div>
          <div>
            <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Status</p>
            <h3 className="text-xl font-black text-emerald-500 uppercase tracking-tight">Active</h3>
          </div>
        </motion.div>
      </div>

       
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-[2rem] text-white relative overflow-hidden group">
          <div className="relative z-10">
            <h4 className="text-xl font-bold mb-2">Need more sessions?</h4>
            <p className="text-gray-400 text-sm mb-6">Create new time slots to let students reach out to you.</p>
            <Link to="/dashboard/create-slot" className="bg-[#2FA084] hover:bg-[#26856c] px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-black/20">
              + Quick Create Slot
            </Link>
          </div>
          <HiOutlineClock className="absolute bottom-[-20px] right-[-20px] text-white/5 size-40 group-hover:rotate-12 transition-transform duration-500" />
        </div>

        <div className="bg-[#2FA084] p-8 rounded-[2rem] text-white">
          <h4 className="text-xl font-bold mb-2">Platform Tip</h4>
          <p className="text-emerald-100 text-sm leading-relaxed">
            "Keeping your slots updated helps in better student engagement. Check your 'Teacher Slots' tab to manage bookings."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
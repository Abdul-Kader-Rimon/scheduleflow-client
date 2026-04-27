import { useState } from "react";
import { motion } from "framer-motion";
import { HiCalendar, HiClock, HiPlusCircle, HiArrowLeft } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateSlot = () => {
  const [newSlot, setNewSlot] = useState({ date: "", startTime: "" });
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleAddSlot = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_SITE_URL}/api/slots/create`, {
        teacherId: user._id,
        date: newSlot.date,
        startTime: newSlot.startTime,
        duration: 15,
      });
      toast.success("Slot created successfully!");
      navigate("/dashboard/teacher");
    } catch (err) {
      toast.error(err.response?.data?.message || "Overlap or invalid time!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto"
    >
      
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-[#2FA084] font-semibold mb-6 transition-colors group"
      >
        <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Slots</span>
      </button>

      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-gray-100/50 border border-gray-100 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 z-0" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-emerald-50 text-[#2FA084] rounded-2xl flex items-center justify-center">
              <HiPlusCircle size={30} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-800 tracking-tight">Create New Slot</h3>
              <p className="text-sm text-gray-400 font-medium">Set your availability for 15-min sessions</p>
            </div>
          </div>

          <form onSubmit={handleAddSlot} className="space-y-6">
           
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Select Date</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#2FA084] transition-colors">
                  <HiCalendar size={20} />
                </div>
                <input 
                  type="date" 
                  value={newSlot.date} 
                  className="w-full bg-gray-50 border border-gray-100 pl-11 pr-4 py-4 rounded-2xl outline-none focus:bg-white focus:border-[#2FA084] focus:ring-4 focus:ring-[#2FA084]/5 transition-all font-medium text-gray-700" 
                  onChange={(e) => setNewSlot({...newSlot, date: e.target.value})} 
                  required 
                />
              </div>
            </div>

            
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Start Time</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#2FA084] transition-colors">
                  <HiClock size={20} />
                </div>
                <input 
                  type="time" 
                  value={newSlot.startTime} 
                  className="w-full bg-gray-50 border border-gray-100 pl-11 pr-4 py-4 rounded-2xl outline-none focus:bg-white focus:border-[#2FA084] focus:ring-4 focus:ring-[#2FA084]/5 transition-all font-medium text-gray-700" 
                  onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})} 
                  required 
                />
              </div>
            </div>

            
            <div className="bg-orange-50/50 border border-orange-100 p-4 rounded-2xl">
              <p className="text-[11px] text-orange-600 font-bold leading-relaxed">
                Note: Each slot will automatically be set for a 15-minute duration. Ensure you don't have overlapping schedules.
              </p>
            </div>

            
            <button 
              disabled={loading} 
              className="w-full bg-[#2FA084] text-white py-4 rounded-[1.25rem] font-black uppercase tracking-widest hover:bg-[#26856c] hover:shadow-lg hover:shadow-[#2FA084]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Generate Slot</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default CreateSlot;
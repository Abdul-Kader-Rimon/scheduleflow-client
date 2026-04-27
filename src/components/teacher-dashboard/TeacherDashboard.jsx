import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const TeacherDashboard = () => {
  const [slots, setSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({ date: "", startTime: "" });
  const user = JSON.parse(localStorage.getItem("user"));

 
  const fetchSlots = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SITE_URL}/api/slots/teacher/${user._id}`);
      setSlots(res.data);
    } catch (err) {
      console.error("Failed to fetch slots");
    }
  };

  useEffect(() => { fetchSlots(); }, []);

  const handleAddSlot = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post(`${import.meta.env.VITE_SITE_URL}/api/slots/create`, {
        ...newSlot,
        teacherId: user._id,
        duration: 15  
      });
      toast.success("Slot created successfully!");
      fetchSlots();
    } catch (err) {
      toast.error(err.response?.data?.message || "Slot overlap or invalid time!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
         
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#2FA084]">
            <p className="text-gray-500 text-sm">Welcome,</p>
            <h3 className="text-xl font-bold text-gray-800">{user?.name}</h3>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#2FA084]">
            <p className="text-gray-500 text-sm">Total Slots</p>
            <h3 className="text-2xl font-bold text-[#2FA084]">{slots.length}</h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
          <div className="bg-white p-6 rounded-2xl shadow-sm h-fit">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Create New Slot</h3>
            <form onSubmit={handleAddSlot} className="space-y-4">
              <input 
                type="date" 
                className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#2FA084]"
                onChange={(e) => setNewSlot({...newSlot, date: e.target.value})}
                required 
              />
              <input 
                type="time" 
                className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#2FA084]"
                onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
                required 
              />
              <button className="w-full bg-[#2FA084] text-white py-3 rounded-xl font-bold hover:bg-[#26856c] transition-all">
                Add 15 Min Slot
              </button>
            </form>
          </div>

          
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Your Schedule</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatePresence>
                {slots.map((slot) => (
                  <motion.div
                    key={slot._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold text-gray-700">{slot.startTime}</p>
                      <p className="text-xs text-gray-400">{slot.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${slot.status === 'Booked' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-[#2FA084]'}`}>
                      {slot.status}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
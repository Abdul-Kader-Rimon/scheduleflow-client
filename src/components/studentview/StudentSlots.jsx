import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiViewGrid, HiMenu, HiCalendar, HiClock, HiCheckCircle, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";

const StudentSlots = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [viewType, setViewType] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const slotsPerPage = 6;

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SITE_URL}/api/slots/available`);
        setAvailableSlots(res.data);
      } catch (err) {
        console.error("Failed to fetch slots", err);
      }
    };
    fetchAvailableSlots();
  }, []);

  const handleBooking = async (slotId) => {
  try {
     
    if (!user) {
      toast.error("Please login first!");
      return;
    }

    await axios.post(`${import.meta.env.VITE_SITE_URL}/api/slots/book`, {
      slotId,
      studentId: user._id,
      studentName: user.name, 
    });

    toast.success(`Session booked for ${user.name}!`);
    
   
    setAvailableSlots(availableSlots.filter(slot => slot._id !== slotId));
  } catch (err) {
    toast.error(err.response?.data?.message || "Booking failed!");
  }
};

   
  const indexOfLastSlot = currentPage * slotsPerPage;
  const indexOfFirstSlot = indexOfLastSlot - slotsPerPage;
  const currentSlots = availableSlots.slice(indexOfFirstSlot, indexOfLastSlot);
  const totalPages = Math.ceil(availableSlots.length / slotsPerPage);

  return (
    <div className="space-y-8 pb-10">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
        <div>
          <h3 className="text-2xl font-black text-gray-800 tracking-tight">Available Sessions</h3>
          <p className="text-gray-500 text-sm font-medium">Choose a time slot to book your 1:1 session.</p>
        </div>
        
        <div className="flex items-center bg-gray-100/80 p-1.5 rounded-2xl border border-gray-200">
          <button 
            onClick={() => setViewType("grid")}
            className={`px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 ${viewType === "grid" ? "bg-white text-[#2FA084] shadow-md" : "text-gray-500"}`}
          >
            <HiViewGrid size={20} />
            <span className="text-sm font-bold">Grid</span>
          </button>
          <button 
            onClick={() => setViewType("table")}
            className={`px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 ${viewType === "table" ? "bg-white text-[#2FA084] shadow-md" : "text-gray-500"}`}
          >
            <HiMenu size={20} />
            <span className="text-sm font-bold">Table</span>
          </button>
        </div>
      </div>

      
      <motion.div layout transition={{ duration: 0.4 }}>
        <AnimatePresence mode="wait">
          {viewType === "grid" ? (
            
            <motion.div 
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentSlots.map((slot) => (
                <div key={slot._id} className="bg-white rounded-[2.5rem] p-7 border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                  <div className="flex justify-between items-center mb-6">
                    <span className="bg-emerald-50 text-[#2FA084] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-emerald-100">Available</span>
                    <div className="flex items-center text-gray-400 gap-1.5 font-bold">
                      <HiCalendar className="text-gray-300" />
                      <span className="text-[11px] uppercase">{slot.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[#2FA084] group-hover:bg-[#2FA084] group-hover:text-white transition-colors">
                      <HiClock size={28} />
                    </div>
                    <div>
                      <p className="text-3xl font-black text-gray-800 tracking-tight">{slot.startTime}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Instructor: {slot.teacherId?.name || "TBA"}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleBooking(slot._id)}
                    className="w-full bg-[#2FA084] text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#26856c] shadow-lg shadow-[#2FA084]/10 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <HiCheckCircle size={20} />
                    Book Now
                  </button>
                </div>
              ))}
            </motion.div>
          ) : (
           
            <motion.div 
              key="table"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">Schedule</th>
                      <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">Instructor</th>
                      <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {currentSlots.map((slot) => (
                      <tr key={slot._id} className="hover:bg-gray-50/80 transition-colors group">
                        <td className="px-8 py-6 font-black text-gray-800">
                           <div className="flex flex-col">
                             <span>{slot.date}</span>
                             <span className="text-xs text-[#2FA084] font-bold uppercase tracking-tighter">{slot.startTime} - {slot.endTime}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-sm font-bold text-gray-500 uppercase italic">
                           {slot.teacherId?.name}
                        </td>
                        <td className="px-8 py-6">
                           <span className="bg-emerald-50 text-[#2FA084] text-[10px] font-black px-4 py-1.5 rounded-xl uppercase border border-emerald-100">Open</span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button 
                            onClick={() => handleBooking(slot._id)}
                            className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#2FA084] transition-all"
                          >
                            Book
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-12 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 font-bold">
            Page <span className="text-[#2FA084]">{currentPage}</span> of {totalPages}
          </p>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-2xl border border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-[#2FA084] disabled:opacity-20 transition-all"
            >
              <HiChevronLeft size={24} />
            </button>
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-12 h-12 rounded-2xl text-sm font-black transition-all ${
                    currentPage === i + 1 ? "bg-[#2FA084] text-white shadow-lg" : "bg-gray-50 text-gray-400"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-2xl border border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-[#2FA084] disabled:opacity-20 transition-all"
            >
              <HiChevronRight size={24} />
            </button>
          </div>
        </div>
      )}

      
      {availableSlots.length === 0 && (
        <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-gray-200 mt-8">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <HiCalendar className="text-gray-300" size={40} />
          </div>
          <h4 className="text-xl font-black text-gray-800 italic">No available sessions right now!</h4>
          <p className="text-gray-400 text-sm mt-2">Check back later for new time slots from instructors.</p>
        </div>
      )}
    </div>
  );
};

export default StudentSlots;
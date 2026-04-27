import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Correct import
import { HiViewGrid, HiMenu, HiChevronLeft, HiChevronRight, HiCalendar, HiClock, HiOutlineDocumentSearch } from "react-icons/hi";
import axios from "axios";

const TeacherSlots = () => {
  const [slots, setSlots] = useState([]);
  const [viewType, setViewType] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const slotsPerPage = 6;

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SITE_URL}/api/slots/teacher/${user._id}`);
        setSlots(res.data);
      } catch (err) {
        console.error("Failed to fetch slots", err);
      }
    };
    fetchSlots();
  }, [user._id]);

  // Pagination Logic
  const indexOfLastSlot = currentPage * slotsPerPage;
  const indexOfFirstSlot = indexOfLastSlot - slotsPerPage;
  const currentSlots = slots.slice(indexOfFirstSlot, indexOfLastSlot);
  const totalPages = Math.ceil(slots.length / slotsPerPage);

  return (
    <div className="space-y-8 pb-10">
      {/* --- Header & Filter Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h3 className="text-2xl font-black text-gray-800 tracking-tight">Your Scheduled Slots</h3>
          <p className="text-gray-500 text-sm font-medium">Manage and monitor your upcoming teaching sessions.</p>
        </div>
        
        <div className="flex items-center bg-gray-100/80 p-1.5 rounded-2xl border border-gray-200">
          <button 
            onClick={() => setViewType("grid")}
            className={`px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 ${viewType === "grid" ? "bg-white text-[#2FA084] shadow-md border border-gray-100" : "text-gray-500 hover:text-gray-700"}`}
          >
            <HiViewGrid size={20} />
            <span className="text-sm font-bold">Grid</span>
          </button>
          <button 
            onClick={() => setViewType("table")}
            className={`px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 ${viewType === "table" ? "bg-white text-[#2FA084] shadow-md border border-gray-100" : "text-gray-500 hover:text-gray-700"}`}
          >
            <HiMenu size={20} />
            <span className="text-sm font-bold">Table</span>
          </button>
        </div>
      </div>

      {/* --- Content Area --- */}
      <motion.div layout transition={{ duration: 0.4, ease: "easeInOut" }}>
        <AnimatePresence mode="wait">
          {viewType === "grid" ? (
            /* --- Premium Grid View --- */
            <motion.div 
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentSlots.map((slot) => (
                <motion.div 
                  key={slot._id} 
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-[2.5rem] p-7 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-[#2FA084]/10 transition-all duration-500 relative overflow-hidden group"
                >
                  {/* Decorative Background Element */}
                  <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-5 group-hover:opacity-20 transition-all duration-500 ${slot.status === 'Booked' ? 'bg-orange-500' : 'bg-[#2FA084]'}`} />
                  
                  <div className="flex justify-between items-center mb-8 relative z-10">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-widest ${
                      slot.status === 'Booked' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-emerald-50 text-[#2FA084] border border-emerald-100'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${slot.status === 'Booked' ? 'bg-orange-500 animate-pulse' : 'bg-[#2FA084]'}`} />
                      {slot.status}
                    </div>
                    <div className="flex items-center text-gray-400 gap-1.5 font-bold">
                      <HiCalendar className="text-lg text-gray-300" />
                      <span className="text-xs uppercase tracking-tighter">{slot.date}</span>
                    </div>
                  </div>

                  <div className="space-y-1 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[#2FA084] group-hover:bg-[#2FA084] group-hover:text-white transition-colors duration-300">
                        <HiClock size={28} />
                      </div>
                      <div>
                        <p className="text-3xl font-black text-gray-800 tracking-tight">{slot.startTime}</p>
                        <p className="text-xs text-gray-400 font-bold uppercase">15 Min Duration</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-50 flex justify-between items-center relative z-10">
                    <p className="text-[10px] font-black text-gray-300 tracking-widest uppercase">End Time: {slot.endTime}</p>
                    <button className="text-xs font-black text-[#2FA084] opacity-0 group-hover:opacity-100 transition-opacity">DETAILS →</button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* --- Professional Table View --- */
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
                      <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Date & Schedule</th>
                      <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Session Type</th>
                      <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                      <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {currentSlots.map((slot) => (
                      <tr key={slot._id} className="hover:bg-gray-50/80 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-[#2FA084] group-hover:bg-emerald-50 transition-all">
                              <HiCalendar size={22} />
                            </div>
                            <div>
                              <p className="text-base font-black text-gray-800">{slot.date}</p>
                              <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">{slot.startTime} — {slot.endTime}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-[11px] font-black text-gray-500 bg-gray-100 px-4 py-1.5 rounded-full uppercase tracking-wider">1:1 Session</span>
                        </td>
                        <td className="px-8 py-6">
                          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black border uppercase tracking-widest ${
                            slot.status === 'Booked' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-emerald-50 text-[#2FA084] border-emerald-100'
                          }`}>
                            <span className={`w-2 h-2 rounded-full ${slot.status === 'Booked' ? 'bg-orange-500' : 'bg-[#2FA084]'}`} />
                            {slot.status}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <button className="h-10 w-10 flex items-center justify-center rounded-xl border border-gray-100 text-gray-400 hover:text-[#2FA084] hover:bg-emerald-50 hover:border-emerald-100 transition-all">
                            <HiOutlineDocumentSearch size={20} />
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

      {/* --- Smart Pagination --- */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-12 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 font-bold">
            Showing <span className="text-[#2FA084]">{indexOfFirstSlot + 1} - {Math.min(indexOfLastSlot, slots.length)}</span> of <span className="text-gray-900">{slots.length}</span> Slots
          </p>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-2xl border border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-[#2FA084] disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            >
              <HiChevronLeft size={24} />
            </button>
            
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-12 h-12 rounded-2xl text-sm font-black transition-all duration-300 ${
                    currentPage === i + 1 
                    ? "bg-[#2FA084] text-white shadow-xl shadow-[#2FA084]/20 scale-110" 
                    : "bg-gray-50 text-gray-400 hover:bg-white hover:border-[#2FA084] hover:text-[#2FA084] border border-transparent"
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-2xl border border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-[#2FA084] disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            >
              <HiChevronRight size={24} />
            </button>
          </div>
        </div>
      )}

      {/* --- Empty State --- */}
      {slots.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-gray-200"
        >
          <div className="w-24 h-24 bg-emerald-50 text-[#2FA084] rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
            <HiCalendar size={40} />
          </div>
          <h4 className="text-2xl font-black text-gray-800">No scheduled slots yet</h4>
          <p className="text-gray-400 mt-3 max-w-xs mx-auto text-sm font-medium">Time to open up your availability! Create your first session slot to get started.</p>
        </motion.div>
      )}
    </div>
  );
};

export default TeacherSlots;
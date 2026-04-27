import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { HiUser, HiCalendar, HiClock, HiViewGrid, HiMenu, HiChevronLeft, HiChevronRight } from "react-icons/hi";

const TeacherBookedSlots = () => {
  const [bookedSlots, setBookedSlots] = useState([]);
  const [viewType, setViewType] = useState("grid"); // Default table view
  const [currentPage, setCurrentPage] = useState(1);
  const slotsPerPage = 6;

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SITE_URL}/api/slots/teacher/${user._id}`);
        const onlyBooked = res.data.filter(slot => slot.status === "Booked");
        setBookedSlots(onlyBooked);
      } catch (err) {
        console.error("Error loading slots", err);
      }
    };
    if (user?._id) fetchBookedSlots();
  }, [user._id]);

  
  const indexOfLastSlot = currentPage * slotsPerPage;
  const indexOfFirstSlot = indexOfLastSlot - slotsPerPage;
  const currentSlots = bookedSlots.slice(indexOfFirstSlot, indexOfLastSlot);
  const totalPages = Math.ceil(bookedSlots.length / slotsPerPage);

  return (
    <div className="space-y-8 pb-10">
     
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
        <div>
          <h3 className="text-2xl font-black text-gray-800 tracking-tight">Booked Sessions</h3>
          <p className="text-gray-500 text-sm font-medium">Manage your upcoming student appointments.</p>
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
          {bookedSlots.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-gray-200"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiUser className="text-gray-300" size={40} />
              </div>
              <h4 className="text-xl font-black text-gray-800 italic">No bookings yet!</h4>
              <p className="text-gray-400 text-sm mt-2">When students book your slots, they will appear here.</p>
            </motion.div>
          ) : viewType === "grid" ? (
           
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
                    <span className="bg-emerald-50 text-[#2FA084] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-emerald-100">Confirmed</span>
                    <div className="flex items-center text-gray-400 gap-1.5 font-bold">
                      <HiCalendar className="text-gray-300" />
                      <span className="text-[11px] uppercase">{slot.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-emerald-50 text-[#2FA084] rounded-2xl flex items-center justify-center font-black text-xl">
                      {slot.bookedBy?.charAt(0) || "S"}
                    </div>
                    <div>
                      <p className="text-xl font-black text-gray-800 tracking-tight leading-tight">{slot.bookedBy}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Student</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <HiClock size={18} className="text-[#2FA084]" />
                    <span className="font-black text-sm">{slot.startTime} - {slot.endTime}</span>
                  </div>
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
                      <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                      <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">Schedule</th>
                      <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {currentSlots.map((slot) => (
                      <tr key={slot._id} className="hover:bg-gray-50/80 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-100 text-[#2FA084] rounded-xl flex items-center justify-center font-black">
                              {slot.bookedBy?.charAt(0)}
                            </div>
                            <span className="font-black text-gray-800 uppercase text-sm">{slot.bookedBy}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="font-black text-gray-700 text-sm">{slot.date}</span>
                            <span className="text-[11px] text-[#2FA084] font-bold uppercase">{slot.startTime} ({slot.duration} Min)</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <span className="bg-emerald-50 text-[#2FA084] text-[10px] font-black px-4 py-1.5 rounded-xl uppercase border border-emerald-100">Confirmed</span>
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
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-8 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 font-bold">
            Showing <span className="text-[#2FA084]">{currentSlots.length}</span> of {bookedSlots.length} Bookings
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
                  className={`w-12 h-12 rounded-2xl text-sm font-black transition-all ${currentPage === i + 1 ? "bg-[#2FA084] text-white shadow-lg" : "bg-gray-50 text-gray-400"
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
    </div>
  );
};

export default TeacherBookedSlots;
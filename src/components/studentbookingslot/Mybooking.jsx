import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineAcademicCap, HiCalendar, HiClock, HiViewGrid, HiMenu, HiChevronLeft, HiChevronRight } from "react-icons/hi";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchMyBookings = async () => {
      if (!user?._id) return;

      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_SITE_URL}/api/slots/all`);
        
        const mySessions = res.data.filter(slot => {
          const slotStudentId = slot.studentId?._id || slot.studentId;
          const loggedInUserId = user._id;

          return (
            slot.status === "Booked" && 
            String(slotStudentId) === String(loggedInUserId)
          );
        });

        setBookings(mySessions);
      } catch (err) {
        console.error("Error fetching bookings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, [user?._id]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-[#2FA084] font-bold uppercase tracking-widest animate-pulse text-xs md:text-sm">
        Loading History...
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 pb-10 px-2 md:px-0">
     
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-gray-100">
        <div>
          <h3 className="text-lg md:text-2xl font-black text-gray-800 tracking-tight uppercase leading-none">My Class History</h3>
          <p className="text-gray-400 text-[10px] md:text-sm font-bold mt-2">
            Total Booked: <span className="text-[#2FA084] bg-emerald-50 px-2 md:px-3 py-0.5 rounded-full">{bookings.length} Sessions</span>
          </p>
        </div>

        
        <div className="flex items-center w-full md:w-auto bg-gray-100/80 p-1 rounded-xl md:rounded-2xl border border-gray-200">
          <button
            onClick={() => { setViewType("grid"); setCurrentPage(1); }}
            className={`flex-1 md:flex-none px-4 md:px-5 py-2 rounded-lg md:rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${viewType === "grid" ? "bg-white text-[#2FA084] shadow-sm font-black scale-105" : "text-gray-400"}`}
          >
            <HiViewGrid size={18} />
            <span className="text-xs md:text-sm">Grid</span>
          </button>
          <button
            onClick={() => { setViewType("table"); setCurrentPage(1); }}
            className={`flex-1 md:flex-none px-4 md:px-5 py-2 rounded-lg md:rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${viewType === "table" ? "bg-white text-[#2FA084] shadow-sm font-black scale-105" : "text-gray-400"}`}
          >
            <HiMenu size={18} />
            <span className="text-xs md:text-sm">Table</span>
          </button>
        </div>
      </div>

      
      <motion.div layout transition={{ duration: 0.4 }}>
        <AnimatePresence mode="wait">
          {bookings.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-20 md:py-32 bg-white rounded-[2rem] md:rounded-[3rem] border border-dashed border-gray-200 shadow-inner px-4"
            >
              <div className="w-16 h-16 md:w-24 md:h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-200">
                <HiOutlineAcademicCap className="size-8 md:size-12" />
              </div>
              <h4 className="text-lg md:text-xl font-black text-gray-800">No History Found!</h4>
              <p className="text-gray-400 text-xs md:text-sm mt-2 max-w-xs mx-auto">You haven't booked any classes yet. Start learning by choosing a teacher.</p>
            </motion.div>
          ) : viewType === "grid" ? (
            
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            >
              {currentItems.map((slot) => (
                <div key={slot._id} className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-7 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="flex justify-between items-center mb-4 md:mb-6">
                    <span className="px-3 py-1 bg-emerald-50 text-[#2FA084] text-[9px] md:text-[10px] font-black rounded-full uppercase border border-emerald-100">CONFIRMED</span>
                    <div className="flex items-center text-gray-400 gap-1 font-bold text-[10px] md:text-[11px]">
                      <HiCalendar size={14} />
                      {slot.date}
                    </div>
                  </div>

                  <div className="space-y-1 mb-6 md:mb-8">
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Instructor</p>
                    <p className="text-base md:text-lg font-black text-gray-800 tracking-tight flex items-center gap-2">
                       <span className="w-2 h-2 bg-[#2FA084] rounded-full"></span>
                       {slot.teacherId?.name || "Private Tutor"}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 md:gap-4 bg-gray-50/80 p-3 md:p-4 rounded-2xl md:rounded-3xl border border-gray-100 group-hover:bg-[#2FA084] group-hover:border-[#2FA084] transition-all duration-300">
                    <div className="p-2 bg-white rounded-xl shadow-sm">
                      <HiClock size={18} className="text-[#2FA084]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-black text-gray-800 text-xs md:text-sm group-hover:text-white transition-colors">{slot.startTime} - {slot.endTime}</span>
                      <span className="text-[9px] text-gray-400 font-bold group-hover:text-emerald-50 uppercase">{slot.duration || "60"} Min</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
             
            <motion.div
              key="table"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="bg-white border border-gray-100 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-sm"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px] md:min-w-full">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="px-6 md:px-8 py-4 md:py-6 text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest">Instructor</th>
                      <th className="px-6 md:px-8 py-4 md:py-6 text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                      <th className="px-6 md:px-8 py-4 md:py-6 text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest">Time</th>
                      <th className="px-6 md:px-8 py-4 md:py-6 text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {currentItems.map((slot) => (
                      <tr key={slot._id} className="hover:bg-emerald-50/30 transition-colors">
                        <td className="px-6 md:px-8 py-4 md:py-6">
                          <span className="font-black text-gray-800 text-xs md:text-sm">{slot.teacherId?.name || "Private Tutor"}</span>
                        </td>
                        <td className="px-6 md:px-8 py-4 md:py-6 font-bold text-gray-600 text-xs md:text-sm italic">{slot.date}</td>
                        <td className="px-6 md:px-8 py-4 md:py-6">
                          <div className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm font-black text-[10px] md:text-xs text-[#2FA084]">
                             <HiClock /> {slot.startTime}
                          </div>
                        </td>
                        <td className="px-6 md:px-8 py-4 md:py-6 text-right">
                          <span className="bg-emerald-100/50 text-emerald-600 text-[9px] md:text-[10px] font-black px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl border border-emerald-200">PAID</span>
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
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-8 md:mt-12 bg-white p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 shadow-sm">
          <p className="text-[10px] md:text-xs text-gray-400 font-black uppercase tracking-widest">
            Page <span className="text-[#2FA084]">{currentPage}</span> of {totalPages}
          </p>
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 md:p-3 bg-gray-50 rounded-xl md:rounded-2xl text-gray-400 hover:text-[#2FA084] disabled:opacity-20 transition-all"
            >
              <HiChevronLeft size={20} />
            </button>
            <div className="flex gap-1 md:gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl text-xs md:text-sm font-black transition-all ${currentPage === i + 1 ? "bg-[#2FA084] text-white shadow-md -translate-y-0.5" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 md:p-3 bg-gray-50 rounded-xl md:rounded-2xl text-gray-400 hover:text-[#2FA084] disabled:opacity-20 transition-all"
            >
              <HiChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
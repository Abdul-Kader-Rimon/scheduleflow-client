import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const StudentDashboard = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchAvailableSlots = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SITE_URL}/api/slots/available`);
      setAvailableSlots(res.data);
    } catch (err) {
      toast.error("Failed to load slots");
    }
  };

  useEffect(() => { fetchAvailableSlots(); }, []);

  const handleBooking = async (slotId) => {
    try {
      await axios.post(`${import.meta.env.VITE_SITE_URL}/api/slots/book`, {
        slotId,
        studentId: user._id
      });
      toast.success("Slot booked successfully!");
      fetchAvailableSlots();  
    } catch (err) {
      toast.error("Booking failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Available Sessions</h2>
          <p className="text-gray-500">Choose a 15-minute slot to book your class.</p>
        </div>

        {availableSlots.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
            <p className="text-gray-400">No slots available right now. Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {availableSlots.map((slot, index) => (
              <motion.div
                key={slot._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-[#2FA084] transition-all group"
              >
                <div className="mb-4">
                  <span className="text-[#2FA084] font-bold text-xl">{slot.startTime}</span>
                  <p className="text-gray-500 text-sm">{slot.date}</p>
                </div>
                <div className="text-sm text-gray-600 mb-6 italic">
                  Teacher: {slot.teacherName}
                </div>
                <button
                  onClick={() => handleBooking(slot._id)}
                  className="w-full bg-[#2FA084]/10 text-[#2FA084] py-2 rounded-lg font-bold group-hover:bg-[#2FA084] group-hover:text-white transition-all"
                >
                  Book Now
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
import { useState, useEffect } from "react";
import { Outlet, NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt2, HiX, HiLogout } from "react-icons/hi";
import toast from "react-hot-toast";

const DashboardLayout = () => {
 
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(true);
      else setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 768) setIsOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const navItemStyles = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      isActive 
        ? "bg-[#2FA084] text-white shadow-md shadow-[#2FA084]/20" 
        : "text-gray-600 hover:bg-gray-100 hover:text-[#2FA084]"
    }`;

  return (
    <div className="min-h-screen flex bg-gray-50 overflow-hidden relative">
      
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40 md:hidden" 
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      
      <motion.aside 
        initial={false}
        animate={{ 
          width: isOpen ? "280px" : "0px",
          x: isOpen ? 0 : -280 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-50 bg-white shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="p-6 flex items-center justify-between border-b border-gray-50 min-w-[280px]">
          <Link to="/" className="text-2xl font-bold text-[#2FA084] whitespace-nowrap">
            Schedule<span className="text-gray-800">Flow</span>
          </Link>
          <button onClick={toggleSidebar} className="text-gray-500 p-2 hover:bg-gray-100 rounded-full">
             <HiX size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto min-w-[280px]">
          <NavLink to="/dashboard" end className={navItemStyles}>
             <span className="font-medium">Dashboard Overview</span>
          </NavLink>

          {role === "student" && (
            <>
              <NavLink to="/dashboard/student" className={navItemStyles}>Available Slots</NavLink>
              <NavLink to="/dashboard/my-bookings" className={navItemStyles}>My Bookings</NavLink>
            </>
          )}

          {role === "teacher" && (
            <>
              <NavLink to="/dashboard/teacher" className={navItemStyles}>My Created Slots</NavLink>
              <NavLink to="/dashboard/create-slot" className={navItemStyles}>+ Create New Slot</NavLink>
            </>
          )}
        </nav>

        <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-3 min-w-[280px]">
           <div className="flex items-center gap-3 px-2">
              <div className="w-9 h-9 rounded-full bg-[#2FA084] flex items-center justify-center text-white font-bold shadow-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-800 truncate">{user?.name}</p>
                <p className="text-[10px] text-gray-500 capitalize">{role}</p>
              </div>
           </div>
           <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors group">
             <HiLogout className="text-lg group-hover:translate-x-1 transition-transform" />
             <span>Logout</span>
           </button>
        </div>
      </motion.aside>

       
      <motion.div 
        animate={{ marginLeft: (window.innerWidth > 768 && isOpen) ? "280px" : "0px" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden"
      >
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-[#2FA084] hover:text-white transition-all shadow-sm"
            >
              <HiMenuAlt2 size={24} />
            </button>
            <h2 className="font-semibold text-gray-700">Dashboard</h2>
          </div>

          <div className="flex items-center gap-3">
             <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-[#2FA084] font-bold text-sm border border-gray-200">
                {user?.name?.charAt(0).toUpperCase()}
             </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-[#F9FAFB]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </main>
      </motion.div>
    </div>
  );
};

export default DashboardLayout;
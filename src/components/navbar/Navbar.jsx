import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { HiMenuAlt3, HiX, HiLogout, HiViewGrid, HiHome, HiUserCircle } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    setIsOpen(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/", icon: <HiHome size={20} /> },
    { 
      name: "Dashboard", 
      path: user?.role === "teacher" ? "/dashboard/teacher" : "/dashboard/student-slots",
      icon: <HiViewGrid size={20} />,
      protected: true 
    },
  ];

  return (
    <nav className="fixed w-full z-[100] top-0 bg-white/70 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
           
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-[#2FA084] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-200 group-hover:rotate-12 transition-transform">
                S
              </div>
              <span className="text-xl font-black tracking-tighter text-gray-800">
                Schedule<span className="text-[#2FA084]">Flow</span>
              </span>
            </Link>
          </motion.div>

          
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              (!link.protected || user) && (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    isActive(link.path) 
                      ? "bg-emerald-50 text-[#2FA084]" 
                      : "text-gray-500 hover:text-[#2FA084] hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}

            <div className="h-6 w-[1px] bg-gray-200 mx-2" />

            {user ? (
              <div className="flex items-center gap-4 pl-2">
                <div className="flex items-center gap-3 bg-gray-50 p-1.5 pr-4 rounded-full border border-gray-100">
                  <div className="w-8 h-8 bg-[#2FA084] text-white rounded-full flex items-center justify-center font-bold text-xs shadow-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-black text-gray-700 uppercase tracking-tight">{user.name.split(' ')[0]}</span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm shadow-red-100"
                >
                  <HiLogout size={20} />
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-gray-500 hover:text-[#2FA084] px-4 text-sm font-bold transition-colors">
                  Login
                </Link>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#2FA084] text-white px-6 py-3 rounded-2xl text-sm font-black shadow-xl shadow-emerald-200 uppercase tracking-widest"
                  >
                    Join Now
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

           
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
            </button>
          </div>
        </div>
      </div>

      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                (!link.protected || user) && (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-4 px-4 py-4 rounded-2xl text-base font-black uppercase tracking-widest transition-all ${
                      isActive(link.path) 
                        ? "bg-emerald-50 text-[#2FA084]" 
                        : "text-gray-500 active:bg-gray-50"
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                )
              ))}

              <div className="my-4 border-t border-gray-50" />

              {user ? (
                <div className="space-y-3">
                   <div className="flex items-center gap-4 px-4 py-3 bg-gray-50 rounded-2xl">
                      <HiUserCircle size={28} className="text-[#2FA084]" />
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase">Logged in as</p>
                        <p className="font-bold text-gray-800">{user.name}</p>
                      </div>
                   </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-4 py-4 text-red-500 font-black uppercase tracking-widest bg-red-50 rounded-2xl"
                  >
                    <HiLogout size={20} />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center py-4 text-gray-500 font-black uppercase tracking-widest bg-gray-50 rounded-2xl"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center py-4 bg-[#2FA084] text-white font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-emerald-100"
                  >
                    Signup
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();

  
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="fixed w-full z-50 top-0 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0 flex items-center"
          >
            <Link to="/" className="text-2xl font-bold text-[#2FA084]">
              Schedule<span className="text-gray-800">Flow</span>
            </Link>
          </motion.div>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-[#2FA084] px-3 py-2 font-medium"
            >
              Home
            </Link>

           
            {user ? (
              <>
               
                <Link
                  to={
                    user.role === "teacher"
                      ? "/dashboard/teacher"
                      : "/dashboard/student-slots"
                  }
                >
                  Dashboard
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 border border-red-100 px-5 py-2 rounded-full font-medium hover:bg-red-100 transition-all"
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-[#2FA084] px-3 py-2 font-medium"
                >
                  Login
                </Link>

                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#2FA084] text-white px-5 py-2 rounded-full font-medium shadow-lg shadow-[#2FA084]/20"
                  >
                    Register Now
                  </motion.button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

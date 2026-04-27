import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { HiUser, HiMail, HiLockClosed, HiEye, HiEyeOff, HiUserGroup, HiAcademicCap } from "react-icons/hi";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const signupPromise = axios.post(
      `${import.meta.env.VITE_SITE_URL}/api/users/register`,
      form
    );

    toast.promise(signupPromise, {
      loading: 'Creating your account...',
      success: (res) => {
        
        setTimeout(() => navigate("/login"), 1200);
        return "Account Created! Please login.";
      },
      error: (err) => {
        setLoading(false);
        return err.response?.data?.message || "Signup Failed!";
      },
    }, {
      style: {
        borderRadius: '15px',
        background: '#333',
        color: '#fff',
        fontSize: '14px',
        fontWeight: 'bold'
      },
      success: {
        duration: 4000,
        iconTheme: { primary: '#2FA084', secondary: '#fff' },
      },
    });

    try {
      await signupPromise;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-gray-100 relative overflow-hidden"
      >
        
        <div className="absolute top-0 left-0 w-full h-2 bg-[#2FA084]"></div>

        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-gray-800 tracking-tight">Join Us</h2>
          <p className="text-gray-400 font-medium mt-2">Start your learning journey today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="relative">
            <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              className="w-full bg-gray-50 border border-gray-100 pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-[#2FA084] focus:bg-white outline-none transition-all font-medium"
              name="name"
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          
          <div className="relative">
            <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              className="w-full bg-gray-50 border border-gray-100 pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-[#2FA084] focus:bg-white outline-none transition-all font-medium"
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          
          <div className="relative">
            <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              className="w-full bg-gray-50 border border-gray-100 pl-12 pr-12 py-4 rounded-2xl focus:ring-2 focus:ring-[#2FA084] focus:bg-white outline-none transition-all font-medium"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2FA084] transition-colors"
            >
              {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </button>
          </div>

          
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none">
              {form.role === 'student' ? <HiUserGroup /> : <HiAcademicCap />}
            </div>
            <select
              className="w-full bg-gray-50 border border-gray-100 pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-[#2FA084] focus:bg-white outline-none transition-all font-bold text-gray-600 appearance-none cursor-pointer"
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="student">Join as a Student</option>
              <option value="teacher">Join as a Teacher</option>
            </select>
          </div>

        
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-black text-white bg-[#2FA084] shadow-xl shadow-emerald-200 transition-all uppercase tracking-widest flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            type="submit"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : "Create Account"}
          </motion.button>
        </form>

         
        <p className="text-center mt-8 text-sm text-gray-400 font-medium">
          Already have an account?{" "}
          <Link 
            to="/login" 
            className="text-[#2FA084] font-black hover:underline transition-all underline-offset-4"
          >
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
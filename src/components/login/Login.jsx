import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { HiMail, HiLockClosed, HiUserGroup, HiAcademicCap, HiEye, HiEyeOff } from "react-icons/hi";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDemoLogin = (role) => {
    const credentials = role === 'teacher' 
      ? { email: "teacher@demo.com", password: "12345" }
      : { email: "student@demo.com", password: "12345" };
    
    setForm(credentials);
    toast.success(`${role.charAt(0).toUpperCase() + role.slice(1)} credentials filled!`, {
        
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const loginPromise = axios.post(
      `${import.meta.env.VITE_SITE_URL}/api/users/login`,
      form
    );

    toast.promise(loginPromise, {
      loading: 'Verifying credentials...',
      success: (res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        setTimeout(() => navigate("/"), 1200);
        return `Welcome back, ${res.data.user.name}!`;
      },
      error: (err) => {
        setLoading(false);
        return err.response?.data?.message || "Login Failed!";
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
        duration: 3000,
        iconTheme: { primary: '#2FA084', secondary: '#fff' },
      },
    });

    try {
      await loginPromise;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-gray-100 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-[#2FA084]"></div>

        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-gray-800 tracking-tight">Login</h2>
          <p className="text-gray-400 font-medium mt-2">Sign in to continue your journey</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            type="button"
            onClick={() => handleDemoLogin('teacher')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl border-2 border-dashed border-emerald-100 hover:border-[#2FA084] hover:bg-emerald-50 transition-all group"
          >
            <HiAcademicCap className="text-2xl text-emerald-300 group-hover:text-[#2FA084] mb-1" />
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Demo Teacher</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin('student')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl border-2 border-dashed border-emerald-100 hover:border-[#2FA084] hover:bg-emerald-50 transition-all group"
          >
            <HiUserGroup className="text-2xl text-emerald-300 group-hover:text-[#2FA084] mb-1" />
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Demo Student</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center mb-8">
            <div className="border-t w-full border-gray-100"></div>
            <span className="bg-white px-4 text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] absolute">Or use email</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Password"
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

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-black text-white bg-[#2FA084] shadow-xl shadow-emerald-200 transition-all uppercase tracking-widest flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            type="submit"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : "Sign In"}
          </motion.button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-400 font-medium">
          Don't have an account?{" "}
          <Link 
            to="/signup" 
            className="text-[#2FA084] font-black hover:underline transition-all underline-offset-4"
          >
            Create Account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";  

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

     
    const loginPromise = axios.post(
      `${import.meta.env.VITE_SITE_URL}/api/users/login`,
      form
    );

    toast.promise(loginPromise, {
      loading: 'Logging in...',
      success: (res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        
        
        setTimeout(() => navigate("/"), 1000); 
        return `Welcome back, ${res.data.user.name}!`;
      },
      error: (err) => {
        return err.response?.data?.message || "Login Failed!";
      },
    }, {
       
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
      success: {
        duration: 3000,
        iconTheme: {
          primary: '#2FA084',
          secondary: '#fff',
        },
      },
    });

    try {
      await loginPromise;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
       
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-8 border-[#2FA084]"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Login</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#2FA084] outline-none"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#2FA084] outline-none"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full py-3 rounded-lg font-bold text-white bg-[#2FA084] shadow-lg shadow-[#2FA084]/20"
            type="submit"
          >
            {loading ? "Please wait..." : "Sign In"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
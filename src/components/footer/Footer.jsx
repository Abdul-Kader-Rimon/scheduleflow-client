import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Github",
      icon: <FaGithub size={22} />,
      url: "https://github.com/Abdul-Kader-Rimon",
      color: "hover:text-gray-900",
    },
    {
      name: "Linkedin",
      icon: <FaLinkedin size={22} />,
      url: "https://www.linkedin.com/in/abdul-kader-rimon/",
      color: "hover:text-[#0077b5]",
    },
    {
      name: "Email",
      icon: <FaEnvelope size={22} />,
      url: "mailto:abdulkaderrimon8@gmail.com",
      color: "hover:text-[#2FA084]",
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 mt-auto font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
          
          
          <div className="max-w-sm space-y-5">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-[#2FA084] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-sm border border-emerald-500/10 group-hover:rotate-3 transition-transform text-center leading-none">
                S
              </div>
              <span className="text-2xl font-black tracking-tighter text-gray-800">
                Schedule<span className="text-[#2FA084]">Flow</span>
              </span>
            </Link>
            <p className="text-gray-500 text-[15px] leading-relaxed">
              A modern platform designed to streamline academic scheduling, making interaction between students and teachers effortless and efficient.
            </p>
          </div>

           
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-24 w-full md:w-auto">
            {/* Nav Links */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-gray-400">Main Menu</h4>
              <ul className="space-y-3">
                <li><Link to="/" className="text-[14px] font-bold text-gray-600 hover:text-[#2FA084] transition-all">Home</Link></li>
                <li><Link to="/signup" className="text-[14px] font-bold text-gray-600 hover:text-[#2FA084] transition-all">Get Started</Link></li>
              </ul>
            </div>

           
            <div className="space-y-5">
              <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-gray-400">Connect With Me</h4>
              <div className="flex items-center gap-6">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.1 }}
                    className={`text-gray-400 transition-all duration-300 ${social.color}`}
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 order-2 md:order-1">
            <span className="text-gray-400 text-[12px] font-medium tracking-tight">
              Developed by <span className="text-gray-800 font-bold">Abdul Kader Rimon</span>
            </span>
          </div>

          <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest order-1 md:order-2 text-center">
            Copyright &copy; {currentYear} ScheduleFlow. All Rights Reserved.
          </p>

          <div className="hidden md:flex items-center gap-2 order-3">
            <div className="w-2 h-2 bg-[#2FA084] rounded-full animate-pulse shadow-[0_0_8px_#2FA084]"></div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active System</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} EduSched. Built with ❤️ for the Internship Assignment.
        </p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="text-gray-400 hover:text-[#2FA084]">Github</a>
          <a href="#" className="text-gray-400 hover:text-[#2FA084]">Linkedin</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
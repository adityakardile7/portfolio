import { HiOutlineHome } from "react-icons/hi";
import { FiUser, FiBriefcase, FiShoppingBag } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  
    const handleHireMe = () => {
      const subject = "Job Opportunity / Project Inquiry";
      const body = 
        `Hi Aditya,
        I came across your portfolio and would like to discuss a potential opportunity / project with you.
        Looking forward to hearing from you.
        Best regards,`;

      const mailtoUrl = `mailto:adityakardile77@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoUrl;
    };

  return (
    <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
      {/* Left Icons */}
      <div className="flex items-center gap-5 text-2xl text-gray-500">
        {/* Home */}
        <button
          onClick={() => navigate("/")}
          className={`p-2 rounded-full ${
            location.pathname === "/"
              ? "bg-gray-100 text-black"
              : "text-gray-500"
          }`}
        >
          <HiOutlineHome />
        </button>

        {/* Profile */}
        <button
          onClick={() => navigate("/profile")}
          className={`p-2 rounded-full ${
            location.pathname === "/profile"
              ? "bg-gray-100 text-black"
              : "text-gray-500"
          }`}
        >
          <FiUser />
        </button>

      </div>

      {/* Hire Me Button */}
      <button 
      onClick={handleHireMe}
      className="bg-black text-white px-5 py-3 rounded-xl flex items-center gap-2 font-semibold shadow-md">
        <IoAddCircleOutline className="text-lg" />
        Hire Me
      </button>
    </div>
  );
};

export default Navbar;
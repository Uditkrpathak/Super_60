


import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import {
  AiFillHome,
  AiOutlineTeam,
  AiOutlineHistory,
  AiOutlineBook,
  AiOutlineBulb,
  AiOutlineCalendar,
  AiOutlineRead,
  AiOutlineExperiment,
  AiOutlinePhone,
  AiOutlineLogin,
  AiOutlineLogout,
} from 'react-icons/ai';
import AuthContext from '../../context/AuthContext';

const navLinks = [
  { to: '/', icon: <AiFillHome />, label: 'Home' },
  { to: '/about', icon: <AiOutlineTeam />, label: 'About Us' },
  { to: '/history', icon: <AiOutlineHistory />, label: 'History' },
  { to: '/batches', icon: <AiOutlineBook />, label: 'Batches' },
  { to: '/training-model', icon: <AiOutlineBulb />, label: 'Training Model' },
  { to: '/events', icon: <AiOutlineCalendar />, label: 'Events' },
  { to: '/blogs', icon: <AiOutlineRead />, label: 'Blogs' },
  { to: '/academics', icon: <AiOutlineExperiment />, label: 'Academic' },
  { to: '/contact', icon: <AiOutlinePhone />, label: 'Contact Us' },
];

const Sidebar = ({ onClose }) => {
  const [closing, setClosing] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose(); // call parent close after animation
    }, 500); // match transition duration
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  return (
   <div
  className={`fixed top-0 right-0 h-full w-72 bg-[#0a1627e6] backdrop-blur-md shadow-2xl p-6 z-50 text-white transform transition-transform duration-300 overflow-y-auto max-h-screen ${
    closing ? 'translate-x-full' : 'translate-x-0'
  }`}
>

      {/* Close Button */}
      <div className="flex justify-end mb-8">
        <button onClick={handleClose} className="text-white transition duration-300">
          <IoClose size={30} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4 mb-5">
        {navLinks.map((link, idx) => (
          <Link
            key={idx}
            to={link.to}
            onClick={handleClose}
            className="flex items-center gap-4 px-4 py-3 text-base transition duration-300 rounded-xl hover:bg-white/10 hover:shadow-inner"
          >
            <span className="text-xl">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}

        {/* Login/Logout Link */}
        {!isAuthenticated ? (
          <Link
            to="/login"
            onClick={handleClose}
            className="flex items-center gap-4 px-4 py-3 mb-8 text-base transition duration-300 rounded-xl hover:bg-white/10"
          >
            <AiOutlineLogin className="text-xl" />
            <span>Login</span>
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 mb-8 text-base transition duration-300 rounded-xl hover:bg-white/10"
          >
            <AiOutlineLogout className="text-xl" />
            <span>Logout</span>
          </button>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;

import React from 'react';
import { Link } from 'react-router-dom';
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
  AiOutlinePhone
} from 'react-icons/ai';

const Sidebar = ({ onClose }) => {
  return (
    <div className="fixed top-0 right-0 h-full w-64 bg-[#002244] shadow-xl p-6 z-50 text-white">
      {/* Close button */}
      <div className="flex justify-end mb-6">
        <button onClick={onClose} className="text-white">
          <IoClose size={28} />
        </button>
      </div>

      {/* Sidebar links with icons */}
      <nav className="flex flex-col gap-5 font-semibold">
        <Link to="/" onClick={onClose} className="flex items-center gap-2 hover:text-gray-300">
          <AiFillHome /> Home
        </Link>
        <Link to="/about" onClick={onClose} className="flex items-center gap-2 hover:text-gray-300">
          <AiOutlineTeam /> About Us
        </Link>
        <Link to="/history" onClick={onClose} className="flex items-center gap-2 hover:text-gray-300">
          <AiOutlineHistory /> History
        </Link>
        <Link to="/batches" onClick={onClose} className="flex items-center gap-2 hover:text-gray-300">
          <AiOutlineBook /> Batches
        </Link>
        <Link to="/training-model" onClick={onClose} className="flex items-center gap-2 hover:text-gray-300">
          <AiOutlineBulb /> Training Model
        </Link>
        <Link to="/events" onClick={onClose} className="flex items-center gap-2 hover:text-gray-300">
          <AiOutlineCalendar /> Events
        </Link>
        <Link to="/blogs" onClick={onClose} className="flex items-center gap-2 hover:text-gray-300">
          <AiOutlineRead /> Blogs
        </Link>
        <Link to="/academics" onClick={onClose} className="flex items-center gap-2 hover:text-gray-300">
          <AiOutlineExperiment /> Academic
        </Link>
        <Link to="/contact" onClick={onClose} className="flex items-center gap-2 hover:text-gray-300">
          <AiOutlinePhone /> Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;

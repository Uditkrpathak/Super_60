import React from 'react';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

const Sidebar = ({ onClose }) => {
  return (
    <div className="fixed top-0 right-0 h-full w-64   shadow-xl p-6 z-50">
      {/* Close button */}
      <div className="flex justify-end mb-6">
        <button onClick={onClose}>
          <IoClose size={28} />
        </button>
      </div>

      {/* Sidebar links */}
      <nav className="flex flex-col gap-5 font-semibold">
        <Link to="/" onClick={onClose}>Home</Link>
        <Link to="/about" onClick={onClose}>About Us</Link>
        <Link to="/history" onClick={onClose}>History</Link>
        <Link to="/batches" onClick={onClose}>Batches</Link>
        <Link to="/training-model" onClick={onClose}>Training Model</Link>
        <Link to="/events" onClick={onClose}>Events</Link>
        <Link to="/blogs" onClick={onClose}>Blogs</Link>
        <Link to="/academics" onClick={onClose}>Academic</Link>
        <Link to="/contact" onClick={onClose}>Contact Us</Link>
      </nav>
    </div>
  );
};

export default Sidebar;

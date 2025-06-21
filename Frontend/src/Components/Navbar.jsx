import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import Sidebar from './Sidebar';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md flex items-center justify-between px-6 py-4 z-50">
       
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex gap-8 font-semibold text-sm absolute left-1/2 -translate-x-1/2">
          <Link to="/about">ABOUT US</Link>
          <Link to="/history">HISTORY</Link>
          <Link to="/events">EVENTS</Link>
          <Link to="/academics">ACADEMIC</Link>
        </div>

        {/* Right: Hamburger Menu */}
        <button onClick={() => setIsSidebarOpen(true)} className="ml-auto">
          <FiMenu size={26} />
        </button>
      </nav>

      {/* Sidebar appears only when menu clicked */}
      {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
    </>
  );
};

export default Navbar;

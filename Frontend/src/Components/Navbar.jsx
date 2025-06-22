import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Sidebar from './Sidebar';
import logo from '../assets/s60_logo.jpg'

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-4 bg-white shadow-md">
       
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-auto h-14" />
        </div>

        {/* Center: Navigation Links */}
        <div className="absolute hidden gap-8 text-sm -translate-x-1/2 md:flex font-heading left-1/2 ">
          <Link to="/about" className=''>ABOUT US</Link>
          <Link to="/history">HISTORY</Link>
          <Link to="/events">EVENTS</Link>
          <Link to="/academics">ACADEMIC</Link>
        </div>

        {/* Right: Hamburger Menu */}
        <button onClick={() => setIsSidebarOpen(true)} className="ml-auto">
          <HiOutlineMenuAlt3 size={26} />
        </button>
      </nav>

      {/* Sidebar appears only when menu clicked */}
      {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
    </>
  );
};

export default Navbar;

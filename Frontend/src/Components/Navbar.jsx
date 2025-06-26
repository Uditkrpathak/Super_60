import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaUserCircle } from 'react-icons/fa';
import Sidebar from './Sidebar';
import logo from '../assets/s60_logo.jpg';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-4 bg-white shadow-md">
        {/* Logo */}
        <Link className="flex items-center cursor-pointer" to='/'>
          <img src={logo} alt="Logo" className="w-auto h-14" />
        </Link>

        {/* Center: Navigation Links */}
        <div className="absolute hidden gap-8 text-sm -translate-x-1/2 md:flex font-heading left-1/2 ">
          <Link to="/about">ABOUT US</Link>
          <Link to="/history">HISTORY</Link>
          <Link to="/events">EVENTS</Link>
          <Link to="/academics">ACADEMIC</Link>
        </div>

        {/* Right: User Icon or Hamburger */}
        <div className="flex items-center gap-4 ml-auto">
          {isAuthenticated && (
            <button
              onClick={() => navigate(user.role === 'admin' ? '/admin-dashboard' : '/student-profile')}
              className="text-[#002277] hover:text-blue-600"
              title="Go to Profile"
            >
              <FaUserCircle size={26} />
            </button>
          )}

          <button onClick={() => setIsSidebarOpen(true)}>
            <HiOutlineMenuAlt3 size={26} />
          </button>
        </div>
      </nav>

      {/* Sidebar appears only when menu clicked */}
      {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
    </>
  );
};

export default Navbar;

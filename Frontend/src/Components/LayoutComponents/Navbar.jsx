import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaUserCircle } from 'react-icons/fa';
import Sidebar from './Sidebar';
import logo from '../../assets/super-60logo.png';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-2 bg-white shadow-md">
        {/* Logo */}
        <Link className="flex items-center cursor-pointer" to='/'>
          <img src={logo} alt="Logo" className="w-auto h-14" />
        </Link>

        {/* Center: Navigation Links */}
        <div className="absolute hidden gap-8 text-sm -translate-x-1/2 md:flex font-heading left-1/2 ">
          <NavLink className={({isActive})=>`${isActive?'text-orange-500':'text-black'}`} to="/about">ABOUT US</NavLink>
          <NavLink className={({isActive})=>`${isActive?'text-orange-500':'text-black'}`} to="/history">HISTORY</NavLink>
          <NavLink className={({ isActive }) => `${isActive ? 'text-orange-500' : 'text-black'}`} to="/events">EVENTS</NavLink>
          <NavLink className={({ isActive }) => `${isActive ? 'text-orange-500' : 'text-black'}`} to="/academics">ACADEMIC</NavLink>
        </div>

        {/* Right: User Icon or Hamburger */}
        <div className="flex items-center gap-4 ml-auto">
          {isAuthenticated && (
            <NavLink to={user.role === 'admin' ? '/admin/dashboard' : '/student-profile'} className={({ isActive }) => `${isActive ? 'text-orange-500' : 'text-[#002277]'} hover:text-blue-600 transition-all duration-500`} >
              <FaUserCircle size={26} />
            </NavLink>
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

import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import logo from '../assets/s60_logo.jpg';

const Footer = () => {
  return (
    <footer className="px-2 py-10 mt-32 text-black bg-white shadow-xl">
      <div className="grid grid-cols-1 gap-12 mx-auto max-w-7xl md:grid-cols-4">
        {/* Logo and description */}
        <div>
          <img src={logo} alt="JS60 Logo" className="h-12 mb-6" />
          <p className="text-sm">
            Super60 is a merit based program that empowers top students through
            technical training, academic excellence, discipline, and real-world
            exposure guided by expert mentorship.
          </p>
        </div>

        {/* NAVIGATE */}
        <div>
          <h3 className="mb-2 font-semibold">NAVIGATE</h3>
          <ul className="space-y-1">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/events">Events</Link></li>
          </ul>
        </div>

        {/* COMMUNITY */}
        <div>
          <h3 className="mb-2 font-semibold">COMMUNITY</h3>
          <ul className="space-y-1">
            <li><Link to="/community">Community</Link></li>
            <li><Link to="/batches">Batches</Link></li>
            <li><Link to="/how-it-started">How It Started</Link></li>
            <li><Link to="/login">Member Login</Link></li>
          </ul>
        </div>

        {/* RESOURCES */}
        <div>
          <h3 className="mb-2 font-semibold">RESOURCES</h3>
          <ul className="space-y-1">
            <li><Link to="/training-model">Training Model</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms Of Services</Link></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-4 border-gray-300" />

      {/* Social Icons */}
      <div className="flex justify-end px-6 mx-auto space-x-4 max-w-7xl">
        <Link  className="text-xl text-black"><FaInstagram /></Link>
        <Link  className="text-xl text-black"><FaGithub /></Link>
        <Link className="text-xl text-black"><FaLinkedin /></Link>
        <Link className="text-xl text-black"><FaFacebook /></Link>
      </div>
    </footer>
  );
};

export default Footer;

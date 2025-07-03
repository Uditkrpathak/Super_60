import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import logo from '../assets/Logo.png';

const Footer = () => {
  return (
    <footer className="px-4 py-10 mt-32 text-black bg-white shadow-2xl dark:bg-gray-900 dark:text-gray-200">
      <div className="grid grid-cols-1 gap-10 mx-auto sm:grid-cols-2 md:grid-cols-4 max-w-7xl">
        {/* Logo & Description */}
        <div>
          <img src={logo} alt="JS60 Logo" className="mb-4 h-14" />
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Super60 is a merit-based program that empowers top students through
            technical training, academic excellence, discipline, and real-world
            exposure guided by expert mentorship.
          </p>
        </div>

        {/* Navigate */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">NAVIGATE</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="transition hover:text-orange-500">Home</Link></li>
            <li><Link to="/about" className="transition hover:text-orange-500">About Us</Link></li>
            <li><Link to="/blogs" className="transition hover:text-orange-500">Blogs</Link></li>
            <li><Link to="/events" className="transition hover:text-orange-500">Events</Link></li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">COMMUNITY</h3>
          <ul className="space-y-2">
            <li><Link to="/community" className="transition hover:text-orange-500">Community</Link></li>
            <li><Link to="/batches" className="transition hover:text-orange-500">Batches</Link></li>
            <li><Link to="/history" className="transition hover:text-orange-500">How It Started</Link></li>
            <li><Link to="/login" className="transition hover:text-orange-500">Member Login</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">RESOURCES</h3>
          <ul className="space-y-2">
            <li><Link to="/training-model" className="transition hover:text-orange-500">Training Model</Link></li>
            <li><Link to="/contact" className="transition hover:text-orange-500">Contact Us</Link></li>
            <li><Link to="/privacy-policy" className="transition hover:text-orange-500">Privacy Policy</Link></li>
            <li><Link to="/terms" className="transition hover:text-orange-500">Terms Of Services</Link></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-8 border-gray-300 dark:border-gray-700" />

      {/* Bottom Section */}
      <div className="flex flex-col items-center justify-between px-4 mx-auto sm:flex-row max-w-7xl">
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400 sm:mb-0">
          © {new Date().getFullYear()} Super60. All rights reserved.
        </p>
        <div className="flex space-x-4 text-xl">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition hover:text-orange-500"
          >
            <FaInstagram />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition hover:text-orange-500"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition hover:text-orange-500"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="transition hover:text-orange-500"
          >
            <FaFacebook />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState } from 'react';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import AuthImg from '../../assets/undraw_authentication_tbfc.svg'; 
import logo from '../../assets/s60_logo.jpg'; 
const Log = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex min-h-screen mt-10 overflow-hidden bg-white md:mt-10 sm:mt-12">
      {/* Left Section */}
      
      <div className="relative items-center justify-center hidden w-1/2 md:flex">
        <img
          src={AuthImg}
          alt="Login Illustration"
          className="object-cover h-auto max-w-md mt-20"
        />
      </div>
{/* Right section */}
      <div className="w-full max-w-xl p-8 md:w-1/2 md:p-16 ">
        {/* Logo */}
       <div className="flex justify-center mb-10">
  <img className="w-24" src={logo} alt="S60 Logo" />
</div>


        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-sm text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Email Login */}
        <h2 className="mb-4 text-xl font-medium">
          Login with <span className="font-bold text-[#002277]">Email</span>
        </h2>   

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-2 font-medium text-white transition bg-[#002277] rounded hover:bg-[#C57726] focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign In
          </button>
        </form>

          {/* Google Login */}
        <button className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-10 text-sm font-medium border border-gray-300 rounded">
          <FaGoogle /> Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Log;

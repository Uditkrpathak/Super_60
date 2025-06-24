import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import AuthImg from '../../assets/undraw_authentication_tbfc.svg';
import logo from '../../assets/s60_logo.jpg';
import ButtonWrapper from '../Button/ButtonWrapper';
import AuthContext from '../../context/AuthProvider';
import BACKEND_URL from '../../config';
import axios from 'axios';

const Log = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [message,setMessage] = useState('');

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_URL}/auth/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { message, token, userData } = (res.data);
      login(token, userData);
      navigate('/');

    } catch (error) {
      setMessage(error.response?.data.message);
      console.error("Login failed:", error.response?.data || error.message);
    }
  };


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

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            name='email'
            value={formData.email}
            onChange={changeHandler}
            required={true}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              name='password'
              value={formData.password}
              onChange={changeHandler}
              required={true}
              minLength={6}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          
          {message && (
          <div className="mt-2 flex items-center gap-2 text-sm text-red-600 px-3 animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium">{message}</span>
          </div>
          )}


          <button
            type='submit'
            className='w-full'
          >
            <ButtonWrapper />
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

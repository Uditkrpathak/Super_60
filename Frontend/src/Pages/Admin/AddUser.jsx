import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../../assets/s60_logo.jpg';
import axios from 'axios';
import BACKEND_URL from '../../utils/axiosConfig';

const AddUser = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'student',
    });

    const changeHandler = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
                `${BACKEND_URL}/auth/register`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('User created:', res.data);
            setMessage('User successfully added ✅');
            setFormData({
                username: '',
                email: '',
                password: '',
                role: 'student',
            });
        } catch (err) {
            console.error(err);
            setMessage(err.response?.data.message || 'Error adding user');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="w-full max-w-xl p-8 md:p-16">
                {/* Logo */}
                <div className="flex justify-center mb-10">
                    <img className="w-24" src={logo} alt="S60 Logo" />
                </div>

                <h2 className="mb-4 text-xl font-semibold text-center text-[#002277]">
                    Add New User
                </h2>

                <form onSubmit={submitHandler} className="space-y-4">
                    {/* Username */}
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={changeHandler}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={changeHandler}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    {/* Password */}
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={changeHandler}
                            required
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

                    {/* Role Select */}
                    <select
                        name="role"
                        value={formData.role}
                        onChange={changeHandler}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                    </select>

                    {/* Message */}
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#002277] hover:bg-blue-800 text-white px-4 py-2 rounded-md"
                    >
                        Add User
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddUser;
import React, { useState } from 'react';
import HeroSection from '../Components/hero/HeroSection';
import JoinUs from '../Components/JoinUs/JoinUs';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import { IoLogoWhatsapp } from 'react-icons/io5';
import logo from '../assets/Logo.png'; 
import axios from 'axios';
import BACKEND_URL from '../utils/axiosConfig';
import { motion } from 'framer-motion';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
    });

    const [statusMessage, setStatusMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage('Sending...');

        try {
            const res = await axios.post(`${BACKEND_URL}/contact`, formData);
            setStatusMessage('Message sent successfully!');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                message: '',
            });
        } catch (err) {
            console.error('Form submission error:', err);
            setStatusMessage('Failed to send message. Please try again.');
        }
    };

    // Framer Motion Variants

    // Container for the whole contact form
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.1 } },
    };

    // For children elements to animate in sequence
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

  

    const formInputVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    };

    const submitButtonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.8 } },
        hover: { scale: 1.03, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" },
        tap: { scale: 0.98 },
    };

    return (
        <>
            <HeroSection heading1={'More Than a Community'} heading2={'The Super 60'} subHeading={'An elite circle of creators, coders, and changemakers shaping the future together.'} badge={'CheckEvents Now'} />

            <div className="min-h-screen bg-white p-8 sm:p-16 flex items-center justify-center">
                <motion.div
                    className="max-w-screen-xl w-full bg-white rounded-xl overflow-hidden md:flex" // Added shadow
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Left SECTION */}
                    <motion.div
                        className="md:w-2/5 p-8 md:p-12 bg-white text-gray-800 flex flex-col justify-between" 
                        variants={itemVariants}
                    >
                        <div>
                            <div className="flex items-center mb-10">
                                {logo && (
                                    <motion.div
                                        className="h-14 w-14 flex items-center justify-center mr-4 p-1" 
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 150, damping: 10, delay: 0.2 }}
                                    >
                                        <img src={logo} alt="Super-60 Logo" className="h-12 w-12" /> 
                                    </motion.div>
                                )}
                                <motion.h3
                                    className="text-2xl font-bold text-gray-900" 
                                    variants={itemVariants}
                                >
                                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Super-60</span> Community
                                </motion.h3>
                            </div>

                            <motion.div className="mb-12" variants={itemVariants}>
                                <h4 className="text-2xl font-bold text-gray-900 mb-4">Let's Connect</h4> 
                                <p className="text-gray-600 mb-6 text-lg"> 
                                    Reach out to us through our social channels for quick responses and updates.
                                </p>
                                <div className="space-y-5">
                                    <motion.a
                                        href="https://instagram.com/your_super60_instagram"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-gray-800 hover:text-red-600 font-semibold text-lg transition-colors duration-200"
                                        whileHover={{ x: 5 }}
                                    >
                                        <FaInstagram className="w-6 h-6 mr-4 text-red-600" /> 
                                        Follow us on Instagram
                                    </motion.a>
                                    <motion.a
                                        href="https://linkedin.com/company/your_super60_linkedin"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-gray-800 hover:text-blue-600 font-semibold text-lg transition-colors duration-200" 
                                        whileHover={{ x: 5 }}
                                    >
                                        <FaLinkedinIn className="w-6 h-6 mr-4 text-blue-600" /> 
                                        Connect on LinkedIn
                                    </motion.a>
                                    <motion.a
                                        href="https://wa.me/your_super60_whatsapp_number"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-gray-800 hover:text-green-600 font-semibold text-lg transition-colors duration-200" 
                                        whileHover={{ x: 5 }}
                                    >
                                        <IoLogoWhatsapp className="w-6 h-6 mr-4 text-green-600" /> 
                                        Message us on WhatsApp
                                    </motion.a>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div className="mt-auto" variants={itemVariants}>
                            <h4 className="text-2xl font-bold text-gray-900 mb-4">Our Location</h4> 
                            <p className="text-gray-600 mb-6 text-lg">Find us here:</p> 
                            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-300"> 
                                <motion.iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3434.61916327341!2d76.6200235750379!3d30.597950274648795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ffb0b00000001%3A0xc33161c210d196f1!2sSwami%20Vivekanand%20Institute%20of%20Engineering%20%26%20Technology!5e0!3m2!1sen!2sin!4v1720968132000!5m2!1sen!2sin"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="SVIET, Banur Location"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                ></motion.iframe>
                            </div>
                            <motion.p className="text-gray-600 mt-4 text-base" variants={itemVariants}>SVIET, Banur, Punjab-140601</motion.p> 
                        </motion.div>
                    </motion.div>

                    {/* Right Section (Form) */}
                    <motion.div
                        className="md:w-3/5 p-8 md:p-14"
                        variants={itemVariants}
                    >
                        <motion.h2
                            className="text-4xl font-extrabold text-gray-800 mb-4"
                            variants={itemVariants}
                        >
                            Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Super-60</span>
                        </motion.h2>
                        <motion.p
                            className="text-gray-600 mb-10 text-lg"
                            variants={itemVariants}
                        >
                            Got any questions about Super-60, our programs, or scaling your skills? We're here to help.
                        </motion.p>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <motion.div variants={formInputVariants}>
                                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">First name *</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                                    />
                                </motion.div>
                                <motion.div variants={formInputVariants}>
                                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">Last name *</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                                    />
                                </motion.div>
                            </div>

                            <motion.div className="mb-8" variants={formInputVariants}>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                                />
                            </motion.div>

                            <motion.div className="mb-8" variants={formInputVariants}>
                                <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">Phone number</label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                                />
                            </motion.div>

                            <motion.div className="mb-10" variants={formInputVariants}>
                                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Your Message *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows="6"
                                    required
                                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                                ></textarea>
                            </motion.div>

                            {statusMessage && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`mb-4 text-sm ${statusMessage.includes('') ? 'text-green-600' : 'text-red-600'}`}
                                >
                                    {statusMessage}
                                </motion.div>
                            )}

                            <motion.button
                                type="submit"
                                className="w-full bg-blue-900 text-white py-4 px-6 rounded-lg font-bold text-xl hover:bg-blue-800 transition-colors duration-300"
                                variants={submitButtonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                initial="hidden"
                                animate="visible"
                            >
                                Send Your Message
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            </div>

            <JoinUs />
        </>
    );
};

export default Contact;
import React, { useState } from 'react'
import HeroSection from '../Components/hero/HeroSection'
import JoinUs from '../Components/JoinUs/JoinUs'
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
import { IoLogoWhatsapp } from 'react-icons/io5'
import logo from '../assets/Logo.png';

const Contact = () => {
const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
        services: [],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleServiceChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prev => {
            if (checked) {
                return { ...prev, services: [...prev.services, value] };
            } else {
                return { ...prev, services: prev.services.filter(service => service !== value) };
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.')
    };


  return (
    <>
      <HeroSection heading1={'More Than a Community'} heading2={'The Super 60'} subHeading={'An elite circle of creators, coders, and changemakers shaping the future together.'} badge={'CheckEvents Now'} />
       
       <div className="min-h-screen bg-white p-6 sm:p-10 flex items-center justify-center">
            <div className="max-w-screen-xl w-full bg-white rounded-xl overflow-hidden md:flex"> 
                {/* left SECTION */}
                <div className="md:w-2/5 p-8 md:p-12 bg-gradient-to-br from-blue-900 to-blue-800 text-white flex flex-col justify-between">
                    <div>
                        <div className="flex items-center mb-10">
                            {logo ? (
                                <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center mr-4 p-1">
                                    <img src={logo} alt="Super-60 Logo" className="h-10 w-auto" />
                                </div>
                            ) : (
                                <div className="h-12 w-12 bg-white rounded-full mr-4 flex items-center justify-center text-blue-900 font-bold text-lg">S60</div>
                            )}
                            <h3 className="text-2xl font-bold">The <span className='text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600'>Super-60</span> Community</h3>
                        </div>

                        <div className="mb-12">
                            <h4 className="text-2xl font-bold mb-4">Let's Connect</h4>
                            <p className="text-blue-200 mb-6 text-lg">Reach out to us through our social channels for quick responses and updates.</p>
                            <div className="space-y-5">
                                <a href="https://instagram.com/your_super60_instagram" target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-blue-200 font-semibold text-lg transition-colors duration-200">
                                    <FaInstagram className="w-6 h-6 mr-4" />
                                    Follow us on Instagram
                                </a>
                                <a href="https://linkedin.com/company/your_super60_linkedin" target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-blue-200 font-semibold text-lg transition-colors duration-200">
                                    <FaLinkedinIn className="w-6 h-6 mr-4" />
                                    Connect on LinkedIn
                                </a>
                                <a href="https://wa.me/your_super60_whatsapp_number" target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-blue-200 font-semibold text-lg transition-colors duration-200">
                                    <IoLogoWhatsapp className="w-6 h-6 mr-4" />
                                    Message us on WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <h4 className="text-2xl font-bold mb-4">Our Location</h4>
                        <p className="text-blue-200 mb-6 text-lg">Find us here:</p>
                        <div className="bg-white rounded-lg overflow-hidden border border-blue-700">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3434.9081878841457!2d76.68532431491763!3d30.59013088169974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ff91e4b2d35e1%3A0x89c74d6b7b2d3d94!2sSVIET%2C%20Banur!5e0!3m2!1sen!2sin!4v1678876800000!5m2!1sen!2sin"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="SVIET, Banur Location"
                            ></iframe>
                        </div>
                        <p className="text-blue-200 mt-4 text-base">SVIET, Banur, Punjab-140601</p>
                    </div>
                </div>

                {/* right SECTION */}
                <div className="md:w-3/5 p-8 md:p-14">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
                        Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Super-60</span>
                    </h2>
                    <p className="text-gray-600 mb-10 text-lg">
                        Got any questions about Super-60, our programs, or scaling your skills? We're here to help.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">First name *</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Your first name"
                                    required
                                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-gray-800"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">Last name *</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Your last name"
                                    required
                                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-gray-800"
                                />
                            </div>
                        </div>

                        <div className="mb-8">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="you@example.com"
                                required
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-gray-800"
                            />
                        </div>

                        <div className="mb-8">
                            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">Phone number</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="+91-XXXXXXXXXX (Optional)"
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-gray-800"
                            />
                        </div>

                        <div className="mb-10">
                            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Your Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Tell us how we can help you."
                                rows="6"
                                required
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-gray-800"
                            ></textarea>
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full bg-blue-900 text-white py-4 px-6 rounded-lg font-bold text-xl hover:bg-blue-800 transition-colors duration-300 transform hover:scale-105"
                        >
                            Send Your Message
                        </button>
                    </form>
                </div>
            </div>
        </div>

       <JoinUs />
        </>
  )
}

export default Contact
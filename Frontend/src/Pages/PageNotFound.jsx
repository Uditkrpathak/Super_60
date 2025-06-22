import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LOST_GIF from '../assets/Page404/lost-student.gif';

const PageNotFound = () => {

    useEffect(() => {
        document.title = '404 - Page Not Found';
    }, []);


    return (
        <div
            className="h-screen flex flex-col items-center justify-center bg-white px-4"
            role="alert"
            aria-labelledby="error-heading"
        >
            <img
                src={LOST_GIF}
                alt="Lost student illustration"
                className="h-80 mb-6 animate-fadeIn"
            />
            <h1 id="error-heading" className="text-4xl text-center font-bold text-gray-800 mb-2">
                Oops! Page not found
            </h1>
            <p className="text-gray-600 mb-6 text-center max-w-md">
                This page doesn't exist or might have been moved. Head back to the Super 60 homepage to continue your learning journey.
            </p>
            <Link
                to="/"
                className="px-6 py-3 transition duration-500 bg-blue-600 text-white bg-[#242362] rounded-lg hover:bg-orange-500"
            >
                 Go to Homepage
            </Link>
        </div>
    );
};

export default PageNotFound;

import { Link } from 'react-router-dom';
import './JoinUs.css'; 

const JoinUs = () => {
    return (
       <section className="relative px-4 py-6 overflow-hidden bg-white">
            <div
                className="absolute inset-0 z-0 opacity-20"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1567520596356-dd68cbc53b37?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    backgroundSize: "cover",
                }}
            ></div>

            {/* Content Layer */}
            <div className="relative z-10 max-w-4xl p-8 mx-auto text-center">
                <h2 className="mb-2 text-2xl font-extrabold leading-tight text-gray-800 md:text-4xl">
                    Join Us Today
                </h2>
                <p className="mb-8 text-lg font-light text-gray-600 md:text-xl">
                    Join The Super 60 - an elite community where creators, coders, and changemakers learn from the best to shape the future.
                </p>

                {/* Login Button */}
                <Link
                    to="/login"
                    className="
                        relative // Essential for positioning lightning line and arrow bg
                        inline-flex items-center justify-center
                        bg-blue-900 hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800
                        text-white text-lg font-semibold
                        py-3 pl-8 pr-4 // Padding for the button, leaving space for the arrow
                        rounded-full
                        transition-all duration-300 ease-in-out
                        shadow-lg hover:shadow-xl
                        overflow-hidden // Crucial for the lightning line animation
                        group // Enables hover effects on children
                    "
                >
                    Login
                    <span className="ml-4"></span> 
                    <span className="absolute inset-0 button-lightning-line"></span>

                    <span className="relative z-10 arrow-container">
                        <span className="absolute inset-0 bg-white rounded-full arrow-bg"></span>
                        <span className="relative text-blue-900 transition-transform duration-300 ease-in-out arrow-icon">
                            &rarr;
                        </span>
                    </span>
                </Link>
            </div>
        </section>
    );
};

export default JoinUs;
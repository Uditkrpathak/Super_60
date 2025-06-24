import { Link } from 'react-router-dom';
import './JoinUs.css'; 

const JoinUs = () => {
    return (
       <section className="relative py-6 px-4 overflow-hidden bg-white">
            <div
                className="absolute inset-0 z-0 opacity-20"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1567520596356-dd68cbc53b37?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    backgroundSize: "cover",
                }}
            ></div>

            {/* Content Layer */}
            <div className="relative z-10 max-w-4xl mx-auto text-center p-8">
                <h2 className="text-2xl md:text-4xl font-extrabold mb-2 leading-tight text-gray-800">
                    Join Us Today
                </h2>
                <p className="text-lg md:text-xl mb-8 font-light text-gray-600">
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
                    <span className="button-lightning-line absolute inset-0"></span>

                    <span className="arrow-container relative z-10">
                        <span className="arrow-bg absolute inset-0 rounded-full bg-white"></span>
                        <span className="arrow-icon relative text-blue-900 transition-transform duration-300 ease-in-out">
                            &rarr;
                        </span>
                    </span>
                </Link>
            </div>
        </section>
    );
};

export default JoinUs;
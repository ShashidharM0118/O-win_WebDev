/* eslint-disable react/no-unescaped-entities */

import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Swipers from "../Swiper/Swipers";
import Swipers from "../Swiper/Swipers.jsx";
import Navbar from "../Navbar/Navbar.jsx"

const Banner = () => {
    return (
        <div className="text-white">
            <div className="hero" style={{ backgroundImage: 'url(https://i.ibb.co/1TprwH7/IMG-20231012-WA0017.jpg)', placeItems: 'normal' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div>
                    <div className="px-5 lg:px-20">
                        <Navbar></Navbar>
                        <div className="flex flex-col lg:flex-row gap-20 justify-between container mx-auto px-5 py-20 lg:py-56">
                            <div className="flex items-center">
                                <div>
                                    <h1 className="mb-5 text-6xl md:text-7xl lg:text-9xl font-bold">Cox's bazar</h1>
                                    <p className="mb-5 text-xl lg:text-3xl">Cox's Bazar is a city, fishing port, tourism centre and district headquarters in southeastern Bangladesh. It is famous mostly for its long natural sandy beach, and it ...</p>
                                    <div className="flex gap-4">
                                        <button className="btn bg-yellow-500 border-none text-xl lg:text-3xl">Booking</button>
                                        <Link to="/curr-tour">
                                            <button className="btn bg-blue-500 border-none text-xl lg:text-3xl">Current Tour</button>
                                        </Link>
                                    </div>
        <div className="relative min-h-screen text-white">
            {/* Background Image with Parallax Effect */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{ 
                    backgroundImage: 'url(/src/assets/images/icons/backgroundImage.jpg)',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
            </div>

            {/* Content Container */}
            <div className="relative">
                <div className="px-4 lg:px-20">
                    <Navbar />
                    
                    <div className="container mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 py-12 lg:py-32">
                        {/* Left Content */}
                        <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2 text-yellow-400">
                                    <span className="w-8 h-[2px] bg-yellow-400"></span>
                                    <span className="text-sm uppercase tracking-wider">Featured Destination</span>
                                </div>
                                <h1 className="text-5xl lg:text-8xl font-bold leading-tight animate-fade-in">
                                Bengaluru <span className="block text-yellow-400">The Garden City of Karnataka</span>
                                </h1>
                            </div>
                            
                            <p className="text-lg lg:text-xl text-gray-200 max-w-xl leading-relaxed">
                                 Where Tradition Meet Innovation
                            </p>
                            
                            {/* Stats Section */}
                            <div className="grid grid-cols-3 gap-4 py-6">
                                <div className="border-l-2 border-yellow-400 pl-4">
                                    <div className="text-3xl font-bold">120km</div>
                                    <div className="text-sm text-gray-300">Beach Length</div>
                                </div>
                                <div className="border-l-2 border-yellow-400 pl-4">
                                    <div className="text-3xl font-bold">4.8</div>
                                    <div className="text-sm text-gray-300">Rating</div>
                                </div>
                                <div className="border-l-2 border-yellow-400 pl-4">
                                    <div className="text-3xl font-bold">28°C</div>
                                    <div className="text-sm text-gray-300">Temperature</div>
                                </div>
                            </div>
                            
                            {/* CTA Buttons */}
                            <div className="flex gap-4 pt-4">
                                <button className="px-8 py-4 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-300 flex items-center space-x-2">
                                    <span>Book Now</span>
                                    <span className="text-xl">→</span>
                                </button>
                                <button className="px-8 py-4 border-2 border-white rounded-lg hover:bg-white/10 transition-colors duration-300">
                                    Watch Video
                                </button>
                            </div>
                        </div>

                        {/* Right Content - Swiper */}
                        <div className="relative flex items-center">
                            <div className="w-full h-full bg-black/20 backdrop-blur-sm rounded-2xl p-4">
                                <Swipers />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;

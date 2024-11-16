/* eslint-disable react/no-unescaped-entities */
import {Link} from "react-router-dom"
import Navbar from "../Navbar/Navbar";
import Swipers from "../Swiper/Swipers";

const Banner = () => {
    return (
        <div className="text-white">
            <div className="hero" style={{ backgroundImage: 'url(https://i.ibb.co/1TprwH7/IMG-20231012-WA0017.jpg)', placeItems: 'normal' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div>
                    <div className="px-5 lg:px-20">
                        <Navbar></Navbar>
                        <div className="flex flex-col lg:flex-row gap-20 justify-between  container mx-auto px-5 py-20 lg:py-56">
                            <div className="flex items-center">
                                <div>
                                    <h1 className="mb-5 text-6xl md:text-7xl lg:text-9xl font-bold">Cox's bazar</h1>
                                    <p className="mb-5 text-xl lg:text-3xl">Cox's Bazar is a city, fishing port, tourism centre and district headquarters in southeastern Bangladesh. It is famous mostly for its long natural sandy beach, and it ...</p>
                                    {/* <button className="btn bg-yellow-500 border-none text-xl lg:text-3xl">Booking</button> */}
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
                                    <div className="flex gap-4">
                                        <button className="btn bg-yellow-500 border-none text-xl lg:text-3xl">Booking</button>
                                        <Link to="/curr-tour">
                                            <button className="btn bg-blue-500 border-none text-xl lg:text-3xl">Current Tour</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Swipers></Swipers>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
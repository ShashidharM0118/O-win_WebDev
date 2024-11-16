/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
// import {Navbar} from "../Navbar/Navbar.jsx";
import Swipers from "../Swiper/Swipers.jsx";
import { useNavigate } from 'react-router-dom';

import backgroundImage from "../../assets/images/icons/chikkamagaluru.jpg";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="text-white">
      <div
        className="hero relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay for contrast */}
        <div className="hero-overlay bg-opacity-70 absolute inset-0 bg-gray-800"></div>

        <div className="relative z-10">
          <div className="px-5 lg:px-20">
            {/* <Navbar /> */}
            <div className="flex flex-col lg:flex-row gap-20 justify-between container mx-auto px-5 py-20 lg:py-56">
              {/* Left Column */}
              <div className="flex items-center flex-col lg:flex-row">
                <div>
                  <h1 className="mb-5 text-6xl md:text-7xl lg:text-6xl font-bold">
                    Chikkamagaluru
                  </h1>
                  <p className="mb-5 text-xl lg:text-3xl">
                    Chikkamagaluru, often called the "Coffee Land of Karnataka,"
                    is a hidden gem nestled in the Western Ghats. Known for its
                    lush coffee plantations and mist-covered hills, the town
                    offers a serene escape from the hustle and bustle of city
                    life...
                  </p>
                  {/* Stats Section */}
                  <div className="grid grid-cols-3 gap-4 py-6">
                    <div className="border-l-2 border-yellow-400 pl-4">
                      <div className="text-3xl font-bold">1930m</div>
                      <div className="text-sm text-gray-300">Highest Peak</div>
                    </div>
                    <div className="border-l-2 border-yellow-400 pl-4">
                      <div className="text-3xl font-bold">4.7</div>
                      <div className="text-sm text-gray-300">Rating</div>
                    </div>
                    <div className="border-l-2 border-yellow-400 pl-4">
                      <div className="text-3xl font-bold">22°C</div>
                      <div className="text-sm text-gray-300">Temperature</div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-4">
                  <button
  className="btn bg-yellow-500 border-none text-xl lg:text-2xl"
  onClick={() => navigate('/booking')}
>
  Booking
</button>

                    <Link to="/curr-tour">
                      <button className="btn bg-blue-500 border-none text-xl lg:text-2xl">
                        Current Tour
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              {/* Right Column - Swipers */}
              <div className="w-full lg:w-[50%]">
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

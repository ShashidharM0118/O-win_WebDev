import Swipers from "../Swiper/Swipers.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative min-h-screen text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url(/src/assets/images/icons/chikkamagaluru.jpg)",
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
                  <span className="text-sm uppercase tracking-wider">
                    Featured Destination
                  </span>
                </div>
                <h1 className="text-5xl lg:text-8xl font-bold leading-tight animate-fade-in">
                  CHIKKAMAGALURU<span className="block text-yellow-400"></span>
                </h1>
              </div>

              <p className="text-lg lg:text-xl text-gray-200 max-w-xl leading-relaxed">
                Chikkamagaluru, often called the "Coffee Land of Karnataka," is
                a hidden gem nestled in the Western Ghats. Known for its lush
                coffee plantations and mist-covered hills, the town offers a
                serene escape from the hustle and bustle of city life.....
              </p>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-4 py-6">
                <div className="border-l-2 border-yellow-400 pl-4">
                  <div className="text-3xl font-bold">3400ft</div>
                  <div className="text-sm text-gray-300">Elevation</div>
                </div>
                <div className="border-l-2 border-yellow-400 pl-4">
                  <div className="text-3xl font-bold">4.7</div>
                  <div className="text-sm text-gray-300">Rating</div>
                </div>
                <div className="border-l-2 border-yellow-400 pl-4">
                  <div className="text-3xl font-bold">20°C</div>
                  <div className="text-sm text-gray-300">Temperature</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4 pt-4">
                <Link to="/login">
                  <button className="px-8 py-4 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-300 flex items-center space-x-2">
                    <span>Book Now</span>
                    <span className="text-xl">→</span>
                  </button>
                </Link>
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

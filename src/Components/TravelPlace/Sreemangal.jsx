import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Sreemangal = () => {
    return (
        <div>
            <div className="text-white">
                <div className="hero" style={{ backgroundImage: 'url(https://i.ibb.co/1TprwH7/IMG-20231012-WA0017.jpg)', placeItems: 'normal' }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div>
                        <div className="px-5 lg:px-20">
                            <Navbar></Navbar>
                            <div className="flex flex-col lg:flex-row gap-20 justify-between container mx-auto py-20 lg:py-56">
                                <div className="flex flex-col lg:flex-row gap-20 justify-between px-5">
                                    <div className="flex items-center">
                                        <div>
                                            <h1 className="mb-5 text-6xl md:text-7xl lg:text-9xl font-bold">SREEMANGAL</h1>
                                            <p className="mb-5 text-xl lg:text-2xl">Sreemangal, often referred to as the Tea Capital of Bangladesh, is a charming town located in the northeastern part of Bangladesh, within the Moulvibazar district. Renowned for its lush tea gardens, vibrant landscapes, and tranquil ambiance, Sreemangal is a haven for both nature lovers and tea aficionados.

                                                The town is situated amidst rolling hills and verdant valleys, where endless stretches of tea estates paint the scenery in shades of green. The undulating tea gardens, interspersed with winding roads and streams, create a stunning mosaic that captivates visitors as they explore this idyllic region.
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
                                            <Link to='/login'>
                                                <button className="btn bg-yellow-500 border-none text-xl lg:text-3xl">Explore</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>


                                <div className="flex items-center">
                                    <div className="bg-white md:m-10 rounded-xl w-full md:w-full lg:w-96 text-black">
                                        <form className="card-body">
                                            <h2 className="text-xl text-black font-bold pt-5">Booking Service</h2>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text font-bold">Origin</span>
                                                </label>
                                                <input type="text" placeholder="Enter Your Origin" className="input input-bordered" required />
                                            </div>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text font-bold">Destination</span>
                                                </label>
                                                <input type="text" placeholder="Enter Your Destination" className="input input-bordered" required />
                                            </div>

                                            <div className="gap-6 grid grid-cols-2">
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text font-bold">From</span>
                                                    </label>
                                                    <input type="text" placeholder="date" className="input input-bordered" required />
                                                </div>

                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text font-bold">To</span>
                                                    </label>
                                                    <input type="text" placeholder="date" className="input input-bordered" required />
                                                </div>
                                            </div>

                                            <div className="form-control mt-6 pb-5">
                                                <button className="btn   bg-yellow-500 text-xl">Start Booking</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sreemangal;
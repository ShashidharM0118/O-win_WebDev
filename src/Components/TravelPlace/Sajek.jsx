import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";


const Sajek = () => {
    return (
        <div>
            <div className="text-white">
                <div className="hero" style={{ backgroundImage: "url(/src/assets/images/icons/sajek1.jpg)", placeItems: 'normal' }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div>
                        <div className="px-5 lg:px-20">
                            <Navbar></Navbar>
                            <div className="flex flex-col lg:flex-row gap-20 justify-between container mx-auto py-20 lg:py-56">
                                <div className="flex flex-col lg:flex-row gap-20 justify-between px-5">
                                    <div className="flex items-center">
                                        <div>
                                            <h1 className="mb-5 text-6xl md:text-7xl lg:text-9xl font-bold">SAJEK</h1>
                                            <p className="mb-5 text-xl lg:text-2xl">Sajek is a picturesque hill station nestled in the Chittagong Hill Tracts of Bangladesh, renowned for its breathtaking natural beauty and serene landscapes. Situated in the Rangamati district, this idyllic destination is a haven for nature enthusiasts and those seeking tranquility away from the hustle and bustle of city life.

                                                The region is characterized by lush green hills, dense forests, and a cool, refreshing climate, making it a perfect retreat for visitors seeking respite from the sweltering heat of the plains. Sajek offers stunning panoramic views of valleys, meandering rivers, and quaint villages, adding to its allure.
                                            </p>
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

export default Sajek;
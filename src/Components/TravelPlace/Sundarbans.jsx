import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Sundarbans = () => {
    return (
        <div>
            <div className="text-white">
                <div className="hero" style={{ backgroundImage: 'url(https://i.ibb.co/1TprwH7/IMG-20231012-WA0017.jpg)', placeItems: 'normal' }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div>
                        <div className="px-5 lg:px-20">
                            <Navbar></Navbar>
                            <div className="flex flex-col lg:flex-row gap-20 justify-between container mx-auto py-56">
                                <div className="flex flex-col lg:flex-row gap-20 justify-between px-5">
                                    <div className="flex items-center">
                                        <div>
                                            <h1 className="mb-5 text-6xl md:text-7xl lg:text-9xl font-bold">SUNDARBANS</h1>
                                            <p className="mb-5 text-xl lg:text-2xl">The Sundarbans, a UNESCO World Heritage Site and one of the largest mangrove forests in the world, is a captivating natural wonder located in the delta region of the Padma, Meghna, and Brahmaputra river basins in Bangladesh and India. This vast and unique ecosystem is a testament to nature's extraordinary ability to thrive in diverse and challenging environments.

                                                Encompassing a vast area of over 10,000 square kilometers across both countries, the Sundarbans is characterized by its distinctive network of tidal waterways, mudflats, and dense mangrove forests. The name "Sundarbans" is derived from the dominant mangrove tree species, the Sundari (Heritiera fomes), which contributes to the region's remarkable biodiversity.
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

export default Sundarbans;
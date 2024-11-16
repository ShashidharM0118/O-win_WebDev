import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PlacesList from "./../../Components/Places/Places"; // Import the PlacesList component

const CurrTour = () => {
    const [currentPlace, setCurrentPlace] = useState("Fetching location...");
    const [errorMessage, setErrorMessage] = useState("");
    const api_key = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log("Current Coordinates:", { latitude, longitude });
                    console.log("Google Maps API Key:", import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY);

                    try {
                        const response = await fetch(
                            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${api_key}`
                        );

                        const data = await response.json();
                        if (data.status === "OK" && data.results.length > 0) {
                            setCurrentPlace(data.results[0].formatted_address);
                            console.log("Current Place Name:", data.results[0].formatted_address);
                        } else {
                            setCurrentPlace("Unable to fetch the place name.");
                            console.error("Error in API response:", data);
                        }
                    } catch (error) {
                        setCurrentPlace("Error fetching location details.");
                        console.error("Fetch Error:", error);
                    }
                },
                (error) => {
                    setErrorMessage("Permission denied or unable to access location.");
                    console.error("Geolocation Error:", error.message);
                }
            );
        } else {
            setErrorMessage("Geolocation is not supported by this browser.");
            console.error("Geolocation unsupported in this browser.");
        }
    };

    useEffect(() => {
        getCurrentLocation();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-4xl font-bold mb-8">Current Tour</h1>
            <div className="mb-8">
                <h2 className="text-2xl font-semibold">Your Current Location:</h2>
                <p className="text-xl mt-4">
                    {errorMessage ? <span className="text-red-500">{errorMessage}</span> : currentPlace}
                </p>
            </div>
            <Link to="/curr-map">
                <button className="btn bg-blue-500 text-white px-6 py-3 rounded text-xl hover:bg-blue-600">
                    View Map
                </button>
            </Link>

            {/* Render the PlacesList component */}
            <PlacesList />
        </div>
    );
};

export default CurrTour;

import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PlacesList from "./../../Components/Places/Places";
import { Context } from '../../Context/AuthContext';

const CurrTour = () => {
    const [currentPlace, setCurrentPlace] = useState("Fetching location...");
    const [errorMessage, setErrorMessage] = useState("");
    const [totalDistance, setTotalDistance] = useState(0); // Track total distance
    const [previousCoords, setPreviousCoords] = useState(null); // Track previous coordinates
    const api_key = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;
    const { user } = useContext(Context);

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log("Current Coordinates:", { latitude, longitude });

                    // Update location name using Geocoding API
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

                    // Calculate distance traveled
                    if (previousCoords) {
                        const distanceResponse = await fetch(
                            `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${previousCoords.latitude},${previousCoords.longitude}&destinations=${latitude},${longitude}&key=${api_key}`
                        );

                        const distanceData = await distanceResponse.json();
                        if (
                            distanceData.status === "OK" &&
                            distanceData.rows[0].elements[0].status === "OK"
                        ) {
                            const distance =
                                distanceData.rows[0].elements[0].distance.value / 1000; // Convert to kilometers
                            setTotalDistance((prevDistance) => prevDistance + distance);
                            console.log("Distance between points (km):", distance);
                        } else {
                            console.error("Error in Distance Matrix API response:", distanceData);
                        }
                    }

                    // Update previous coordinates
                    setPreviousCoords({ latitude, longitude });
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

    const handleViewMapClick = async () => {
        try {
            const response = await axios.post("http://localhost:3001/send-message", {
                messageBody: "happy journey",
            });

            if (response.status === 200) {
                console.log("Location sent successfully.", currentPlace);
            } else {
                console.error("Failed to send location:", response.data);
            }
        } catch (error) {
            console.error("Error sending location:", error.message);
        }
    };

    useEffect(() => {
        getCurrentLocation();
        const interval = setInterval(getCurrentLocation, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-4xl font-bold mb-8"> Hello ನಮಸ್ಕಾರ {user?.displayName}</h1>
            <div className="mb-8">
                <h2 className="text-2xl font-semibold">Your Current Location:</h2>
                <p className="text-xl mt-4">
                    {errorMessage ? <span className="text-red-500">{errorMessage}</span> : currentPlace}
                </p>
            </div>
            <div className="mb-8">
                <h2 className="text-2xl font-semibold">Total Distance Traveled:</h2>
                <p className="text-xl mt-4">{totalDistance.toFixed(2)} km</p>
            </div>
            <Link to="/curr-map">
                <button
                    className="btn bg-blue-500 text-white px-6 py-3 rounded text-xl hover:bg-blue-600"
                    onClick={handleViewMapClick}
                >
                    View Map
                </button>
            </Link>

            {/* Render the PlacesList component */}
            <PlacesList />
        </div>
    );
};

export default CurrTour;

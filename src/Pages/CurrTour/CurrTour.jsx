// CurrTour.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import PlacesList from "./../../Components/Places/Places";
import { Context } from '../../Context/AuthContext';
import "./CurrTour.css";

const CurrTour = () => {
    const [currentPlace, setCurrentPlace] = useState("Fetching location...");
    const [errorMessage, setErrorMessage] = useState("");
    const [totalDistance, setTotalDistance] = useState(0);
    const [previousCoords, setPreviousCoords] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const api_key = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;
    const { user } = useContext(Context);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    
                    try {
                        const response = await fetch(
                            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${api_key}`
                        );

                        const data = await response.json();
                        if (data.status === "OK" && data.results.length > 0) {
                            setCurrentPlace(data.results[0].formatted_address);
                        } else {
                            setCurrentPlace("Unable to fetch the place name.");
                        }
                    } catch (error) {
                        setCurrentPlace("Error fetching location details.");
                    }

                    if (previousCoords) {
                        const distanceResponse = await fetch(
                            `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${previousCoords.latitude},${previousCoords.longitude}&destinations=${latitude},${longitude}&key=${api_key}`
                        );

                        const distanceData = await distanceResponse.json();
                        if (
                            distanceData.status === "OK" &&
                            distanceData.rows[0].elements[0].status === "OK"
                        ) {
                            const distance = distanceData.rows[0].elements[0].distance.value / 1000;
                            setTotalDistance((prevDistance) => prevDistance + distance);
                        }
                    }

                    setPreviousCoords({ latitude, longitude });
                },
                (error) => {
                    setErrorMessage("Permission denied or unable to access location.");
                }
            );
        } else {
            setErrorMessage("Geolocation is not supported by this browser.");
        }
    };

    const handleViewMapClick = async () => {
        try {
            const response = await axios.post("http://localhost:3001/send-message", {
                messageBody: "happy journey",
            });
        } catch (error) {
            console.error("Error sending location:", error.message);
        }
    };

    useEffect(() => {
        getCurrentLocation();
        const interval = setInterval(getCurrentLocation, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="tour-container">
            <button 
                className="theme-toggle"
                onClick={() => setIsDarkMode(!isDarkMode)}
                aria-label="Toggle theme"
            >
                {isDarkMode ? (
                    <Sun className="theme-icon" />
                ) : (
                    <Moon className="theme-icon" />
                )}
            </button>

            <div className="content-wrapper">
                <div className="greeting-section">
                    <h1 className="greeting-text">
                        Hello ನಮಸ್ಕಾರ <span className="user-name">{user?.displayName}</span>
                    </h1>
                </div>

                <div className="info-grid">
                    <div className="info-card location-card">
                        <div className="card-content">
                            <h2 className="card-title">Your Current Location</h2>
                            <p className={`location-text ${errorMessage ? 'error' : ''}`}>
                                {errorMessage || currentPlace}
                            </p>
                        </div>
                    </div>

                    <div className="info-card distance-card">
                        <div className="card-content">
                            <h2 className="card-title">Total Distance Traveled</h2>
                            <p className="distance-text">
                                <span className="distance-number">{totalDistance.toFixed(2)}</span>
                                <span className="distance-unit">km</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="action-section">
                    <Link to="/curr-map">
                        <button
                            className="view-map-button"
                            onClick={handleViewMapClick}
                        >
                            View Map
                        </button>
                    </Link>
                </div>

                <div className="places-section">
                    <PlacesList />
                </div>
            </div>
        </div>
    );
};

export default CurrTour;
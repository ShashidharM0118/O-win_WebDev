import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HotelList.css';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [checkIn, setCheckIn] = useState('2024-11-21');
  const [checkOut, setCheckOut] = useState('2024-11-22');
  const [guests, setGuests] = useState('2 adults, 1 room');
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState(null);

  // Fetch city suggestions based on user input
  const fetchCitySuggestions = async (query) => {
    if (!query) return; // Avoid unnecessary API calls for empty input

    try {
      const url = `https://skyscanner.proxy-production.allthingsdev.co/locations/v1/cities`;
      const headers = {
        Accept: 'application/json',
        'x-apihub-key': 'kwEjQgjrGdVgrxKlcQd4iGSEvGlghlIyA8lcHEZFnTpBngKNQC',
        'x-apihub-host': 'Skyscanner.allthingsdev.co',
      };
      const params = { query };

      const response = await axios.get(url, { params, headers });
      
      // Check if the response contains city data
      const locations = response.data.locations || [];
      const cityList = locations.map((location) => ({
        id: location.cityId,
        name: location.cityName,
      }));

      setCitySuggestions(cityList);
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      setCitySuggestions([]);
    }
  };

  // Fetch hotels for the selected city
  const fetchHotels = async () => {
    setLoading(true);
    setError(null);
    setHotels([]);

    // Validation for inputs
    if (!selectedCityId || !checkIn || !checkOut) {
      setError('Please select a city, check-in, and check-out date.');
      setLoading(false);
      return;
    }

    try {
      const url = 'https://skyscanner.proxy-production.allthingsdev.co/search-hotel';
      const params = {
        locationId: selectedCityId,
        checkin: checkIn,
        checkout: checkOut,
        adults: 2,
        rooms: 1,
        currency: 'USD',
        market: 'US',
        locale: 'en-US',
        sortBy: 'price',
      };
      const headers = {
        Accept: 'application/json',
        'x-apihub-key': 'kwEjQgjrGdVgrxKlcQd4iGSEvGlghlIyA8lcHEZFnTpBngKNQC',
        'x-apihub-host': 'Skyscanner.allthingsdev.co',
      };

      const response = await axios.get(url, { params, headers });
      setHotels(response.data.hotels || []);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      setError('Failed to fetch hotels. Please try again.');
    }
    setLoading(false);
  };

  const handleCitySelection = (city) => {
    setSelectedCity(city.name);
    setSelectedCityId(city.id);
    setCitySuggestions([]);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="hotel-list-container">
      <div className="search-bar">
        {/* City Search Input */}
        <input
          type="text"
          placeholder="Search city"
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
            fetchCitySuggestions(e.target.value);
          }}
        />
        
        {/* Suggestions List */}
        {citySuggestions.length > 0 && (
          <div className="suggestions-list">
            {citySuggestions.map((city) => (
              <div
                key={city.id}
                className="suggestion-item"
                onClick={() => handleCitySelection(city)}
              >
                {city.name}
              </div>
            ))}
          </div>
        )}

        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
        <button onClick={fetchHotels}>Search Hotels</button>
      </div>

      <div className="hotel-list">
        {hotels.map((hotel, index) => (
          <div key={index} className="hotel-card">
            <h3>{hotel.name || 'No Name Available'}</h3>
            <p>Price: {hotel.price || 'Not Available'}</p>
            <a href={hotel.bookingUrl} target="_blank" rel="noopener noreferrer">
              Book Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;

import React, { useEffect, useState } from "react";
import axios from "axios";

const GeocodeComponent = ({ lat, lng }) => {
  const [address, setAddress] = useState("");

  const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY; // Replace with your Google Maps API key

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
        );
        const results = response.data.results;
        if (results.length > 0) {
          setAddress(results[0].formatted_address);
        } else {
          setAddress("Address not found");
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        setAddress("Error fetching address");
      }
    };

    if (lat && lng) {
      fetchAddress();
    }
  }, [lat, lng, apiKey]);

  return (
    <div>
      <h3>Address for Provided Coordinates</h3>
      {address ? <p>Address: {address}</p> : <p>Loading...</p>}
    </div>
  );
};

export default GeocodeComponent;

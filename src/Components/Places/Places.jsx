import React, { useEffect, useState } from "react";
import { MapPin, CheckCircle, Clock, Utensils } from "lucide-react";

const PlacesList = () => {
  const [locations, setLocations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [otherLocations, setOtherLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const api_key = "AIzaSyCH582J8KurpHix2JMAYtitxDfc-ANbvVk";

  // Famous dishes data
  const famousDishes = {
    "McDonald's": ["Big Mac", "McFlurry", "French Fries"],
    "Pizza Hut": ["Pepperoni Pizza", "Stuffed Crust", "Supreme"],
    "Starbucks": ["Frappuccino", "Pumpkin Spice Latte", "Cold Brew"],
    "Subway": ["Italian BMT", "Meatball Marinara", "Chicken Teriyaki"],
  };

  const getPlaceName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${api_key}`
      );
      const data = await response.json();
      
      if (data.results && data.results[0]) {
        const place = data.results[0].address_components.find(
          component => component.types.includes('point_of_interest') ||
                      component.types.includes('establishment')
        );
        
        return place ? place.long_name : data.results[0].formatted_address;
      }
      return "Unknown Location";
    } catch (error) {
      console.error("Error fetching place name:", error);
      return "Unknown Location";
    }
  };

  useEffect(() => {
    const fetchLocationsData = async () => {
      setIsLoading(true);
      try {
        const storedLocations = JSON.parse(localStorage.getItem("curr_destination")) || [];
        
        const locationsWithNames = await Promise.all(
          storedLocations.map(async (location) => ({
            ...location,
            name: await getPlaceName(location.latitude, location.longitude)
          }))
        );

        setLocations(locationsWithNames);
        
        const restaurants = locationsWithNames.filter(location => 
          Object.keys(famousDishes).some(restaurant => 
            location.name.toLowerCase().includes(restaurant.toLowerCase())
          )
        );
        const others = locationsWithNames.filter(location => 
          !Object.keys(famousDishes).some(restaurant => 
            location.name.toLowerCase().includes(restaurant.toLowerCase())
          )
        );

        setRestaurants(restaurants);
        setOtherLocations(others);
      } catch (error) {
        console.error("Error loading locations:", error);
      }
      setIsLoading(false);
    };

    fetchLocationsData();
  }, []);

  const getFamousDishes = (locationName) => {
    const restaurant = Object.keys(famousDishes).find(
      name => locationName.toLowerCase().includes(name.toLowerCase())
    );
    return famousDishes[restaurant] || ["Menu information not available"];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <MapPin className="h-6 w-6 text-blue-500" />
        Your Travel Itinerary
      </h1>

      {restaurants.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Utensils className="h-5 w-5 text-orange-500" />
            Restaurants to Visit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {restaurants.map((location, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-orange-50 px-4 py-3">
                  <h3 className="text-lg font-semibold">{location.name}</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {location.flag ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-yellow-500" />
                      )}
                      <span className={`text-sm ${location.flag ? 'text-green-600' : 'text-yellow-600'}`}>
                        {location.flag ? 'Visited' : 'Yet to visit'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Famous Dishes:</strong>
                      <ul className="ml-4 mt-1 list-disc">
                        {getFamousDishes(location.name).map((dish, i) => (
                          <li key={i}>{dish}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {otherLocations.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            Other Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherLocations.map((location, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-blue-50 px-4 py-3">
                  <h3 className="text-lg font-semibold">{location.name}</h3>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    {location.flag ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-yellow-500" />
                    )}
                    <span className={`text-sm ${location.flag ? 'text-green-600' : 'text-yellow-600'}`}>
                      {location.flag ? 'Visited' : 'Yet to visit'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {locations.length === 0 && (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No locations added to your itinerary yet.</p>
        </div>
      )}
    </div>
  );
};

export default PlacesList;
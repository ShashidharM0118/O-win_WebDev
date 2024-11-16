import React, { useEffect, useState } from "react";
import { 
  GoogleMap, 
  LoadScript, 
  Marker, 
  InfoWindow,
  DirectionsRenderer,
  DirectionsService 
} from "@react-google-maps/api";
import { Utensils, Star, MapPin, Navigation, X, Plus, RotateCcw } from "lucide-react";

const RouteMap = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [placesData, setPlacesData] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [directions, setDirections] = useState(null);
  const [placeType, setPlaceType] = useState("restaurant");
  const [isCalculating, setIsCalculating] = useState(false);
  const [currDestination, setCurrDestination] = useState([]);

  const api_key = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;



  // Load curr_destination from localStorage on component mount
 useEffect(() => {
    const loadSavedDestinations = () => {
      const savedDestinations = localStorage.getItem('curr_destination');
      if (savedDestinations && window.google && window.google.maps) {
        const parsedDestinations = JSON.parse(savedDestinations);
        setCurrDestination(parsedDestinations);
        
        // Reconstruct selectedLocations from saved destinations
        if (parsedDestinations.length > 0) {
          const reconstructedLocations = parsedDestinations.map(dest => ({
            geometry: {
              location: new window.google.maps.LatLng(dest.latitude, dest.longitude)
            },
            place_id: `place_${dest.latitude}_${dest.longitude}`,
            name: `Location at (${dest.latitude}, ${dest.longitude})`
          }));
          setSelectedLocations(reconstructedLocations);
        }
      }
    };

    if (googleMapsLoaded) {
        loadSavedDestinations();
      }
    }, [googleMapsLoaded]);

  const placeTypes = [
    { value: "restaurant", label: "Restaurants" },
    { value: "tourist_attraction", label: "Tourist Attractions" },
    { value: "museum", label: "Museums" },
    { value: "historic", label: "Historic Sites" },
    { value: "park", label: "Parks" },
    { value: "shopping_mall", label: "Shopping" }
  ];

  useEffect(() => {
    if (window.google) {
      setGoogleMapsLoaded(true);
    }
  }, []);


  useEffect(() => {
    const checkGoogleMapsLoaded = () => {
      if (window.google && window.google.maps) {
        setGoogleMapsLoaded(true);
      }
    };

    // Check immediately
    checkGoogleMapsLoaded();

    // Set up an interval to check until Google Maps is loaded
    const interval = setInterval(() => {
      if (window.google && window.google.maps) {
        setGoogleMapsLoaded(true);
        clearInterval(interval);
      }
    }, 100);

    // Cleanup
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (googleMapsLoaded && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(location);
          fetchNearbyPlaces(location);
        },
        () => {
          alert("Geolocation failed. Please enable location services.");
        }
      );
    }
  }, [googleMapsLoaded, placeType]);

  const fetchNearbyPlaces = async (location) => {
    if (window.google && window.google.maps && window.google.maps.places) {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );
      service.nearbySearch(
        {
          location,
          radius: 5000,
          type: placeType,
        },
        (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const enhancedResults = results.map(place => ({
              ...place,
              description: getPlaceDescription(place.types),
              highlights: getPlaceHighlights(place.types),
              priceRange: place.price_level ? "$".repeat(place.price_level) : "N/A",
              rating: place.rating || Math.floor(Math.random() * 2) + 3,
            }));
            setPlacesData(enhancedResults);
          }
        }
      );
    }
  };

  const getPlaceDescription = (types) => {
    const descriptions = {
      restaurant: "Local cuisine and dining",
      tourist_attraction: "Popular tourist destination",
      museum: "Cultural exhibits and artifacts",
      historic: "Historical significance",
      park: "Natural recreation area",
      shopping_mall: "Retail shopping center"
    };
    
    return types.map(type => descriptions[type]).filter(Boolean)[0] || "Interesting location";
  };

  const getPlaceHighlights = (types) => {
    const highlights = {
      restaurant: ["Local Cuisine", "Dining Experience", "Authentic Flavors"],
      tourist_attraction: ["Must Visit", "Popular Spot", "Photo Opportunity"],
      museum: ["Cultural Experience", "Educational", "Art & History"],
      historic: ["Heritage Site", "Historical Value", "Cultural Significance"],
      park: ["Nature", "Recreation", "Outdoor Activities"],
      shopping_mall: ["Shopping", "Entertainment", "Dining Options"]
    };
    
    return types.map(type => highlights[type]).filter(Boolean)[0] || ["Interesting Place"];
  };

  const addToRoute = (place) => {
    if (!selectedLocations.find(loc => loc.place_id === place.place_id)) {
      const newLocations = [...selectedLocations, place];
      setSelectedLocations(newLocations);
      
      // Add to currDestination
      const newDestination = {
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
        flag: false
      };
      const updatedDestinations = [...currDestination, newDestination];
      setCurrDestination(updatedDestinations);
      localStorage.setItem('curr_destination', JSON.stringify(updatedDestinations));
    }
  };

  const removeFromRoute = (placeId) => {
    const locationToRemove = selectedLocations.find(loc => loc.place_id === placeId);
    if (locationToRemove) {
      // Remove from currDestination
      const updatedDestinations = currDestination.filter(dest => 
        dest.latitude !== locationToRemove.geometry.location.lat() ||
        dest.longitude !== locationToRemove.geometry.location.lng()
      );
      setCurrDestination(updatedDestinations);
      localStorage.setItem('curr_destination', JSON.stringify(updatedDestinations));
    }
    const newLocations = selectedLocations.filter(loc => loc.place_id !== placeId);
    setSelectedLocations(newLocations);
  };

  const calculateOptimalRoute = () => {
    if (selectedLocations.length === 0) {
      alert("Please select at least one location for your route.");
      return;
    }

    setIsCalculating(true);

    const directionsService = new window.google.maps.DirectionsService();

    const waypoints = selectedLocations.map(location => ({
      location: location.geometry.location,
      stopover: true
    }));

    const origin = currentLocation;
    const destination = currentLocation; 

    directionsService.route(
      {
        origin,
        destination,
        waypoints,
        optimizeWaypoints: true,
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        setIsCalculating(false);
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          const optimizedOrder = result.routes[0].waypoint_order;
          
          // Reorder both selectedLocations and currDestination
          const reorderedLocations = optimizedOrder.map(index => selectedLocations[index]);
          setSelectedLocations(reorderedLocations);
          
          const reorderedDestinations = optimizedOrder.map(index => currDestination[index]);
          setCurrDestination(reorderedDestinations);
          localStorage.setItem('curr_destination', JSON.stringify(reorderedDestinations));
        } else {
          alert("Could not calculate directions. Please try again.");
        }
      }
    );
  };

  const resetRoute = () => {
    setSelectedLocations([]);
    setDirections(null);
    setCurrDestination([]);
    localStorage.removeItem('curr_destination');
  };

  return (
    <div className="flex h-screen max-h-[800px] gap-4 p-4">
      <div className="w-1/3 flex flex-col bg-white rounded-lg shadow-lg">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 font-bold text-lg">
              <MapPin className="h-5 w-5" />
              Explore Places
            </div>
            <select 
              className="px-2 py-1 border rounded"
              value={placeType}
              onChange={(e) => setPlaceType(e.target.value)}
            >
              {placeTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          {selectedLocations.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Your Route</h3>
                <div className="flex gap-2">
                  <button
                    onClick={calculateOptimalRoute}
                    disabled={isCalculating}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm flex items-center gap-1 hover:bg-blue-600"
                  >
                    <Navigation className="h-4 w-4" />
                    {isCalculating ? "Calculating..." : "Optimize Route"}
                  </button>
                  <button
                    onClick={resetRoute}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm flex items-center gap-1 hover:bg-gray-300"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {selectedLocations.map((location, index) => (
                  <div key={location.place_id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm flex items-center gap-2">
                      <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                        {index + 1}
                      </span>
                      {location.name}
                    </span>
                    <button
                      onClick={() => removeFromRoute(location.place_id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-auto">
          <div className="p-4 space-y-4">
            {placesData.map((place) => (
              <div
                key={place.place_id}
                className={`cursor-pointer p-4 rounded-lg border transition-all hover:shadow-md ${
                  selectedPlace === place ? 'border-blue-500 shadow-md' : 'border-gray-200'
                }`}
                onClick={() => setSelectedPlace(place)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{place.name}</h3>
                  <div className="flex gap-2">
                    {place.priceRange !== "N/A" && (
                      <span className="text-gray-600">{place.priceRange}</span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToRoute(place);
                      }}
                      className="p-1 text-blue-500 hover:bg-blue-50 rounded"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{place.rating.toFixed(1)}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{place.description}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {place.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden">
        <LoadScript googleMapsApiKey={api_key} libraries={["places"]}>
          {currentLocation && (
            <GoogleMap
              center={currentLocation}
              zoom={14}
              mapContainerClassName="w-full h-full"
              mapContainerStyle={{ height: "100%", width: "100%" }}
            >
              <Marker
                position={currentLocation}
                icon={{
                  url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='32' height='32' fill='%234F46E5'%3E%3Ccircle cx='12' cy='12' r='8'/%3E%3C/svg%3E",
                  scaledSize: new window.google.maps.Size(16, 16),
                }}
                title="You are here!"
              />

              {directions === null && placesData.map((place) => (
                <Marker
                  key={place.place_id}
                  position={place.geometry.location}
                  onClick={() => setSelectedPlace(place)}
                  icon={{
                    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='32' height='32' fill='%23EF4444'%3E%3Cpath d='M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z'/%3E%3C/svg%3E",
                    scaledSize: new window.google.maps.Size(32, 32),
                  }}
                />
              ))}

              {selectedPlace && (
                <InfoWindow
                  position={selectedPlace.geometry.location}
                  onCloseClick={() => setSelectedPlace(null)}
                >
                  <div className="p-2 max-w-xs">
                    <h3 className="font-semibold">{selectedPlace.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm">{selectedPlace.rating.toFixed(1)}</span>
                      {selectedPlace.priceRange !== "N/A" && (
                        <span className="text-sm text-gray-500 ml-2">
                          {selectedPlace.priceRange}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedPlace.description}
                    </p>
                    <button
                      onClick={() => addToRoute(selectedPlace)}
                      className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md text-sm flex items-center gap-1 hover:bg-blue-600"
                    >
                      <Plus className="h-4 w-4" />
                      Add to Route
                    </button>
                  </div>
                </InfoWindow>
              )}

              {/* Directions Renderer */}
              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  options={{
                    suppressMarkers: false,
                    polylineOptions: {
                      strokeColor: "#4F46E5",
                      strokeWeight: 5,
                    },
                  }}
                />
              )}
            </GoogleMap>
          )}
        </LoadScript>
      </div>
    </div>
  );
};

export default RouteMap;
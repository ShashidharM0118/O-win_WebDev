import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { MapPin, Navigation, History, Star, Bookmark } from 'lucide-react';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPredictions, setShowPredictions] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [bookmarkedPlaces, setBookmarkedPlaces] = useState(new Set());
  const [nearbyPlaces, setNearbyPlaces] = useState({
    restaurants: [],
    attractions: [],
    museums: [],
    parks: []
  });
  const searchRef = useRef(null);
  const autocompleteService = useRef(null);
  const placesService = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);

  useEffect(() => {
    // Initialize Google Maps and Services
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeServices;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeServices = () => {
    map.current = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 40.7128, lng: -74.0060 },
      zoom: 13,
    });

    autocompleteService.current = new window.google.maps.places.AutocompleteService();
    placesService.current = new window.google.maps.places.PlacesService(map.current);
  };

  const toggleBookmark = (place) => {
    setBookmarkedPlaces(prev => {
        console.log(place);
        const placeId = place.place_id;
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(placeId)) {
        newBookmarks.delete(placeId);
        // Remove from localStorage
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        const updatedBookmarks = bookmarks.filter(item => item.placeId !== placeId);
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      } else {
        newBookmarks.add(placeId);
        // Add to localStorage
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        bookmarks.push({
          placeId: placeId,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          name: place.name,
          open : place.opening_hours,
          type: place.types
        });
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      }
  
      // Log the bookmarks to the console
      const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
      console.log("Bookmarked Places:", storedBookmarks);
  
      return newBookmarks;
    });
  };
  

  const clearMarkers = () => {
    markers.current.forEach(marker => marker.setMap(null));
    markers.current = [];
  };

  const addMarker = (place, icon) => {
    const marker = new window.google.maps.Marker({
      position: place.geometry.location,
      map: map.current,
      title: place.name,
      icon: icon ? {
        url: icon,
        scaledSize: new window.google.maps.Size(32, 32)
      } : undefined
    });

    const infowindow = new window.google.maps.InfoWindow({
      content: `
        <div class="p-2">
          <h3 class="font-bold">${place.name}</h3>
          <p class="text-sm">${place.vicinity || place.formatted_address || ''}</p>
          ${place.rating ? `<p class="text-sm">Rating: ${place.rating} ⭐</p>` : ''}
        </div>
      `
    });

    marker.addListener('click', () => {
      infowindow.open(map.current, marker);
    });

    markers.current.push(marker);
    return marker;
  };

  const searchNearbyPlaces = (location) => {
    clearMarkers();

    const categories = [
      { type: 'restaurant', collection: 'restaurants', icon: '🍽️' },
      { type: 'tourist_attraction', collection: 'attractions', icon: '🏛️' },
      { type: 'museum', collection: 'museums', icon: '🏛️' },
      { type: 'park', collection: 'parks', icon: '🌳' }
    ];

    categories.forEach(({ type, collection, icon }) => {
      const request = {
        location: location,
        radius: '2000',
        type: type
      };

      placesService.current.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setNearbyPlaces(prev => ({
            ...prev,
            [collection]: results.slice(0, 5)
          }));

          results.slice(0, 5).forEach(place => {
            addMarker(place, icon);
          });
        }
      });
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue && autocompleteService.current) {
        fetchPredictions();
      } else {
        setPredictions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const fetchPredictions = () => {
    setIsLoading(true);
    const request = {
      input: searchValue,
      types: ['geocode', 'establishment'],
    };

    autocompleteService.current.getPlacePredictions(request, (results, status) => {
      setIsLoading(false);
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        setPredictions(results);
        setShowPredictions(true);
      } else {
        setPredictions([]);
      }
    });
  };

  const handlePredictionSelect = (placeId) => {
    const request = {
      placeId: placeId,
      fields: ['name', 'geometry', 'formatted_address', 'rating', 'photos', 'types']
    };

    placesService.current.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setSearchValue(place.formatted_address);
        setShowPredictions(false);
        setSelectedPlace(place);
        
        map.current.setCenter(place.geometry.location);
        map.current.setZoom(15);
        
        clearMarkers();
        addMarker(place);
        
        searchNearbyPlaces(place.geometry.location);
      }
    });
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 h-full bg-white shadow-lg z-10 overflow-y-auto">
        <div className="p-4">
          <div className="relative" ref={searchRef}>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search for a location..."
              className="w-full px-4 py-3 pl-12 text-gray-900 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-400" />
            </div>
            {isLoading && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <div className="w-5 h-5 border-t-2 border-blue-500 rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {showPredictions && predictions.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border">
              {predictions.map((prediction) => (
                <div
                  key={prediction.place_id}
                  onClick={() => handlePredictionSelect(prediction.place_id)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                >
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-900">{prediction.structured_formatting.main_text}</div>
                    <div className="text-xs text-gray-500">{prediction.structured_formatting.secondary_text}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedPlace && (
          <div className="p-4">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Nearby Places</h2>
              
              {Object.entries(nearbyPlaces).map(([category, places]) => (
                <div key={category} className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    {category === 'restaurants' && <Navigation className="w-4 h-4 mr-2" />}
                    {category === 'attractions' && <History className="w-4 h-4 mr-2" />}
                    {category === 'museums' && <History className="w-4 h-4 mr-2" />}
                    {category === 'parks' && <MapPin className="w-4 h-4 mr-2" />}
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>
                  {places.map(place => (
                    <div
                      key={place.place_id}
                      className="p-2 hover:bg-gray-100 rounded cursor-pointer flex justify-between items-center"
                    >
                      <div
                        className="flex-1"
                        onClick={() => {
                          map.current.setCenter(place.geometry.location);
                          map.current.setZoom(17);
                        }}
                      >
                        <div className="font-medium">{place.name}</div>
                        {place.rating && (
                          <div className="text-sm text-gray-600 flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-400" />
                            {place.rating}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(place);
                        }}
                        className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                          bookmarkedPlaces.has(place.place_id) ? 'text-green-500' : 'text-gray-400'
                        }`}
                      >
                        <Bookmark className="w-5 h-5" fill={bookmarkedPlaces.has(place.place_id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div id="map" className="flex-1"></div>
    </div>
  );
};

export default Search;
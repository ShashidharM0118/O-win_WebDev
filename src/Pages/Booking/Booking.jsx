import React, { useState } from "react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

const cities = [
  { code: 'DEL', name: 'Delhi' },
  { code: 'BLR', name: 'Bengaluru' },
  { code: 'BOM', name: 'Mumbai' },
  { code: 'MAA', name: 'Chennai' },
  { code: 'CCU', name: 'Kolkata' },
  { code: 'HYD', name: 'Hyderabad' },
  { code: 'CTGOI', name: 'Goa' }, // Adding Goa for hotel booking
];

const Booking = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [hotelLocation, setHotelLocation] = useState('');

  const handleFlightSubmit = (e) => {
    e.preventDefault();
    
    // Format date to DD/MM/YYYY
    const formattedDate = date.split('-').reverse().join('/');

    // Construct URL with parameters for flight booking
    const baseUrl = 'https://www.makemytrip.com/flight/search';
    const params = new URLSearchParams({
      itinerary: `${source}-${destination}-${formattedDate}`,
      tripType: 'O',
      paxType: 'A-1_C-0_I-0',
      intl: 'false',
      cabinClass: 'E',
      ccde: 'IN',
      lang: 'eng'
    });

    window.location.href = `${baseUrl}?${params}`;
  };

  const handleHotelSubmit = (e) => {
    e.preventDefault();

    if (!hotelLocation) return;

    // Construct URL for hotel booking
    const checkInDate = '11182024'; // Placeholder check-in date (can be dynamic)
    const checkOutDate = '11192024'; // Placeholder check-out date (can be dynamic)
    const baseUrl = 'https://www.makemytrip.com/hotels/hotel-listing/';
    const params = new URLSearchParams({
      checkin: checkInDate,
      checkout: checkOutDate,
      roomStayQualifier: '2e0e',
      locusId: hotelLocation,
      country: 'IN',
      locusType: 'city',
      searchText: cities.find(city => city.code === hotelLocation)?.name || '',
      regionNearByExp: '3',
      rsc: '1e2e0e'
    });

    window.location.href = `${baseUrl}?${params}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-center text-gray-800">Book Your Flight and Hotel</h1>
        </div>
        <div className="p-6">
          <form onSubmit={handleFlightSubmit} className="space-y-6">
            {/* Flight Booking Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Source City */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  From
                </label>
                <select 
                  required
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select source city</option>
                  {cities.map(city => (
                    <option key={city.code} value={city.code}>
                      {city.name} ({city.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Destination City */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  To
                </label>
                <select
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select destination city</option>
                  {cities.map(city => (
                    <option key={city.code} value={city.code}>
                      {city.name} ({city.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Travel Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Submit Button for Flights */}
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 font-medium"
            >
              Search Flights
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Hotel Booking Section */}
          <form onSubmit={handleHotelSubmit} className="space-y-6 mt-10">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Hotel Location
              </label>
              <select
                required
                value={hotelLocation}
                onChange={(e) => setHotelLocation(e.target.value)}
                className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Select hotel location</option>
                {cities.map(city => (
                  <option key={city.code} value={city.code}>
                    {city.name} ({city.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button for Hotels */}
            <button 
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 font-medium"
            >
              Book Hotel
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;

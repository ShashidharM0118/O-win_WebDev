import React, { useState } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';

const mapContainerStyle = {
  height: "300px",
  width: "100%",
  borderRadius: "1rem"
};

const LuxePostCard = ({ post, user }) => {
  const [isHovered, setIsHovered] = useState(false);

  const renderStars = (rating) => {
    const stars = [];
    const numRating = Number(rating) || 0;
    
    for (let i = 1; i <= 5; i++) {
      if (numRating >= i) {
        stars.push(
          <span key={i} className="text-amber-400 transform transition-transform duration-200 hover:scale-110">
            ★
          </span>
        );
      } else if (numRating > i - 1 && numRating < i) {
        stars.push(
          <span key={i} className="text-amber-400 transform transition-transform duration-200 hover:scale-110">
            ⯨
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-amber-400 transform transition-transform duration-200 hover:scale-110">
            ☆
          </span>
        );
      }
    }
    return stars;
  };

  const renderMap = (location) => {
    if (!location || 
        typeof location.lat !== 'number' || 
        typeof location.lng !== 'number' || 
        isNaN(location.lat) || 
        isNaN(location.lng)) {
      return null;
    }

    return (
      <LoadScript googleMapsApiKey={import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={location}
          zoom={10}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-red-500 rounded-full border-2 border-white shadow-lg" />
        </GoogleMap>
      </LoadScript>
    );
  };

  const formatCoordinates = (location) => {
    if (!location || typeof location.lat !== 'number' || typeof location.lng !== 'number') {
      return null;
    }
    return `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`;
  };

  return (
    <div 
      className="relative max-w-2xl mx-auto my-8 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-white/40 backdrop-blur-md rounded-3xl shadow-2xl transform transition-transform duration-300 group-hover:scale-[1.02]" />
      
      {/* Animated Border */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
      
      {/* Content Container */}
      <div className="relative p-8 backdrop-blur-sm">
        {/* Header Section */}
        <div className="flex items-center space-x-4 mb-6">
          {/* Profile Image with Ring Animation */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white">
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-semibold">
                  {user?.displayName?.charAt(0) || 'A'}
                </div>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 text-lg tracking-wide">
              {user?.displayName || "Anonymous"}
            </h3>
            <p className="text-sm text-gray-500 font-medium">
              {post.uploadedTime
                ? formatDistanceToNow(post.uploadedTime.toDate(), { addSuffix: true })
                : "Loading..."}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1 text-lg">
            {renderStars(post.rating)}
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          {/* Text Content with Gradient Selection */}
          <p className="text-gray-700 leading-relaxed selection:bg-pink-500/20">
            {post.comment}
          </p>

          {/* Media Section */}
          {(post.image || post.video) && (
            <div className="rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-[1.02]">
              {post.image && (
                <img
                  src={post.image}
                  alt="Post visual"
                  className="w-full h-auto object-cover"
                />
              )}
              {post.video && (
                <video 
                  controls 
                  className="w-full h-auto"
                >
                  <source src={post.video} type="video/mp4" />
                </video>
              )}
            </div>
          )}

          {/* Location Section */}
          {formatCoordinates(post.location) && (
            <div className="space-y-3">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-6" />
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <svg 
                  className="w-5 h-5 mr-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="font-medium">{formatCoordinates(post.location)}</span>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-[1.02]">
                {renderMap(post.location)}
              </div>
            </div>
          )}
        </div>

        {/* Interaction Buttons */}
        <div className="flex items-center justify-end space-x-4 mt-6">
          <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-sm font-medium">Like</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-sm font-medium">Comment</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LuxePostCard;
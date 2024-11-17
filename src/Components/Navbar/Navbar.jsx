import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Context } from "../../Context/AuthContext";
import { db } from "../../firebase/firebase.config";
import ThemeToggle from "../ThemeToggle/ThemeToggle.jsx";
import ProfileLogo from "../ProfileLogo/ProfileLogo.jsx";
import { Search } from 'lucide-react';
import logo from "../../assets/logo.png";  // Added the logo import

export const Navbar = () => {
  const { user } = useContext(Context);
  const auth = getAuth();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (user?.email) {
      const fetchUserId = async () => {
        try {
          const q = query(collection(db, "users"), where("email", "==", user.email));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            setUserId(userData._id);
          }
        } catch (error) {
          console.error("Error fetching user ID:", error);
        }
      };
      fetchUserId();
    }
  }, [user]);

  const handleProfileClick = () => {
    if (userId) {
      navigate(`/userprofile/${userId}`);
    } else {
      console.error("User ID not found");
    }
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="navbar h-20 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Logo"
                className="w-[140px] h-[80px] object-contain hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          {/* Search Bar Section */}
          <div className="hidden md:flex items-center flex-1 justify-center max-w-xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                className="w-full bg-gray-100 dark:bg-gray-800 border-2 border-transparent 
                         rounded-full py-2 px-4 pl-12 transition-all duration-300
                         focus:border-yellow-500 focus:outline-none
                         hover:border-gray-300 dark:hover:border-gray-700"
                placeholder="Search Your Destination..."
                onClick={() => navigate("/search")}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Navigation Section */}
          <div className="flex items-center gap-6">
            <NavLink 
              to="/blogs"
              className={({ isActive }) => 
                `text-base font-medium transition-colors duration-200 hover:text-yellow-500
                ${isActive ? 'text-yellow-500' : 'text-gray-700 dark:text-gray-200'}`
              }
            >
              Blogs
            </NavLink>

            {/* Auth Section */}
            <div className="flex items-center gap-4">
              {user ? (
                <button 
                  onClick={handleProfileClick}
                  className="relative group"
                >
                  <div className="overflow-hidden rounded-full transition-transform duration-300 transform hover:scale-110">
                    <ProfileLogo />
                  </div>
                </button>
              ) : (
                <Link to="/login">
                  <button className="px-6 py-2 rounded-full bg-yellow-500 hover:bg-yellow-600 
                                   text-white font-medium transition-all duration-300 
                                   transform hover:scale-105 hover:shadow-lg">
                    Login
                  </button>
                </Link>
              )}
              <div className="border-l border-gray-200 dark:border-gray-700 h-6 mx-2" />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
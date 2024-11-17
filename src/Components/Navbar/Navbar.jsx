import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "../ThemeToggle/ThemeToggle.jsx";
import ProfileLogo from "../ProfileLogo/ProfileLogo.jsx";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import { Context } from "../../Context/AuthContext";
import { getAuth } from "firebase/auth";
import { useContext, useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import "./Navbar.css";

export const Navbar = () => {
  const { user } = useContext(Context);
  const auth = getAuth();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      const fetchUserId = async () => {
        try {
          const q = query(collection(db, "users"), where("email", "==", user.email));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            setUserId(userData._id); // use `_id` to get the user ID from the data
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

  const navLink = (
    <>
      <li>
        <NavLink to="/blogs">Blogs</NavLink>
      </li>
    </>
  );

  return (
    <div className="container mx-auto px-4">
      <div className="navbar flex justify-between items-center">
        {/* Logo Section */}
        <div className="navbar-start flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-[175px] h-[100px] object-contain"
          />
        </div>

        {/* Search Bar Section */}
        <div className="navbar-center relative hidden md:flex items-center">
        <input
            type="text"
            className="bg-transparent border-2 rounded-lg p-2 w-10 md:w-56 lg:w-80 search-bar"
            placeholder="Search Your Destination..."
            onClick={() => navigate("/search")}
        />
        <button 
            className="absolute top-1/2 transform -translate-y-1/2 right-3 search-icon"
            aria-label="Search"
        >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
            </svg>
        </button>
        </div>


        {/* Navigation Section */}
        <div className="navbar-end flex items-center gap-6">
          <ul className="flex gap-4">{navLink}</ul>
          {user ? (
            <button onClick={handleProfileClick}>
              <ProfileLogo />
            </button>
          ) : (
            <Link to="/login">
              <button className="btn bg-yellow-500 border-none">Login</button>
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

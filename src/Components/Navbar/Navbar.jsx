import { Link, NavLink } from 'react-router-dom';
import { FaPersonWalkingLuggage } from 'react-icons/fa6';
import ThemeToggle from "../ThemeToggle/ThemeToggle.jsx"
import ProfileLogo from '../ProfileLogo/ProfileLogo';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import { Context } from '../../Context/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import React, { useContext, useState, useEffect } from 'react';

const Navbar = () => {
    const { user, setUser } = useContext(Context);
    const auth = getAuth();
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
  useEffect(() => {
    if (user && user.email) {
      const fetchUserId = async () => {
        try {
          const q = query(collection(db, 'users'), where('email', '==', user.email));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            setUserId(userData._id); // use `_id` to get the user ID from the data
          }
        } catch (error) {
          console.error('Error fetching user ID:', error);
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
    const navLink = <>
        <li>
            <NavLink to='/'>Home</NavLink>
        </li>
        <li>
            <NavLink to='/destination'>Destination</NavLink>
        </li>
        <li>
            <NavLink to='/blog'>Blogs</NavLink>
        </li>
        <li>
            <NavLink to='/contact'>Contact</NavLink>
        </li>
    </>

    return (
        <div className="container mx-auto">
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="dropdown-content mt-3 bg-white rounded-2xl p-5 text-black z-[1] shadow w-52">
                            {navLink}
                        </ul>
                    </div>
                    <div className='flex gap-2'>
                        <div>
                            <FaPersonWalkingLuggage className='text-5xl'></FaPersonWalkingLuggage>
                        </div>
                        <div className='flex items-center'>
                            <p>Travel <br /> Service</p>
                        </div>
                    </div>
                </div>
                <div className="navbar-end md:navbar-end lg:navbar-center relative">
                    <input type="text" className='bg-transparent border-2 rounded-lg p-2 w-10 md:w-56 lg:w-80' placeholder="Search Your destination..." />
                    <button className="absolute right-20 md:right-20 lg:right-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                    

                    <Link to='/login' className='lg:hidden'>
                        <button className='btn bg-yellow-500 border-none ml-4'>Login</button>
                    </Link>
                </div>

                <div className="navbar-end hidden lg:flex">
                    <ul className="flex gap-6 px-1 ml-5">
                        {navLink}
                    </ul>
                    <Link to='/login'>
                        <button className='btn bg-yellow-500 border-none ml-5'>Login</button>
                    </Link>
                    <div className='flex-none'>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../Context/AuthContext';
import { getAuth, signOut } from 'firebase/auth'; // Assuming you have AuthContext configured
import { db } from '../../firebase/firebase.config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './ProfileLogo.css'; // Importing the CSS file

function ProfileLogo() {
    const { user } = useContext(Context); // Assuming setUser is provided by AuthContext
    const auth = getAuth(); // Initialize Firebase auth
    const [profileImageUrl, setProfileImageUrl] = useState('');

    // Function to store image in local storage
    const storeImageInLocalStorage = (imageUrl) => {
        localStorage.setItem('profileImageUrl', imageUrl);
    };

    // Function to get image from local storage
    const getImageFromLocalStorage = () => {
        return localStorage.getItem('profileImageUrl');
    };

    useEffect(() => {
        const fetchProfileImage = async () => {
            // Check local storage first
            const storedImageUrl = getImageFromLocalStorage();
            if (storedImageUrl) {
                setProfileImageUrl(storedImageUrl);
            }

            if (user && user.email) {
                const q = query(collection(db, 'users'), where('email', '==', user.email));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const userData = querySnapshot.docs[0].data();
                    const photoURL = userData.photoURL; // Extract the photoURL
                    
                    // Check if the photoURL from Firestore is different from the stored one
                    if (photoURL && photoURL !== storedImageUrl) {
                        setProfileImageUrl(photoURL); // Update the profile image URL
                        storeImageInLocalStorage(photoURL); // Update local storage
                    }
                }
            }
        };

        fetchProfileImage();
    }, [user]);

    return (
        <div className="profile-logo">
            {profileImageUrl ? (
                <img src={profileImageUrl} alt="Profile" className="profile-image" />
            ) : (
                <div className="placeholder-profile-image">.</div>
            )}
        </div>
    );
}

export default ProfileLogo;

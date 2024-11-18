import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../Context/AuthContext';
import { getAuth, signOut } from 'firebase/auth'; // Assuming you have AuthContext configured
import { db } from '../../firebase/firebase.config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './ProfileLogo.css'; 

function ProfileLogo() {
    const { user } = useContext(Context);
    const auth = getAuth();
    const [profileImageUrl, setProfileImageUrl] = useState('');

    
    const storeImageInLocalStorage = (imageUrl) => {
        localStorage.setItem('profileImageUrl', imageUrl);
    };

    
    const getImageFromLocalStorage = () => {
        return localStorage.getItem('profileImageUrl');
    };

    useEffect(() => {
        const fetchProfileImage = async () => {
    
            const storedImageUrl = getImageFromLocalStorage();
            if (storedImageUrl) {
                setProfileImageUrl(storedImageUrl);
            }

            if (user && user.email) {
                const q = query(collection(db, 'users'), where('email', '==', user.email));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const userData = querySnapshot.docs[0].data();
                    const photoURL = userData.photoURL;
                    
                
                    if (photoURL && photoURL !== storedImageUrl) {
                        setProfileImageUrl(photoURL); 
                        storeImageInLocalStorage(photoURL);
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

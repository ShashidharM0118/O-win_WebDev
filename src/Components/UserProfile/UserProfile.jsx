import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X, Mail, Phone, MapPin, LogOut, UserX, Camera } from "lucide-react";
import { collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import {
  signOut,
  deleteUser,
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { db } from "../../firebase/firebase.config";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = getAuth();

  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    photoURL: "",
    phNO: "",
  });
  const [profilePicture, setProfilePicture] = useState("https://via.placeholder.com/150");
  const [loading, setLoading] = useState(false);
  const [bookmarkedPlaces, setBookmarkedPlaces] = useState([]);
  const [loadingPlaces, setLoadingPlaces] = useState(false);
  const [showReauthConfirm, setShowReauthConfirm] = useState(false);
  const [reauthEmail, setReauthEmail] = useState("");
  const [reauthPassword, setReauthPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        try {
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("_id", "==", id));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            setUserData(userData);
            setProfilePicture(userData.photoURL || "https://via.placeholder.com/150");
          }
        } catch (error) {
          setError("Error fetching user data");
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [id]);

  useEffect(() => {
    const fetchBookmarkedPlaces = async () => {
      const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
      if (bookmarks.length > 0) {
        setLoadingPlaces(true);
        try {
          const places = await Promise.all(
            bookmarks.map(async (bookmark) => {
              const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${bookmark.lat},${bookmark.lng}&key=${import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY}`
              );
              const data = await response.json();
              return {
                id: `${bookmark.lat}-${bookmark.lng}`,
                address: data.results?.[0]?.formatted_address || "Unknown location",
                lat: bookmark.lat,
                lng: bookmark.lng,
              };
            })
          );
          setBookmarkedPlaces(places);
        } catch (error) {
          setError("Error fetching bookmarked places");
          console.error("Error fetching place names:", error);
        } finally {
          setLoadingPlaces(false);
        }
      }
    };

    fetchBookmarkedPlaces();
  }, []);

  const handleRemoveBookmark = (bookmarkId) => {
    try {
      const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
      const [lat, lng] = bookmarkId.split("-").map(Number);
      
      const updatedBookmarks = bookmarks.filter(
        bookmark => bookmark.lat !== lat || bookmark.lng !== lng
      );
      
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      setBookmarkedPlaces(prev => prev.filter(place => place.id !== bookmarkId));
    } catch (error) {
      setError("Error removing bookmark");
      console.error("Error removing bookmark:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      setError("Error signing out");
      console.error("Sign out error:", error);
    }
  };

  const handleDeleteAccount = () => {
    setShowReauthConfirm(true);
  };

  const confirmReauth = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const credential = EmailAuthProvider.credential(
          reauthEmail,
          reauthPassword
        );
        await reauthenticateWithCredential(user, credential);

        const usersRef = collection(db, "users");
        const q = query(usersRef, where("_id", "==", id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDocRef = querySnapshot.docs[0].ref;
          await deleteDoc(userDocRef);
        }

        await deleteUser(user);
        navigate("/");
      }
    } catch (error) {
      setError("Error deleting account: Incorrect credentials");
      console.error("Error re-authenticating or deleting account:", error);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
          <div className="flex items-center justify-center text-red-500 mb-4">
            <X className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Oops!</h2>
          <p className="text-gray-600 text-center mb-6">{error}</p>
          <button
            onClick={() => setError(null)}
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transform transition-all duration-200 hover:scale-[1.02]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-blue-400 to-indigo-500">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="relative group">
              {loading ? (
                <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <>
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                  <div className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="pt-20 pb-8 px-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">{userData.displayName}</h1>
          
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
              <Mail className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-800">{userData.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
              <Phone className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-800">{userData.phNO || "Not provided"}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <MapPin className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-800">Bookmarked Places</h2>
              </div>
              
              {loadingPlaces ? (
                <div className="flex justify-center p-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto px-2 custom-scrollbar">
                  {bookmarkedPlaces.length > 0 ? (
                    bookmarkedPlaces.map((place) => (
                      <div
                        key={place.id}
                        className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 relative group"
                      >
                        <button
                          onClick={() => handleRemoveBookmark(place.id)}
                          className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
                        </button>
                        <p className="text-gray-800 font-medium pr-8">{place.address}</p>
                        <p className="text-gray-400 text-sm mt-1 font-mono">
                          ({place.lat.toFixed(4)}, {place.lng.toFixed(4)})
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No bookmarked places yet</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={handleDeleteAccount}
                className="flex items-center px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 hover:scale-105"
              >
                <UserX className="w-4 h-4 mr-2" />
                Delete Account
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 hover:scale-105"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {showReauthConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 transform transition-all animate-fade-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Confirm Account Deletion</h2>
            <p className="text-gray-600 mb-6">Please enter your credentials to confirm account deletion.</p>
            <input
              type="email"
              placeholder="Email"
              value={reauthEmail}
              onChange={(e) => setReauthEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={reauthPassword}
              onChange={(e) => setReauthPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-4">
              <button
                onClick={confirmReauth}
                className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200"
              >
                Delete Account
              </button>
              <button
                onClick={() => setShowReauthConfirm(false)}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
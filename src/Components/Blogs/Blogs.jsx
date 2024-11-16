import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { collection, getDocs, addDoc, serverTimestamp, query, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { formatDistanceToNow } from "date-fns";
import { db } from "../../firebase/firebase.config";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import "./Blogs.css";
import GeocodeComponent from "../GeocodeComponent/GeocodeComponent";
const mapContainerStyle = {
  height: "400px",
  width: "100%"
};

const defaultCenter = {
  lat: 0,
  lng: 0
};

const Blogs = () => {
  const [formData, setFormData] = useState({
    image: null,
    video: null,
    comment: "",
    rating: 1,
    location: null,
    userEmail: "",
    userImage: "",
  });

  const [status, setStatus] = useState("");
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [usersData, setUsersData] = useState({});

  const fetchPosts = async () => {
    try {
      const collectionRef = collection(db, "posts");
      const snapshot = await getDocs(collectionRef);
      const postsData = snapshot.docs.map((doc) => {
        const data = doc.data();
        // Ensure location data is properly structured if it exists
        if (data.location && typeof data.location === 'object') {
          data.location = {
            lat: Number(data.location.lat),
            lng: Number(data.location.lng)
          };
        }
        return {
          id: doc.id,
          ...data,
        };
      });
      setPosts(postsData);
      fetchUserData(postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setStatus("Error loading posts.");
    }
  };

  const fetchUserData = async (postsData) => {
    try {
      const uniqueEmails = [...new Set(postsData.map(post => post.userEmail))];
      const users = {};
      for (const email of uniqueEmails) {
        const userQuery = query(collection(db, "users"), where("email", "==", email));
        const userSnapshot = await getDocs(userQuery);
        userSnapshot.forEach(doc => {
          users[email] = doc.data();
        });
      }
      setUsersData(users);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting post...");
    const storage = getStorage();
    const postData = { ...formData };

    try {
      const user = getAuth().currentUser;
      if (user) {
        postData.userEmail = user.email;
        postData.userImage = user.photoURL;
      }

      if (formData.image) {
        const imageRef = ref(storage, `images/${formData.image.name}`);
        await uploadBytes(imageRef, formData.image);
        postData.image = await getDownloadURL(imageRef);
      }

      if (formData.video) {
        const videoRef = ref(storage, `videos/${formData.video.name}`);
        await uploadBytes(videoRef, formData.video);
        postData.video = await getDownloadURL(videoRef);
      }

      // Validate location data before saving
      if (postData.location && 
          typeof postData.location.lat === 'number' && 
          !isNaN(postData.location.lat) &&
          typeof postData.location.lng === 'number' && 
          !isNaN(postData.location.lng)) {
        postData.location = {
          lat: postData.location.lat,
          lng: postData.location.lng
        };
      } else {
        delete postData.location;
      }

      postData.uploadedTime = serverTimestamp();
      const collectionRef = collection(db, "posts");
      await addDoc(collectionRef, postData);
      setStatus("Post submitted successfully!");
      setShowForm(false);
      fetchPosts();
    } catch (error) {
      console.error("Error submitting post:", error);
      setStatus("Failed to submit post.");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const numRating = Number(rating) || 0;
    for (let i = 1; i <= 5; i++) {
      if (numRating >= i) {
        stars.push(<FaStar key={i} className="star" />);
      } else if (numRating > i - 1 && numRating < i) {
        stars.push(<FaStarHalfAlt key={i} className="star" />);
      } else {
        stars.push(<FaRegStar key={i} className="star" />);
      }
    }
    return stars;
  };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData(prev => ({
          ...prev,
          location: {
            lat: Number(latitude),
            lng: Number(longitude)
          }
        }));
        setStatus("Location obtained successfully!");
      },
      (error) => {
        console.error("Error getting location:", error);
        setStatus("Failed to get location. Please try again.");
      }
    );
  };

  const renderMap = (location) => {
    // Validate location data before rendering map
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
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '20px',
              height: '20px',
              backgroundColor: 'red',
              borderRadius: '50%',
              border: '2px solid white'
            }}
          />
        </GoogleMap>
      </LoadScript>
    );
  };

  // Function to safely display coordinates
  const formatCoordinates = (location) => {
    if (!location || typeof location.lat !== 'number' || typeof location.lng !== 'number') {
      return null;
    }
    return `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`;
  };

  return (
    <div className="blogs-container">
      {/* <h1>Blog Posts</h1> */}
      <button onClick={() => setShowForm(!showForm)} className="add-post-btn">
        {showForm ? "Close Form" : "Add Post"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="blog-form">
         <div>
  <label>Upload Image:</label>
  <input 
    type="file" 
    name="image" 
    accept="image/*" 
    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.files[0] }))} 
    required 
  />
</div>
<div>
  <label>Upload Video:</label>
  <input 
    type="file" 
    name="video" 
    accept="video/*" 
    onChange={(e) => setFormData(prev => ({ ...prev, video: e.target.files[0] }))} 
    required 
  />
</div>
          <div>
            <label>Comment:</label>
            <textarea 
              name="comment" 
              value={formData.comment} 
              onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))} 
              required 
            />
          </div>
          <div>
            <label>Rating (1-5):</label>
            <input 
              type="number" 
              name="rating" 
              min="1" 
              max="5" 
              value={formData.rating} 
              onChange={(e) => setFormData(prev => ({ ...prev, rating: Number(e.target.value) }))} 
              required 
            />
          </div>
          <div>
            <button type="button" onClick={handleLocation}>Get Location</button>
            {formData.location && formatCoordinates(formData.location) && (
              <p>Location obtained: {formatCoordinates(formData.location)}</p>
            )}
          </div>
          <button type="submit">Submit Post</button>
        </form>
      )}

      {status && <p className="status-message">{status}</p>}

      <div className="posts-container">
        {posts.slice(0, showAllPosts ? posts.length : 3).map((post) => {
          const user = usersData[post.userEmail];
          const coordinates = formatCoordinates(post.location);

          return (
            <div className="post-card" key={post.id}>
              <div className="header">
                {user?.photoURL && (
                  <img src={user.photoURL} alt="User" className="user-image" />
                )}
                <div className="user-info">
                  <p className="user-name">{user?.displayName || "Anonymous"}</p>
                  <p className="time-uploaded">
                    {post.uploadedTime
                      ? formatDistanceToNow(post.uploadedTime.toDate(), { addSuffix: true })
                      : "Loading..."}
                  </p>
                </div>
              </div>
              <p className="comment">{post.comment}</p>
              <div className="media-block">
                {post.image && <img src={post.image} alt="Post visual" />}
                {post.video && (
                  <video controls>
                    <source src={post.video} type="video/mp4" />
                  </video>
                )}
              </div>
              
              {/* <div className="rating">{renderStars(post.rating)}</div> */}
              
              {coordinates && (
                <div className="location">
                  {/* <p>Location: {coordinates}</p> */}
                  {renderMap(post.location)}
                </div>
              )}
              <div className="rating">{renderStars(post.rating)}</div>
              {/* <p className="comment">{post.comment}</p> */}
            </div>
          );
        })}
      </div>

      {!showAllPosts && posts.length > 3 && (
        <button className="more-btn" onClick={() => setShowAllPosts(true)}>
          View More
        </button>
      )}
    </div>
  );
};

export default Blogs;
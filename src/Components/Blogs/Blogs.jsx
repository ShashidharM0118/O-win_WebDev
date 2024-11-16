import React, { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../firebase/firebase.config";
import "./Blogs.css";

const Blogs = () => {
  const [formData, setFormData] = useState({
    image: null,
    video: null,
    comment: "",
    rating: 1,
    location: { latitude: null, longitude: null },
    userEmail: "",
  });

  const [status, setStatus] = useState("");

  // Fetch current user's email
  React.useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData((prev) => ({ ...prev, userEmail: user.email }));
      }
    });

    // Get current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prev) => ({
          ...prev,
          location: { latitude, longitude },
        }));
      },
      (error) => console.error("Error fetching location:", error)
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting post...");

    const storage = getStorage();
    const postData = { ...formData };

    try {
      // Upload image if it exists
      if (formData.image) {
        const imageRef = ref(storage, `images/${formData.image.name}`);
        await uploadBytes(imageRef, formData.image);
        postData.image = await getDownloadURL(imageRef);
      }

      // Upload video if it exists
      if (formData.video) {
        const videoRef = ref(storage, `videos/${formData.video.name}`);
        await uploadBytes(videoRef, formData.video);
        postData.video = await getDownloadURL(videoRef);
      }

      // Add a timestamp field
      postData.uploadedTime = serverTimestamp();

      // Store the data in Firestore
      const collectionRef = collection(db, "posts");
      await addDoc(collectionRef, postData);

      setStatus("Post submitted successfully!");
    } catch (error) {
      console.error("Error submitting post:", error);
      setStatus("Failed to submit post.");
    }
  };

  return (
    <div className="blogs-container">
      <h1>Create a Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <label>Upload Video:</label>
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <label>Comment:</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Submit Post</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default Blogs;

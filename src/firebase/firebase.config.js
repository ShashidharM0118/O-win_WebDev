// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "travel-argonyx.firebaseapp.com",
  projectId: "travel-argonyx",
  storageBucket: "travel-argonyx.firebasestorage.app",
  messagingSenderId: "923052261483",
  appId: "1:923052261483:web:f995589ba5b75d8412712e",
  measurementId: "G-P8LRKD2VRQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
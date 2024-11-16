// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "o-win-425e9.firebaseapp.com",
  projectId: "o-win-425e9",
  storageBucket: "o-win-425e9.firebasestorage.app",
  messagingSenderId: "485883411152",
  appId: "1:485883411152:web:02c66e1d58c190ef85fcd5",
  measurementId: "G-6SFRG9V1XC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
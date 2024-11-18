import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import fbconfig from './firebase/firebase.config.js';
import { initializeApp } from 'firebase/app';
import EnvironmentError from './components/EnvironmentError';

// Environment variables
const googleMapsApiKey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY 
const firebaseApiKey = import.meta.env.VITE_FIREBASE_API_KEY 

// Check if required environment variables are set
if (!googleMapsApiKey || !firebaseApiKey) {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <EnvironmentError />
    </React.StrictMode>
  );
} else {
  const app = initializeApp(fbconfig);

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
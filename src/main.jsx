import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import fbconfig from './firebase/firebase.config.js';
import { initializeApp } from 'firebase/app';
import { AlertCircle } from 'lucide-react';

// Environment variables
// const googleMapsApiKey = import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY // Changed from REACT_APP prefix to VITE
const firebaseApiKey = import.meta.env.VITE_FIREBASE_API_KEY
// Add this to check all available environment variables
console.log('All env variables:', import.meta.env);   
// console.log(googleMapsApiKey)

// Environment Error Component
const EnvironmentError = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div className="w-full max-w-md">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Flyby</h1>
        <p className="text-gray-500 mt-1">Configuration Required</p>
      </div>
      
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
          <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
          <h2 className="text-xl font-semibold text-red-700">
            Configuration Error
          </h2>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-700">
            Flyby needs some additional configuration to start. Please check the following:
          </p>
          
          <ul className="list-disc pl-4 text-sm space-y-2 text-gray-700">
            <li>Ensure .env file exists in the Flyby project root and server</li>
            <li>Verify all required API keys are set properly as shown in .env.example</li>
            <li>Restart the Flyby development server</li>
          </ul>
          
          <div className="pt-4 border-t border-red-200">
            <p className="text-sm font-medium text-gray-700">
              Thank you for your interest in Flyby!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// App initialization and rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

try {
  if (!firebaseApiKey) {
    root.render(
      <React.StrictMode>
        <EnvironmentError />
      </React.StrictMode>
    );
  } else {
    const app = initializeApp(fbconfig);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
} catch (error) {
  console.error('Initialization error:', error);
  root.render(
    <React.StrictMode>
      <EnvironmentError />
    </React.StrictMode>
  );
}
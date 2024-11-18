import React from 'react';
import { AlertCircle } from 'lucide-react';

const EnvironmentError = () => {
  return (
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
};

export default EnvironmentError;
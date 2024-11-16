import React from 'react';
import PresentImage3 from "../../../assets/PresentImage3.jpg"
const ThirdCol = () => {
  const content = {
    heading: "Real-Time Travel Companion",
    sections: [
        {
          points: [
            "Smart Notifications"
          ]
        },
        {
          points: [
            "Festival and Cultural events alerts"
          ]
        },
        {
          points: [
            "Must try Dishes in your vicinity"
          ]
        }
      ]
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-screen">
        {/* Content Column */}
        <div className="flex flex-col justify-center space-y-8">
          <h3 className="text-3xl font-bold text-gray-800">
            {content.heading}
          </h3>
          
          <div className="space-y-12">
            {content.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <ul className="space-y-4">
                  {section.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500" />
                      <span className="text-gray-600 text-lg leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Image Column */}
        <div className="flex items-center justify-center">
          <div className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-xl">
            <img
              src={PresentImage3}
              alt="Local cultural experience"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdCol;
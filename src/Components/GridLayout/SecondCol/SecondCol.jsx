import React from 'react';
import PresentImage2 from "../../../assets/PresentImage2.jpg"
const SecondCol = () => {
  const content = {
    heading: "Smart Features",
    sections: [
        {
          points: [
            "Intelligent Route Planning"
          ]
        },
        {
          points: [
            "Connect with certified local guides"
          ]
        },
        {
          points: [
            "Join Community Alerts"
          ]
        }
      ]
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-screen">
        {/* Image Column */}
        <div className="flex items-center">
          <div className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-xl">
            <img
              src={PresentImage2}
              alt="Local cultural experience"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Content Column */}
        <div className="flex items-center">
          <div className="w-full">
            <h3 className="text-3xl font-bold text-gray-800 mb-8">
              {content.heading}
            </h3>
            
            <div className="col-flex">
              {content.sections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
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
        </div>
      </div>
    </div>
  );
};

export default SecondCol;
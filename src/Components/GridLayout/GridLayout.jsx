// import React from "react";

function GridLayout() {
  return (
    <div className="grid grid-rows-3 h-[300vh]">
      {/* Row 1 */}
      <div className="grid grid-cols-2 h-screen">
        <div className="flex items-center justify-center bg-gray-100">
          <div className="text-center p-10">
            <h1 className="text-4xl font-bold mb-4">Welcome to Row 1</h1>
            <p className="text-lg">
              This is a demo text on the left side of the first row.
            </p>
          </div>
        </div>
        <div
          className="bg-cover bg-center"
          style={{ backgroundImage: `url('https://via.placeholder.com/600')` }}
        ></div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 h-screen">
        <div
          className="bg-cover bg-center"
          style={{ backgroundImage: `url('https://via.placeholder.com/600')` }}
        ></div>
        <div className="flex items-center justify-center bg-gray-100">
          <div className="text-center p-10">
            <h1 className="text-4xl font-bold mb-4">Welcome to Row 2</h1>
            <p className="text-lg">
              This is a demo text on the right side of the second row.
            </p>
          </div>
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-2 h-screen">
        <div className="flex items-center justify-center bg-gray-100">
          <div className="text-center p-10">
            <h1 className="text-4xl font-bold mb-4">Welcome to Row 3</h1>
            <p className="text-lg">
              This is a demo text on the left side of the third row.
            </p>
          </div>
        </div>
        <div
          className="bg-cover bg-center"
          style={{ backgroundImage: `url('https://via.placeholder.com/600')` }}
        ></div>
      </div>
    </div>
  );
}

export default GridLayout;
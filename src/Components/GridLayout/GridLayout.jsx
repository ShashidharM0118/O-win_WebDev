// import React from "react";
import FirstCol from "./FirstCol/FirstCol"
import SecondCol from "./SecondCol/SecondCol"
import ThirdCol from "./ThirdCol/ThirdCol"

function GridLayout() {
  return (
    <div className="grid grid-rows-3 h-[300vh]">
      <FirstCol />

      {/* Row 2 */}
      <SecondCol />

      {/* Row 3 */}
      <ThirdCol />
    </div>
  );
}

export default GridLayout;
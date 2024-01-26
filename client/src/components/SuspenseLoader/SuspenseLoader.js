import React, { Suspense } from "react";
import HashLoader from "react-spinners/HashLoader";

const SuspenseLoader = ({ children }) => {
  //    const promise =   new Promise((resolve) => setTimeout(resolve, 2000));
  // const bool = false

  return (
    <>
      <Suspense fallback={<HashLoaderWapper />}>
        {children}
      </Suspense>
    </>
  );
};
const HashLoaderWapper = () => {
  return (
    <div className="flex justify-center my-8">
      <HashLoader
        color="#ffffff"
        size={18}
        speedMultiplier={1.2}
        cssOverride={{
          "backgroundColor": "#5f5f5f",
          "borderRadius": "50%",
          padding: "20px",
        }}
      />
    </div>
  );
};

export default SuspenseLoader;

import "./SuspenseImg.scss";
// import React, { Suspense, useEffect, useState } from "react";

// const SuspenseImg = ({ src, height, alt }) => {
//   const [loading, setloading] = useState(true);

//   // <Suspense fallback={<ImgPlaceHolder height={height} />}>
//   useEffect(() => {
//     console.log(loading);
//   },[loading])
//   return loading ? (
//     <ImgPlaceHolder height={height} />
//   ) : (
//     <img src={src} alt={alt} onLoad={() => setloading(false)} />
//   );
//   // </Suspense>
// };

// const ImgPlaceHolder = ({ height = "100%" }) => {
//   return <div className={`bg-gray-200  h-96 w-full`}></div>;
// };

// export default SuspenseImg;

import React, { useEffect, useState } from "react";

const SuspenseImg = ({ src, height, alt, className, fileName }) => {
  const [loading, setLoading] = useState(true);
  // const [imgSrc, setImgSrc] = useState(null);

  const handleImageLoad = () => {
    setLoading(false);
  };
  useEffect(() => {
    console.log(loading);
  }, [loading]);
  // useEffect(() => {
  //   const img = new Image();
  //   img.src = src;
  //   img.onerror = () => {
  //     console.log('error  at loading img');
  //     setImgSrc(null);
  //   }
  //   img.onload = () => {
  //     setImgSrc(src);
  //   };
  // }, [src]);
  return (
    <div>
      {loading && <ImgPlaceHolder height={height} />}
      {/* {src !== "/uploads/undefined" && ( */}
      {fileName && src && (
        <img
          src={process.env.REACT_APP_API_URL + src}
          alt={alt}
          onLoad={handleImageLoad}
          className={`${className}  ${loading ? "h-0" : "h-auto"}`}
        />
      )}
    </div>
  );
};

const ImgPlaceHolder = ({ height = 350 }) => {
  return (
    <div
      className={"  w-full shimmer-bg"}
      style={{ height: height + "px" }}
    ></div>
  );
};

export default SuspenseImg;

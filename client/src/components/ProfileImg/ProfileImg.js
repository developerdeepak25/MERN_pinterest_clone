import React from "react";

const ProfileImg = ({ alt, src, className, ...rest }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover min-h-full min-w-full ${className}`}
      {...rest}
    />
  );
};

export default ProfileImg;

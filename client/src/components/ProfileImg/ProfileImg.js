import React from "react";

const ProfileImg = ({
  alt,
  src,
  className = "",
  absolute = false,
  ...rest
}) => {
  return src ? (
    <img
      src={absolute ? src : process.env.REACT_APP_API_URL + src}
      alt={alt}
      className={`object-cover min-h-full min-w-full ${className}`}
      {...rest}
    />
  ) : (
    <img
      src={require("../../image/icons/blank_profile.jpg")}
      alt={alt}
      className={`object-cover min-h-full min-w-full ${className}`}
      {...rest}
    />
  );
};

export default ProfileImg;

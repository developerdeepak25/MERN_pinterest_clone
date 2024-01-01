import React from "react";

const ErrorSvg = ({height}) => {
  return (
    <>
      <svg height={height} viewBox="0 0 32 32" id="error">
        <path
          d="M16 32c8.836 0 16-7.164 16-16S24.836 0 16 0 0 7.164 0 16s7.164 16 16 16zm2-14a2 2 0 0 1-4 0V8a2 2 0 0 1 4 0v10zm-2 3.968a2 2 0 1 1-.001 4.001A2 2 0 0 1 16 21.968z"
          fill="#d93025"
        ></path>
      </svg>
    </>
  );
};

export default ErrorSvg;

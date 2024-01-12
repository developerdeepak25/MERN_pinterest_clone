import React from 'react'

const LogoutSvg = ({fill="#000000"}) => {
  return (
    <svg
    //   width="800px"
    //   height="800px"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
    //   fill={fill}
        stroke={fill}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20 12h-9.5m7.5 3l3-3-3-3m-5-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h5a2 2 0 002-2v-1"
      />
    </svg>
  );
}

export default LogoutSvg
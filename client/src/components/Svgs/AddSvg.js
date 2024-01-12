import React from "react";

const AddSvg = ({fill}) => {
  return (
    <svg viewBox="0 0 32 32" >
      <g data-name="Layer 2" id="Layer_2">
        <path d="M16,29A13,13,0,1,1,29,16,13,13,0,0,1,16,29ZM16,5A11,11,0,1,0,27,16,11,11,0,0,0,16,5Z" fill={fill} />
        <path d="M16,23a1,1,0,0,1-1-1V10a1,1,0,0,1,2,0V22A1,1,0,0,1,16,23Z" fill={fill} />
        <path d="M22,17H10a1,1,0,0,1,0-2H22a1,1,0,0,1,0,2Z"  fill={fill}/>
      </g>
      
    </svg>
  );
};

export default AddSvg;

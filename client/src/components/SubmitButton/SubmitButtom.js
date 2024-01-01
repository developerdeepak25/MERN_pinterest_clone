import React from 'react'
import './SubmitButtom.scss'

const SubmitButtom = ({onClick, disabled, label, loading}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer submit-btn ${loading ? "loading" : ""}`}
    >
      <span className=" capitalize">{loading ? "processing..." : label}</span>
    </button>
  );
}

export default SubmitButtom

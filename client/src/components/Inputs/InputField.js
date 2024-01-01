import React from 'react'

const InputField = ({ handleChange, label, name, id, type='text'}) => {
  return (
    <label
      htmlFor={id}
      className="flex flex-col text-[#111111] text-sm gap-2 capitalize"
    >
      {label}
      <input
        // type="text"
        name={name}
        id={id}
        type={type}
        className="border-2 border-[#cdcdcd] text-base px-4 py-2 rounded-xl"
        onChange={handleChange}
        // disabled
      />
    </label>
  );
};

export default InputField

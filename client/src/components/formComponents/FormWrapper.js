import React from "react";

const FormWrapper = ({ children }) => {
  return (
    <div className="minus-nav-100vh bg-slate-50 flex flex-col">
      <div className="form-container flex justify-center  my-auto max-sm:my-0">
        <div className="auth-form w-[440px] max-sm:w-full bg-white general-shadow py-7 px-3  rounded-[32px] max-sm:rounded-none max-sm:min-h-screen max-sm:pt-20">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormWrapper;

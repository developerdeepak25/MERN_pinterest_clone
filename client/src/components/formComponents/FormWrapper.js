import React from 'react'

const FormWrapper = ({children}) => {
  return (
     <div className="form-container flex justify-center  my-auto ">
          <div className="auth-form w-[440px] bg-white general-shadow py-7 px-3  rounded-[32px]">
{children}
          </div>
          </div>
  )
}

export default FormWrapper

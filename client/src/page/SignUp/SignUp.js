import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import InputField from "../../components/Inputs/InputField";
import SubmitButtom from "../../components/SubmitButton/SubmitButtom";
import PinterestLogo from "../../components/Svgs/PinterestLogo";
import FormWrapper from "../../components/formComponents/FormWrapper";
import toast from "react-hot-toast";
import { useFormValidation } from "../../customHooks/useFormValidation";

const SignUp = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [submitDisabled, errorMsg, setErrorMsg] = useFormValidation(null, formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    if (submitDisabled) {
      setErrorMsg("All fields are mandatory*");
      return;
    }

    try {
      setLoading(true);
      // const response = await fetch("http://localhost:5000/signup", {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok || response.status === 200) {
        console.log("Signup successful", response);
        toast.success("signup successful");
        navigate("/login");
      } else {
        // Handle server error
        console.log("Signup failed with status:", response.status);
        toast.error("signup unsuccessful");
      }
    } catch (error) {
      console.log("signup error: " + error);
      toast.error("signup unsuccessful: something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="minus-nav-100vh bg-slate-50 flex flex-col">
        {/* <div className="h-full"> */}
        <FormWrapper>
          <div className="flex flex-col items-center my-5">
            {/* {loading ? <h3>loading...</h3> : ""} */}
            <div className="logo  aspect-square w-9 mb-3  rounded-full">
              <PinterestLogo />
            </div>
            <h1 className=" text-center w-[400px] ">Welcome to Clone</h1>
            <p>Signup Here</p>
            <div className="form-inputs w-[260px]  mt-6 flex flex-col gap-3">
              <InputField
                label={"Username"}
                type="text"
                name={"username"}
                id={"user-name"}
                handleChange={handleChange}
              />
              <InputField
                label={"email"}
                type="email"
                name={"email"}
                id={"user-email"}
                handleChange={handleChange}
              />
              <InputField
                label={"create password"}
                type="password"
                name={"password"}
                id={"user-pass"}
                handleChange={handleChange}
              />
              {errorMsg && (
                <p className="text-[#d93025] text-sm flex items-start gap-2 mx-1">
                  {errorMsg}
                </p>
              )}

              <SubmitButtom
                onClick={handleSubmit}
                // disabled={submitDisabled}
                label={"sign up"}
                loading={loading}
              />
            </div>
            <div className=" text-sm mt-4">
              <span>Already signed in? </span>
              <NavLink to={"/login"}>Go to login.</NavLink>
            </div>
          </div>
        </FormWrapper>
      </div>
    </>
  );
};

export default SignUp;

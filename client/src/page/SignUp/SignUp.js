import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import InputField from "../../components/Inputs/InputField";
import SubmitButtom from "../../components/SubmitButton/SubmitButtom";
import PinterestLogo from "../../components/Svgs/PinterestLogo";
import FormWrapper from "../../components/formComponents/FormWrapper";

const SignUp = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // e.preventDefault();
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
      if (response.ok) {
        console.log("Signup successful", response);
        navigate("/login");
      } else {
        // Handle server error
        console.log("Signup failed with status:", response.status);
      }
    } catch (error) {
      console.log("signup error: " + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      formData.email.length > 0 &&
      formData.password.length > 0 &&
      formData.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formData]);

  return (
    <>
      {/* <form onSubmit={handleSubmit}> */}
      {/* <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </label> */}

      {/* <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label> */}

      {/* <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label> */}
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

                <SubmitButtom
                  onClick={handleSubmit}
                  disabled={buttonDisabled}
                  label={"sign up"}
                  loading={loading}
                />
              </div>
              {/* </form> */}
              <div className=" text-sm mt-4">
                <span>Already signed in? </span>
                <NavLink to={"/login"}>Go to login.</NavLink>
              </div>
            </div>
        </FormWrapper>
          
        {/* </div> */}
      </div>
    </>
  );
};

export default SignUp;

import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/AuthSlice";
import InputField from "../../components/Inputs/InputField";
import FormWrapper from "../../components/formComponents/FormWrapper";
import PinterestLogo from "../../components/Svgs/PinterestLogo";
import SubmitButtom from "../../components/SubmitButton/SubmitButtom";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: "include",
        body: JSON.stringify(formData),
      });

      const resJson = await response.json();

      if (response.status === 400) {
        setErrorMsg(resJson.error);
        toast.error(resJson.error);
      }

      if (response.status === 200) {
        console.log("login successful", response.status);
        const { id } = resJson;
        // console.log("🚀 ~ file: Login.js:41 ~ handleSubmit ~ token:", id);
        dispatch(login(id));
        toast.success("login successful");
        navigate("/");
      } else {
        // Handle server error
        console.log("login failed with status:", resJson);
      }

    } catch (error) {
      console.log("login error: " + error);
      toast.error('login unsuccessful: something went wrong')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formData.email.length > 0 && formData.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formData]);

  return (
    <>
      {/* <label >
        Email:
        <input
          type="email"
          name="email"
          // value={formData.email}
          onChange={handleChange}
          required
        />
      </label> */}
      {/* <label>
        Password:
        <input
          type="password"
          name="password"
          // value={formData.password}
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
            <p>Login Here</p>
            <div className="form-inputs w-[260px]  mt-6 flex flex-col gap-3">
              <InputField
                label={"Email"}
                type="email"
                name={"email"}
                id={"user-email"}
                handleChange={handleChange}
              />

              <InputField
                label={"Password"}
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
                disabled={buttonDisabled}
                label={"login "}
                loading={loading}
              />
            </div>
            <div className=" text-sm mt-4">
              <span>Don't have an account? </span>
              <NavLink to={"/signup"}>Go to signup.</NavLink>
            </div>
          </div>
        </FormWrapper>
      </div>
    </>
  );
};

export default SignUp;

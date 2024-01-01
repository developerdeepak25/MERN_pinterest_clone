import React from "react";
import {  Navigate } from "react-router-dom";
// import { AuthContext } from "./your-auth-context"; // Import your authentication context
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  //   const { isAuthenticated } = useContext(AuthContext);
  const { isAuthenticated } = useSelector((state) => {
    return state.Auth;
  });
  console.log(isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

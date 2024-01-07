import React from "react";
import { Navigate } from "react-router-dom";
// import { AuthContext } from "./your-auth-context"; // Import your authentication context
import { useSelector } from "react-redux";
import SuspenseLoader from "../SuspenseLoader/SuspenseLoader";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => {
    return state.Auth;
  });
  console.log(isAuthenticated);

  return isAuthenticated ? (
    <SuspenseLoader>{children}</SuspenseLoader>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;

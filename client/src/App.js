import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./page/Login/Login";
import Home from "./page/Home/Home";
import SignUp from "./page/SignUp/SignUp";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Navbar from "./components/Navbar/Navbar";
import Create from "./page/Create/Create";
import Profile from "./page/Profile/Profile";
import SinglePin from "./page/Singlepin/SinglePin";
import { useFetchUserInfo } from "./customHooks/useFetchUserInfo";

const App = () => {
  // useEffect(() => {
  //   isAuthenticated && fetchUserInfo();
  // }, [isAuthenticated]);
  useFetchUserInfo();
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        {/* <Route path="/create" element={<Create />} /> */}
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <Create />
            </PrivateRoute>
          }
        />
        {/* 👈 Renders at /app/ */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/pin/:id"
          element={
            <PrivateRoute>
              <SinglePin />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;

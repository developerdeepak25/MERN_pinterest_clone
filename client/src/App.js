import React from "react";
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
import UserCreatedPosts from "./components/UserCreatedPosts/UserCreatedPosts";
import UserSavedPosts from "./components/UserSavedPosts/UserSavedPosts";
import {Toaster} from 'react-hot-toast'

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
        >
          <Route index element={<UserCreatedPosts />} />
          <Route path="created" element={<UserCreatedPosts />} />
          <Route path="saved" element={<UserSavedPosts />} />
        </Route>
        <Route
          path="/pin/:id"
          element={
            <PrivateRoute>
              <SinglePin />
            </PrivateRoute>
          }
        />
      </Routes>
      <Toaster position="bottom-right" reverseOrder={true} />
    </>
  );
};

export default App;

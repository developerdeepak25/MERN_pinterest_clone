import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useFetchUserInfo } from "./customHooks/useFetchUserInfo";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import Navbar from "./components/Navbar/Navbar";
import Login from "./page/Login/Login";
import SignUp from "./page/SignUp/SignUp";
import SuspenseLoader from "./components/SuspenseLoader/SuspenseLoader";

const UserCreatedPosts = lazy(() =>
  import("./components/UserCreatedPosts/UserCreatedPosts")
);
const UserSavedPosts = lazy(() =>
  import("./components/UserSavedPosts/UserSavedPosts")
);
const Home = lazy(() => import("./page/Home/Home"));
const Create = lazy(() => import("./page/Create/Create"));
const Profile = lazy(() => import("./page/Profile/Profile"));
const SinglePin = lazy(() => import("./page/Singlepin/SinglePin"));

// const SinglePin = lazy(() =>
//   wait().then(() => import("./page/Singlepin/SinglePin"))
// );

// function wait() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve(), 300000);
//   });
// }

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
          <Route
            index
            element={
              <SuspenseLoader>
                <UserCreatedPosts />
              </SuspenseLoader>
            }
          />
          <Route
            path="created"
            element={
              <SuspenseLoader>
                <UserCreatedPosts />
              </SuspenseLoader>
            }
          />
          <Route
            path="saved"
            element={
              <SuspenseLoader>
                <UserSavedPosts />
              </SuspenseLoader>
            }
          />
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
      <Toaster
        position={window.innerWidth > 640 ? "bottom-right" : "top-center"}
        reverseOrder={true}
      />
    </>
  );
};

export default App;

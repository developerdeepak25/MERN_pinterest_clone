import React from "react";
import PinterestLogo from "../Svgs/PinterestLogo";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/AuthSlice";
import "./Navbar.scss";
import { resetState } from "../../store/slices/UserSlice";
import ProfileImg from "../ProfileImg/ProfileImg";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => {
    return state.Auth;
  });
  const { userPic, username } = useSelector((state) => {
    return state.User;
  });

  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      await fetch("/logout", {
        method: "get",
      });
      dispatch(logout());
      dispatch(resetState());
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="navbar px-6  py-4 w-full sticky bg-white top-0 z-50">
      <div className="flex  justify-between">
        <div className="navbar-links flex items-center gap-2">
          <NavLink to="/" className="">
            <div className="logo p-2.5 aspect-square w-12 hover:bg-[#0000000f] rounded-full">
              <PinterestLogo />
            </div>
          </NavLink>
          <div className="button link">
            <NavLink to="/">Home</NavLink>
          </div>

          <div className="button link">
            <NavLink to="/create">Create</NavLink>
          </div>
        </div>
        <div className="profile-controls flex items-center gap-8">
          {isAuthenticated ? (
            <button className="logout-btn log-button" onClick={logoutHandler}>
              Logout
            </button>
          ) : (
            <NavLink to="/login">
              <div className="login-route log-button">Login</div>
            </NavLink>
          )}
          <NavLink to="/profile">
            <div className="profile_pic p-2.5 aspect-square w-12 hover:bg-[#0000000f] rounded-full flex">
              {userPic ? (
                <ProfileImg
                  className="rounded-full"
                  src={`/pic_uploads/${userPic}`}
                  alt={username + "picture"}
                />
              ) : (
                <ProfileImg
                  className="rounded-full"
                  src={require("../../image/icons/blank_profile.jpg")}
                  alt={username + "picture"}
                />
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import PinterestLogo from "../Svgs/PinterestLogo";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/AuthSlice";
import "./Navbar.scss";
import { resetState } from "../../store/slices/UserSlice";
import ProfileImg from "../ProfileImg/ProfileImg";
import toast from "react-hot-toast";
import HomeSvg from "../Svgs/HomeSvg";
import AddSvg from "../Svgs/AddSvg";
import LogoutSvg from "../Svgs/LogoutSvg";
import LoginSvg from "../Svgs/LoginSvg";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => {
    return state.Auth;
  });

  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const response = await fetch("/logout", {
        method: "get",
      });
      if (response.status === 200) {
        toast.success("logout successful");
        dispatch(logout());
        dispatch(resetState());
        navigate("/login");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="navbar max-sm:top-auto  max-sm:fixed max-sm:bottom-0  px-6  py-4 w-full sticky top-0 bg-white  z-50">
      {isMobile ? (
        <ForMobileScreen
          isAuthenticated={isAuthenticated}
          logoutHandler={logoutHandler}
        />
      ) : (
        <ForBigScreen
          isAuthenticated={isAuthenticated}
          logoutHandler={logoutHandler}
        />
      )}
    </div>
  );
};

const ForMobileScreen = ({ isAuthenticated, logoutHandler }) => {
  const fill = "#5f5f5f";
  return (
    <div className="flex  justify-between items-center">
      <NavLink to="/">
        <div className="logo p-2.5 aspect-square w-12 hover:bg-[#0000000f] rounded-full">
          <PinterestLogo />
        </div>
      </NavLink>
      <NavLink to="/">
        <NavWrapper className="home">
          <HomeSvg fill={fill} />
        </NavWrapper>
      </NavLink>
      <NavLink to="/create">
        <NavWrapper className="add-post">
          <AddSvg fill={fill} />
        </NavWrapper>
      </NavLink>
      {isAuthenticated ? (
        <div className="logout-btn" onClick={logoutHandler}>
          <NavWrapper className="logout">
            <LogoutSvg fill={fill} />
          </NavWrapper>
        </div>
      ) : (
        <NavLink to="/login">
          <NavWrapper className="login-link">
            <LoginSvg fill={fill} />
          </NavWrapper>
        </NavLink>
      )}
      <NavLink to="/profile/created">
        <ProfilePic />
      </NavLink>
    </div>
  );
};

const ForBigScreen = ({ isAuthenticated, logoutHandler }) => {
  return (
    <div className="flex  justify-between ">
      <div className="navbar-links flex items-center gap-2">
        <NavLink to="/">
          <NavWrapper className="logo">
            <PinterestLogo />
          </NavWrapper>
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
        <NavLink to="/profile/created">
          <ProfilePic />
        </NavLink>
      </div>
    </div>
  );
};

const NavWrapper = ({ children, className = "" }) => {
  return (
    <div
      className={`p-2.5 aspect-square w-12 hover:bg-[#0000000f] rounded-full ${className}`}
    >
      {children}
    </div>
  );
};

const ProfilePic = () => {
  const { userPic, username } = useSelector((state) => {
    return state.User;
  });
  return (
    <div className="profile_pic p-2.5 aspect-square w-12 hover:bg-[#0000000f]  rounded-full flex">
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
  );
};

export default Navbar;

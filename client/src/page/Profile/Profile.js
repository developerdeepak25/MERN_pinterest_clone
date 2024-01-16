import React, { useEffect, useState } from "react";
import "./Profile.scss";
import UserPicUploader from "../../components/UserPicUploader/UserPicUploader";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  updateStateSavedPosts,
  updateStatePosts,
} from "../../store/slices/UserSlice";
import ProfileImg from "../../components/ProfileImg/ProfileImg";
import { NavLink, Outlet } from "react-router-dom";
import AxiosInstance from "../../AxiosInstance/AxiosInstance";

const Profile = () => {
  // const [userData, setUserData] = useState("");
  // const [createdPosts, setCreatedPosts] = useState("");
  // const [savedPosts, setSavedPosts] = useState("");
  // const [selectedTab, setSelectedTab] = useState("created");
  const [tempPic, setTempPic] = useState(null);
  const dispatch = useDispatch();
  const { username, posts, savedPosts, userPic } = useSelector((state) => {
    return state.User;
  });

  useEffect(() => {
    const getDataFromServer = async () => {
      try {
        await AxiosInstance.get(`/image/getuserposts`)
          .then((res) => {
            const { data } = res.data;
            const { posts } = data;
            console.log("user info from Db", data);
            dispatch(updateStatePosts(posts));
            // dispatch(updateState(restUserData));
          })
          .catch((error) => {
            console.log(error);
          });

        // const { data } = resData.data;
      } catch (error) {
        console.log(error);
      }
    };
    getDataFromServer();
  }, [dispatch]);
  useEffect(() => {
    // if (selectedTab === "saved") {
    const getDataFromServer = async () => {
      try {
        // const resData = await axios.get("/image/getsavedposts");
        await AxiosInstance.get(`/image/getsavedposts`)
          .then((res) => {
            const { data } = res.data;
            // console.log("savedpost data form Db", data);
            dispatch(updateStateSavedPosts(data));
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getDataFromServer();
    // }
  }, [dispatch]);

  useEffect(() => {
    console.log(tempPic);
  }, [tempPic]);

  // useEffect(() => {
  //   console.log("local posts", posts);
  //   console.log("local savedPosts", savedPosts);
  //   console.log("local userPic", userPic);
  //   console.log("local username", username);
  //   console.log("local state data", state);
  // }, [posts, savedPosts, state, userPic, username]);

  return (
    <>
      <div className="user_profile minus-nav-100vh">
        <div className="profile-header flex flex-col items-center pt-10">
          <div className="relative profile-pic-main mb-5">
            <div className="  w-32 aspect-square rounded-full overflow-hidden flex justify-center">
              {tempPic ? (
                <ProfileImg
                  src={URL.createObjectURL(tempPic)}
                  alt="pic"
                  absolute={true}
                />
              ) : (
                <ProfileImg
                  src={
                    userPic && `/pic_uploads/${userPic}`
                    // userPic
                    //   ? `/pic_uploads/${userPic}`
                    //   : require("../../image/icons/blank_profile.jpg")
                  }
                  alt="pic"
                />
              )}
            </div>
            <div className="absolute bottom-0 right-1">
              <UserPicUploader setTempPic={(file) => setTempPic(file)} />
            </div>
          </div>
          <div className="profile-username mt-4">
            <h1 className=" capitalize  text-4xl font-semibold">{username}</h1>
          </div>
          <div className="profile-activity mt-2 flex flex-col gap-1 items-center">
            <div className="create-count">{posts?.length} created</div>
            <div className="saved-count ">{savedPosts?.length} saved</div>{" "}
            {/* placeholder */}
          </div>
        </div>
        <div className="profile-pins mt-8">
          <div className="flex flex-col items-center">
            <div className="categpry-selector flex">
              <NavLink to={"saved"}>
                <h3 className={`font-semibold p-2 catgry-link relative `}>
                  saved
                </h3>
              </NavLink>
              {/* <NavLink to={"/created"}> */}
              <NavLink to={"created"}>
                <h3 className={`font-semibold p-2 catgry-link relative `}>
                  created
                </h3>
              </NavLink>

              {/* </NavLink> */}
            </div>
            <div className="user-posts-container mt-16">
              {/* {selectedTab === "saved" ? (
                <UserSavedPosts savedPosts={savedPosts} />
              ) : (
                <UserCreatedPosts
                  createdPosts={posts}
                  userInfo={{ username, userPic }}
                />
              )} */}
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

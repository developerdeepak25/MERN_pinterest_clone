import React, { useEffect, useState } from "react";
import "./Profile.scss";
import axios from "axios";
import UserCreatedPosts from "../../components/UserCreatedPosts/UserCreatedPosts";

import UserSavedPosts from "../../components/UserSavedPosts/UserSavedPosts";
import UserPicUploader from "../../components/UserPicUploader/UserPicUploader";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  updateState,
  updateStateSavedPosts,
  updateStatePosts,
} from "../../store/slices/UserSlice";
import ProfileImg from "../../components/ProfileImg/ProfileImg";

const Profile = () => {
  // const [userData, setUserData] = useState("");
  // const [createdPosts, setCreatedPosts] = useState("");
  // const [savedPosts, setSavedPosts] = useState("");
  const [selectedTab, setSelectedTab] = useState("created");
  const [tempPic, setTempPic] = useState(null);
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state.User;
  });
  const {  username, posts, savedPosts, userPic } = useSelector((state) => {
    return state.User;
  });

  useEffect(() => {
    const getDataFromServer = async () => {
      try {
        // const resData = await fetch("/image/getdata");
        await axios
          .get("/image/getuserposts")
          .then((res) => {
            const { data } = res.data;
            const { posts, savesPosts, ...restUserData } = data;
            console.log('user info from Db' , data);
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
        await axios
          .get("/image/getsavedposts")
          .then((res) => {
            const { data } = res.data;
            // console.log("savedpost data form Db", data);
            dispatch(updateStateSavedPosts(data));
          })
          .catch((error) => {
            console.log(error);
          });

        // console.log(
        //   "🚀 ~ file: Profile.js:10 ~ getDataFromServer ~ resData:",
        //   resData
        // );
        // const { data } = resData.data;
        // setSavedPosts(data);
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

  useEffect(() => {
    console.log("local posts", posts);
    console.log("local savedPosts", savedPosts);
    console.log("local userPic", userPic);
    console.log("local username", username);
    console.log("local state data", state);
  }, [posts, savedPosts, state, userPic, username]);

  return (
    <>
      {/* <h2>{userData.email}</h2> */}
      {/* <h2>{userData.email}</h2>
      {createdPosts &&
        createdPosts.map((post, i) => {
          return (
            <img
              key={i}
              src={`/uploads/${post.image}`} //  http://localhost:5000  can be added at the start but it will work either way
              alt=""
            />
          );
        })}
      <h1>this is the Profile component</h1> */}

      <div className="user_profile minus-nav-100vh">
        <div className="profile-header flex flex-col items-center pt-10">
          <div className="relative profile-pic-main mb-5">
            <div className="  w-32 aspect-square rounded-full overflow-hidden flex justify-center">
             

              {tempPic ? (
                <ProfileImg
                  src={URL.createObjectURL(tempPic)}
                  alt="pic"
                />
              ) : (
                <ProfileImg
                  src={
                    userPic
                      ? `/pic_uploads/${userPic}`
                      : require("../../image/icons/blank_profile.jpg")
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
              <button onClick={() => setSelectedTab("saved")}>
                <h3
                  className={` font-semibold p-2 catgry-link relative ${
                    selectedTab === "saved" && "active"
                  }`}
                >
                  saved
                </h3>
              </button>
              {/* <NavLink to={"/created"}> */}
              <button onClick={() => setSelectedTab("created")}>
                <h3
                  className={` font-semibold p-2 catgry-link relative ${
                    selectedTab === "created" && "active"
                  }`}
                >
                  created
                </h3>
              </button>

              {/* </NavLink> */}
            </div>
            <div className="user-posts-container mt-16">
              {selectedTab === "saved" ? (
                <UserSavedPosts savedPosts={savedPosts} />
              ) : (
                <UserCreatedPosts
                  createdPosts={posts}
                  userInfo={{ username, userPic }}
                />
              )}
              {/* <Routes>
                <Route
                  path="/created"
                  element={
                    <Outlet>
                      <UserCreatedPosts createdPosts={createdPosts} />
                    </Outlet>
                  }
                />
              </Routes> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

// import React, { useEffect, useState } from "react";
// import "./Profile.scss";
// import axios from "axios";
// import UserCreatedPosts from "../../components/UserCreatedPosts/UserCreatedPosts";

// import UserSavedPosts from "../../components/UserSavedPosts/UserSavedPosts";
// import EditSvg from "../../components/Svgs/EditSvg";
// import UserPicUploader from "../../components/UserPicUploader/UserPicUploader";

// const Profile = () => {
//   const [userData, setUserData] = useState("");
//   const [createdPosts, setCreatedPosts] = useState("");
//   const [savedPosts, setSavedPosts] = useState("");
//   const [selectedTab, setSelectedTab] = useState("created");
//   const [tempPic, setTempPic] = useState(null);

//   useEffect(() => {
//     const getDataFromServer = async () => {
//       try {
//         // const resData = await fetch("/image/getdata");
//         const resData = await axios.get("/image/getuserposts");

//         console.log(
//           "🚀 ~ file: Profile.js:10 ~ getDataFromServer ~ resData:",
//           resData
//         );
//         const { data } = resData.data;

//         setCreatedPosts(data.posts);
//         // setSavedPosts(data.savedPosts);
//         const { posts, savesPosts, ...restUserData } = data;
//         setUserData(restUserData);
//         // console.log(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getDataFromServer();
//   }, []);
//   useEffect(() => {
//     // if (selectedTab === "saved") {
//     const getDataFromServer = async () => {
//       try {
//         const resData = await axios.get("/image/getsavedposts");

//         console.log(
//           "🚀 ~ file: Profile.js:10 ~ getDataFromServer ~ resData:",
//           resData
//         );
//         const { data } = resData.data;
//         setSavedPosts(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getDataFromServer();
//     // }
//   }, []);

//   useEffect(() => {
//     console.log(tempPic);
//   }, [tempPic]);

//   return (
//     <>
//       {/* <h2>{userData.email}</h2> */}
//       {/* <h2>{userData.email}</h2>
//       {createdPosts &&
//         createdPosts.map((post, i) => {
//           return (
//             <img
//               key={i}
//               src={`/uploads/${post.image}`} //  http://localhost:5000  can be added at the start but it will work either way
//               alt=""
//             />
//           );
//         })}
//       <h1>this is the Profile component</h1> */}

//       <div className="user_profile minus-nav-100vh">
//         <div className="profile-header flex flex-col items-center pt-10">
//           <div className="relative profile-pic-main mb-5">
//             <div className="  w-32 aspect-square rounded-full overflow-hidden flex justify-center">
//               {/* {userData?.userPic ? (
//                 <img
//                   className="object-cover min-h-full min-w-full"
//                   src={`/pic_uploads/${userData.userPic}`}
//                   alt="pic"
//                 />
//               ) : (
//                 <img
//                   className="object-cover min-h-full min-w-full"
//                   src={
//                     tempPic
//                       ? URL.createObjectURL(tempPic)
//                       : require("../../image/icons/blank_profile.jpg")
//                   }
//                   alt="pic"
//                 />
//               )} */}

//               {tempPic ? (
//                 <img
//                   className="object-cover min-h-full min-w-full"
//                   src={URL.createObjectURL(tempPic)}
//                   alt="pic"
//                 />
//               ) : (
//                 <img
//                   className="object-cover min-h-full min-w-full"
//                   src={
//                     userData?.userPic
//                       ? `/pic_uploads/${userData.userPic}`
//                       : require("../../image/icons/blank_profile.jpg")
//                   }
//                   alt="pic"
//                 />
//               )}
//             </div>
//             <div className="absolute bottom-0 right-1">
//               <UserPicUploader setTempPic={(file) => setTempPic(file)} />
//             </div>
//           </div>
//           <div className="profile-username mt-4">
//             <h1 className=" capitalize  text-4xl font-semibold">
//               {userData.username}
//             </h1>
//           </div>
//           <div className="profile-activity mt-2 flex flex-col gap-1 items-center">
//             <div className="create-count">{createdPosts.length} created</div>
//             <div className="saved-count ">{savedPosts.length} saved</div>{" "}
//             {/* placeholder */}
//           </div>
//         </div>
//         <div className="profile-pins mt-8">
//           <div className="flex flex-col items-center">
//             <div className="categpry-selector flex">
//               <button onClick={() => setSelectedTab("saved")}>
//                 <h3
//                   className={` font-semibold p-2 catgry-link relative ${
//                     selectedTab === "saved" && "active"
//                   }`}
//                 >
//                   saved
//                 </h3>
//               </button>
//               {/* <NavLink to={"/created"}> */}
//               <button onClick={() => setSelectedTab("created")}>
//                 <h3
//                   className={` font-semibold p-2 catgry-link relative ${
//                     selectedTab === "created" && "active"
//                   }`}
//                 >
//                   created
//                 </h3>
//               </button>

//               {/* </NavLink> */}
//             </div>
//             <div className="user-posts-container mt-16">
//               {selectedTab === "saved" ? (
//                 <UserSavedPosts savedPosts={savedPosts} />
//               ) : (
//                 <UserCreatedPosts
//                   createdPosts={createdPosts}
//                   userInfo={userData}
//                 />
//               )}
//               {/* <Routes>
//                 <Route
//                   path="/created"
//                   element={
//                     <Outlet>
//                       <UserCreatedPosts createdPosts={createdPosts} />
//                     </Outlet>
//                   }
//                 />
//               </Routes> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;

import React from "react";
import "./Posts.scss";
import { NavLink } from "react-router-dom";
import SuspenseImg from "../SuspenseImg/SuspenseImg";
import DeleteSvg from "../Svgs/DeleteSvg";
import DeletePost from "./DeletePost";
import ProfileImg from "../ProfileImg/ProfileImg";

const Post = ({ data, userInfo, type }) => {
  const { _id, image, imageTitle, user } = data;
  console.log("🚀 ~ file: Post.js:7 ~ Post ~ _id:", _id);
  const username = userInfo?.username || user?.username;
  const userPic = userInfo?.userPic || user?.userPic;
  console.log(username, data);
  

  return (
    <div className="post-container rounded-xl overflow-hidden mb-4 relative">
      <NavLink to={`/pin/${_id}`} className={"relative "}>
        <SuspenseImg
          className="w-full"
          src={`/uploads/${image}`}
          fileName={image}
          alt={imageTitle}
          height={360}
        />
      </NavLink>

      <div className="creator-container h-full absolute top-0 left-0 right-0 pointer-events-none ">
        {/* <div className="h-full"> */}
        <div className="absolute top-0 left-0 right-0 bottom-0 p-4 flex flex-col ">
          {/* {user.username && ( */}
          <div className="creator-profile flex  w-full mt-auto  items-center justify-between">
            <div
              className={`flex gap-2 items-center w-full  ${
                type === "user-post" ? "max-w-[80%]" : ""
              }`}
            >
              <div className="creator-image rounded-full w-7 aspect-square overflow-hidden opacity-80 shrink-0">
                {userPic ? (
                  <ProfileImg
                    src={`/pic_uploads/${userPic}`}
                    alt={username + "picture"}
                  />
                ) : (
                  <ProfileImg
                    src={require("../../image/icons/blank_profile.jpg")}
                    alt={username + "picture"}
                    className="w-full"
                  />
                )}
              </div>
              <div className=" creator-name text-white opacity-80  capitalize whitespace-nowrap overflow-hidden text-ellipsis">
                {username}
              </div>
            </div>
            {type === "user-post" && <DeletePost id={_id} />}
          </div>
          {/* )} */}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Post;

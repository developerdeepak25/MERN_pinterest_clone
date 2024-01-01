import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LeftArrow from "../../components/Svgs/LeftArrow";
import "./SinglePin.scss";
import SaveButton from "../../components/SinglePinComponents/SaveButton";
import SuspenseImg from "../../components/SuspenseImg/SuspenseImg";

const SinglePin = () => {
  const [postData, setPostData] = useState({});
  const { image, user, imageTitle, imageDescirption, saves } = postData;
  const navigate = useNavigate();

  const { id } = useParams();
  console.log(id);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const getDataFromServer = async () => {
      try {
        const resData = await axios.get(`/image/getpostdata/${id}`);
        console.log(
          "🚀 ~ file: Home.js:10 ~ getDataFromServer ~ resData:",
          resData
        );
        const { postData } = resData.data;
        console.log(postData);
        // setUserData(data);
        setPostData(postData);
      } catch (error) {
        console.log(error);
      }
    };
    getDataFromServer();
  }, [id]);
  return (
    <div className="single-pin-container minus-nav-100vh bg-slate-50">
      {/* <h1>single pin</h1> */}

      <div className="flex h-full justify-center relative">
        <div className="absolute go-back top-7 left-7">
          {/* <NavLink to={"/"}> */}
          <button
            className="left-arrow rounded-full hover:bg-gray-200 p-2  transition"
            onClick={handleGoBack}
          >
            <LeftArrow height={28} />
          </button>
          {/* </NavLink> */}
        </div>
        <div className="pin-viewer rounded-3xl overflow-hidden bg-white  max-w-5xl flex my-14   ">
          <div className="visual-pin-container w-[512px]">
            <SuspenseImg
              className="w-full"
              src={`/uploads/${image}`}
              fileName={image}
              alt="post_image"
              height={500}
            />
          </div>

          <div className=" w-[512px] desc-container px-9">
            <div className="desc-container-header pt-9 pb-3 flex justify-end">
              <SaveButton pinId={id} savedBy={saves} />
            </div>

            <div className="desc-body flex flex-col gap-8">
              <h1 className=" capitalize text-4xl font-semibold">
                {imageTitle}
              </h1>{" "}
              <p className=" text-xl">{imageDescirption}</p>
              {/* same as post compo creator profile but text-black , font-weight , */}
              <div className="creator-profile flex  w-full items-center mt-auto gap-2">
                <div className="creator-image rounded-full w-9 aspect-square overflow-hidden opacity-80 shrink-0">
                  {user?.userPic ? (
                    <img
                      src={`/pic_uploads/${user.userPic}`}
                      alt={user.username}
                    />
                  ) : (
                    <img
                      src={require("../../image/icons/blank_profile.jpg")}
                      alt={user?.username}
                      className="w-full"
                    />
                  )}
                </div>
                <div className="creator-name font-medium  opacity-80  capitalize whitespace-nowrap overflow-hidden text-ellipsis">
                  {user?.username}
                </div>
              </div>
              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePin;

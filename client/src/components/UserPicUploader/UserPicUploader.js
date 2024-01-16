import React, { useRef, useState } from "react";
import EditSvg from "../Svgs/EditSvg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../../store/slices/UserSlice";
import AxiosInstance from "../../AxiosInstance/AxiosInstance";

const UserPicUploader = ({ setTempPic }) => {
  const state = useSelector((state) => {
    return state.User;
  });
  console.log("🚀 ~ file: UserPicUploader.js:11 ~ constst̥ate=useSelector ~ st̥ate:", state)
  const dispatch = useDispatch()
  const inputRef = useRef(null);
  //   const [File, setFile] = useState(null);

  const selectfile = () => {
    inputRef.current.click();
  };

  const postUserPic = async (e) => {
    const File = e.target.files[0];
    console.log(File);
    try {
      const formData = new FormData();
      formData.append("upload_pic_file", File);

      // const resData = await fetch("/image/getdata");
      const response = await AxiosInstance.post("/image/uploaduserpic", formData);
      if (response.status === 200) {
        // console.log("Upload.js", resJson);
        if (response.data.userPic) {
          console.log(response.data.userPic);
          
          dispatch(updateState({userPic:response.data.userPic}))
        }
        console.log(response.data);
      }
      console.log(response.data.message);
    } catch (error) {
      console.log("Failed to upload", error);
    }
  };
  return (
    <div
      className="w-8 aspect-square z-20 rounded-full bg-gray-100 hover:bg-gray-200 grid place-content-center "
      onClick={selectfile}
    >
      <EditSvg height={18} />
      <input
        type="file"
        accept="image/*"
        name="upload_pic_file"
        onChange={(e) => {
          //   setSelectedFile(e.target.files[0]);
          //   setFile(e.target.files[0]);
          postUserPic(e);
          setTempPic(e.target.files[0]);
        }}
        hidden
        ref={inputRef}
        multiple={false}
      />
    </div>
  );
};

export default UserPicUploader;

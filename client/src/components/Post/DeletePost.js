import React from "react";
import DeleteSvg from "../Svgs/DeleteSvg";
import { useDispatch } from "react-redux";
import { deleteStatePost } from "../../store/slices/UserSlice";
import toast from "react-hot-toast";
import AxiosInstance from "../../AxiosInstance/AxiosInstance";
import { deleteFile } from "../../firebase/deleteFile";

const DeletePost = ({ id, imageRef }) => {
  const dispatch = useDispatch();
  const deletePost = async (event) => {
    event.stopPropagation();
    console.log("inside deletePost function");
    try {
      const resData = await AxiosInstance.delete(`/image/deletepost/${id}`)

        deleteFile(imageRef)
      // })
      // console.log('image deleted successfully');
      console.log(
        "🚀 ~ file: Home.js:10 ~ getDataFromServer ~ resData:",
        resData
      );
      if (resData.status === 200) {
        dispatch(deleteStatePost(id));
        toast.success("post deleted successfully");
        console.log("post deleted successfully");
      }
      // const { postData } = resData.data;
      // console.log(postData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="delete-btn-wrapper pointer-events-auto cursor-pointer bg-slate-200 hover:bg-slate-300 rounded-md  shrink-0">
      <div
        className=" h-[28px] p-[6px]"
        onClick={(e) => {
          deletePost(e);
        }}
      >
        <DeleteSvg className=" h-full" />
      </div>
    </div>
  );
};

export default DeletePost;

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const SaveButton = ({ pinId, savedBy }) => {
  const { userId } = useSelector((state) => {
    return state.Auth;
  });

  const [saved, setsaved] = useState(false);
  const [waiting, setwaiting] = useState(false);

  console.log(saved);
  const onClickHandler = async () => {
    try {
      setwaiting(true);
      if (saved) {
        const resData = await axios.get(
          `${process.env.API_URL}/image/unsavepost/${pinId}`
        );
        console.log(
          "🚀 ~ file: SaveButton.js:9 ~ onClickHandler ~ resData:",
          resData
        );
        if (resData.status === 200) {
          setsaved(false);
          toast.success("post unsaved successfully");
        }
        return;
      }

      const resData = await axios.get(
        `${process.env.API_URL}/image/savepost/${pinId}`
      );
      console.log(
        "🚀 ~ file: SaveButton.js:9 ~ onClickHandler ~ resData:",
        resData
      );
      if (resData.status === 200) {
        setsaved(true);
        toast.success("post saved successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setwaiting(false);
    }
  };
  useEffect(() => {
    setsaved(savedBy && savedBy.includes(userId));
    // console.log(savedBy);
  }, [savedBy, userId]);

  return (
    <>
      {/* mentioned classed are in index.scss */}
      <div
        className={`pin-prime-btn ${saved && "saved"} ${
          waiting ? "waiting" : ""
        }`}
      >
        <button onClick={onClickHandler}>{saved ? "saved" : "save"}</button>
      </div>
    </>
  );
};

export default SaveButton;

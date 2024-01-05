import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../store/slices/UserSlice";

export const useFetchUserInfo = () => {
  const { isAuthenticated } = useSelector((state) => {
    return state.Auth;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await axios.get("/image/getuserprofile");
        const { data } = resData.data;
        console.log(
          "useFetchUserInfo",
         resData.data
        );
        if (data) {
          
          dispatch(updateState(data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    isAuthenticated && fetchData();
  },[dispatch, isAuthenticated]);
};

import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import UserSlice from "./slices/UserSlice";

const store = configureStore({
  reducer: {
    Auth: AuthSlice,
    User: UserSlice
  },
});

export default store;

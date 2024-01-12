// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

 const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    isAuthenticated: true,
    userId: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userId = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
    },
  },
});

export const { login, logout } = AuthSlice.actions;


export default AuthSlice.reducer;

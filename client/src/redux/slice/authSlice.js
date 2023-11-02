import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
  userData: JSON.parse(localStorage.getItem("userData")) || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action) => {},
    login: (state, action) => {},
    logout: (state, action) => {},
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;

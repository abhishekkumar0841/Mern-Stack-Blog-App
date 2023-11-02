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
    login: (state, action) => {
      (state.isLoggedIn = true), (state.userData = action?.payload);

      //saved payload and isLoggedIn value in localStorage
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("userData", JSON.stringify(action?.payload));
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.userData = null;

      localStorage.clear();      
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;

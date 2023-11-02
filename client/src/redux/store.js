import { configureStore } from "@reduxjs/toolkit";
import themeSliceReducer from "./slice/themeSlice";
import authSliceReducer from "./slice/authSlice";

const store = configureStore({
  reducer: {
    theme: themeSliceReducer,
    auth: authSliceReducer,
  },
});

export default store;

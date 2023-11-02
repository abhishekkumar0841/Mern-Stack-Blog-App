import { configureStore } from "@reduxjs/toolkit";
import themeSliceReducer from "./slice/themeSlice";
import authSliceReducer from "./slice/authSlice";
import blogSliceReducer from "./slice/blogSlice";
import loadingSliceReducer from "./slice/loadingSlice";

const store = configureStore({
  reducer: {
    theme: themeSliceReducer,
    auth: authSliceReducer,
    blog: blogSliceReducer,
    loader: loadingSliceReducer,
  },
});

export default store;

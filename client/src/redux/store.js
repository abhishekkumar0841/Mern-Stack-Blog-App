import { configureStore } from "@reduxjs/toolkit";
import themeSliceReducer from "./slice/themeSlice";
import authSliceReducer from "./slice/authSlice";
import blogSliceReducer from "./slice/blogSlice";
import loadingSliceReducer from "./slice/loadingSlice";
import commentSliceReducer from "./slice/commentSlice";

const store = configureStore({
  reducer: {
    theme: themeSliceReducer,
    auth: authSliceReducer,
    blog: blogSliceReducer,
    loader: loadingSliceReducer,
    comment: commentSliceReducer,
  },
});

export default store;

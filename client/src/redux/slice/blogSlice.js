import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  blogById: null,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    getBlog: (state, action) => {
      state.blogs = action?.payload;
    },
    getBlogById: (state, action) => {
      state.blogById = action.payload;
    },
  },
});

export const { getBlog, getBlogById } = blogSlice.actions;
export default blogSlice.reducer;

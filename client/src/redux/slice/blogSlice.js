import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  blogById: null,
  myBlog: []
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
    setMyBlog: (state, action)=>{
      state.myBlog = action.payload;
    }
  },
});

export const { getBlog, getBlogById, setMyBlog } = blogSlice.actions;
export default blogSlice.reducer;

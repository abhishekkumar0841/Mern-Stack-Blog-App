import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    getBlog: (state, action) => {
        state.blogs = action?.payload
    },
  },
});

export const { getBlog } = blogSlice.actions;
export default blogSlice.reducer;

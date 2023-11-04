import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minLength: [3, "Title should be greater than 3 characters"],
      maxLength: [30, "Title should not be greater than 30 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minLength: [3, "Title should be greater than 3 characters"],
      maxLength: [60, "Title should not be greater than 30 characters"],
    },
    blogContent: {
      type: String,
      required: [true, "Blog Content is required"],
      trim: true,
      minLength: [10, "Blog content should be greater than 10 characters"],
      maxLength: [1200, "Blog content should not be greater than 1200 characters"],
    },
    blogImage: {
      secure_url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author of this blog is required"]
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;

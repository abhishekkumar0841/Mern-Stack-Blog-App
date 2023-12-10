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
      maxLength: [60, "Title should not be greater than 60 characters"],
    },
    blogContent: {
      type: String,
      required: [true, "Blog Content is required"],
      trim: true,
      minLength: [60, "Blog content should be greater than 60 characters"],
      maxLength: [
        15000,
        "Blog content should not be greater than 15000 characters",
      ],
    },
    blogImage: {
      type: String,
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
      required: [true, "Author of this blog is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;

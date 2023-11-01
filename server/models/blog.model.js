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
    },
    blogImage: {
      secure_url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }],
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;

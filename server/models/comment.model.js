import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  commentText: {
    type: String,
    required: true,
  },
  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  commentedBlog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;

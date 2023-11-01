import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  likedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likedBlog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
});

const Like = mongoose.model("Like", likeSchema);
export default Like;

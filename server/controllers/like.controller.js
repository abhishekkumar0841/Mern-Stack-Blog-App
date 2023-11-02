import Like from "../models/like.model.js";
import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";

const like = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User id is not available",
      });
    }

    const blogId = req.params.id;
    if (!blogId) {
      return res.status(404).json({
        success: false,
        message: "Blog id is not available",
      });
    }

    //check if user is already like the same blog
    const isAlreadyLiked = await Like.findOne({
      likedBy: userId,
      likedBlog: blogId,
    });

    if (isAlreadyLiked) {
      return res.status(400).json({
        success: false,
        message: "You already liked this blog",
      });
    }

    const newLike = new Like({
      likedBy: userId,
      likedBlog: blogId,
    });

    const savedLike = await newLike.save();

    //update like array in blog model
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { $push: { likes: savedLike._id } },
      { new: true }
    )
      .populate("likes")
      .exec();

    //update like array in user model
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { likedBlogs: savedLike._id } },
      { new: true }
    )
      .populate("likedBlogs")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Like successful",
      blog,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const disLike = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User id is not available",
      });
    }

    const blogId = req.params.id;
    if (!blogId) {
      return res.status(404).json({
        success: false,
        message: "Blog id is not available",
      });
    }

    //check user is already liked on this blog or not
    const checkUser = await Like.findOne({
      likedBy: userId,
      likedBlog: blogId,
    });

    if (!checkUser) {
      return res.status(400).json({
        success: false,
        message: "You not liked this blog, so you cannot dislike this",
      });
    }

    //delete that like if user is already liked the blog
    const deletedLike = await Like.findOneAndDelete({
      likedBy: userId,
      likedBlog: blogId,
    });

    //remove this specific like from user model likedBlogs array
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { likedBlogs: deletedLike._id } },
      {
        new: true,
      }
    )
      .populate("likedBlogs")
      .exec();

    //remove this specific like from user model likedBlogs array
    const updateBlog = await Blog.findByIdAndUpdate(
      blogId,
      { $pull: { likes: deletedLike._id } },
      {
        new: true,
      }
    )
      .populate("likes")
      .exec();

    console.log("DELETED LIKE->", deletedLike);

    return res.status(200).json({
      success: true,
      message: "Blog disliked successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { like, disLike };

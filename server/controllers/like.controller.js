import Like from "../models/like.model.js";
import Blog from "../models/blog.model.js";

const like = async (req, res) => {
  try {
    const userId = req.user.id;
    const blogId = req.params.id;
    if (!userId || !blogId) {
      return res.status(404).json({
        success: false,
        message: "User id or blog id is missing",
      });
    }

    const blog = await Blog.findById(blogId);

    const isUser = blog.likes.includes(userId);

    if (isUser) {
      return res.status(404).json({
        success: false,
        message: "You cannot like twice on same blog",
      });
    }

    const newBlog = await Blog.findByIdAndUpdate(
      blogId,
      { $push: { likes: userId } },
      { new: true }
    )
      .populate("likes")
      .exec();
      console.log('NEW BLOG:', newBlog)

    const like = await Like.create({
      user: userId,
      blog: blogId,
    });

    return res.status(200).json({
      success: true,
      message: "Like successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeLike = async (req, res)=>{
  try {
    const userId = req.user.id;
    const blogId = req.params.id;
    if (!userId || !blogId) {
      return res.status(404).json({
        success: false,
        message: "User id or blog id is missing",
      });
    }

    const blog = await Blog.findById(blogId)
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: " blog is missing",
      });
    }

    const checkUser = blog.likes.includes(userId)
    if(!checkUser){
      return res.status(404).json({
        success: false,
        message: "You not liked this blog yet",
      });
    }

    const updateBlog = await Blog.findByIdAndUpdate(blogId, {$pull: {likes: userId}}, {new: true}).populate('likes').exec();

    const like = await Like.findOneAndDelete({
      user: userId,
      blog: blogId
    })

    return res.status(200).json({
      success: true,
      message: 'Like removed successfully',
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const allLikedUsers = async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!blogId) {
      return res.status(404).json({
        success: false,
        message: "Blog id is not available",
      });
    }

    const blog = await Blog.findById(blogId).populate("likes").exec();

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "This Blog  is not available",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All Liked Users get successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const checkUserLikeOnBlog = async (req, res) => {
  try {
    const userId = req.user.id;
    const blogId = req.params.id;
    if (!userId || !blogId) {
      return res.status(404).json({
        success: false,
        message: "User id or Blog id in not available",
      });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "This blog is not available",
      });
    }

    console.log("blog", blog);

    const isLiked = await blog.likes.includes(userId);
    console.log("isLiked", isLiked);

    return res.status(200).json({
      success: true,
      message: "User likes fetched successfully",
      isLiked,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { like, allLikedUsers,removeLike, checkUserLikeOnBlog };

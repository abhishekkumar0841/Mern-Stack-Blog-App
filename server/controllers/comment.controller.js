import Comment from "../models/comment.model.js";
import Blog from "../models/blog.model.js";

const createComment = async (req, res) => {
  const userId = req?.user?.id;
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

  const { commentText } = req.body;
  if (!commentText) {
    return res.status(404).json({
      success: false,
      message: "Comment should not be empty",
    });
  }

  try {
    const comment = new Comment({
        commentText, commentedBlog:blogId, commentedBy:userId
    })

    const savedComment = await comment.save()

    const blog = await Blog.findByIdAndUpdate(blogId, {$push: {comments: savedComment._id}}, {new:true}).populate('comments').exec()

    return res.status(200).json({
        success: true,
        message: "Comment successful",
        blog
      });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const editComment = async(req, res)=>{
try {
    
} catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
}
}

const deleteComment = async(req, res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
    }
    }

export { createComment, editComment, deleteComment };

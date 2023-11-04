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

  const { text } = req.body;
  if (!text) {
    return res.status(404).json({
      success: false,
      message: "Comment should not be empty",
    });
  }

  try {
    const comment = new Comment({
        text, author: userId
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

const allComments = async (req, res)=>{
  try {
    const blogId = req.params.id;
    if (!blogId) {
      return res.status(404).json({
        success: false,
        message: "Blog id is not available",
      });
    }
    
    const blog = await Blog.findById(blogId).populate('comments').exec()

    if(!blog){
        return res.status(404).json({
          success: false,
          message: "This blog is not available",
        });
      }

      return res.status(200).json({
        success: true,
        message: "All blogs comments are populated successfully",
      });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

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

export { createComment, allComments, editComment, deleteComment };

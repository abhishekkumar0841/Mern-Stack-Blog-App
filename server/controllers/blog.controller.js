import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";

const createBlog = async (req, res) => {
  const { title, description, blogContent } = req.body;
  if (!title || !description || !blogContent) {
    return res.status(404).json({
      success: false,
      message: "All fields are required",
    });
  }
  
  const userId = req.user.id;

  if (!userId) {
    return res.status(404).json({
      success: false,
      message: "User id is not available",
    });
  }

  try {
    const blog = new Blog({
      title,
      description,
      blogContent,
      postedBy: userId,
    });

    const savedBlog = await blog.save();

    const addBlogInUserModel = await User.findByIdAndUpdate(
      userId,
      { $push: { postedBlog: savedBlog._id } },
      { new: true }
    )
      .populate("postedBlog")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Blog posted successfully",
      // savedBlog,
      addBlogInUserModel
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBlog = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.user.id;

  if (!userId) {
    return res.status(404).json({
      success: false,
      message: "This user does not exists",
    });
  }
  const { title, description, blogContent } = req.body;
  if (!blogId) {
    return res.status(404).json({
      success: false,
      message: "This blog does not exists",
    });
  }

  const blog = await Blog.findById(blogId);

  //compare userId to postedBy properties of blog model
  const postedById = blog.postedBy.toString();
  console.log("CHECK BLOG POSTED BY-->", postedById);

  //only allow to update blog to that user who posted this blog
  if (postedById !== userId) {
    return res.status(404).json({
      success: false,
      message: "You cannot update this blog!",
    });
  }

  if (title || description || blogContent) {
    try {
      blog.title = title;
      blog.description = description;
      blog.blogContent = blogContent;

      const updatedBlog = await blog.save();

      return res.status(200).json({
        success: true,
        message: "Blog updated successfully",
        updatedBlog,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    return res.status(404).json({
      success: false,
      message: "Provide something for update",
    });
  }
};

const deleteBlog = async (req, res) => {
  const userId = req.user.id;
  const blogId = req.params.id;

  if (!userId) {
    return res.status(404).json({
      success: false,
      message: "User id in not available",
    });
  }

  if (!blogId) {
    return res.status(404).json({
      success: false,
      message: "This blog id is not available",
    });
  }

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "This blog is not available",
      });
    }

    //compare userId to postedBy properties of blog model
    const postedById = blog?.postedBy?.toString();
    console.log("CHECK BLOG POSTED BY-->", postedById);

    //only allow to update blog to that user who posted this blog
    if (postedById !== userId) {
      return res.status(404).json({
        success: false,
        message: "You cannot delete this blog!",
      });
    }

    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    const updateInUser = await User.findByIdAndUpdate(userId, {$pull: {postedBlog: deletedBlog._id}}, {new: true})

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      updateInUser
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const userBlog = async (req, res) => {
  try {
    const userId = req.user.id;
    if(!userId){
      return res.status(404).json({
        success: false,
        message: 'User id is not available',
      });
    }

    const user = await User.findById(userId).populate('postedBlog').exec()
    console.log('USER SPECIFIC BLOGS-->', user)

    if(!user || !user.postedBlog || user.postedBlog.length === 0){
      return res.status(404).json({
        success: false,
        message: 'Blogs are not available',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Your blog fetched successfully',
      userBlogs: user.postedBlog
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const allBlogs = async (req, res) => {
  try {
    // const blogs = await Blog.find({}).populate('postedBy').exec();
    const blogs = await Blog.find({}).populate({
      path: 'postedBy',
      select: 'firstName lastName',
    });
    console.log("Blogs are-->", blogs);

    return res.status(200).json({
      success: true,
      message: "All blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createBlog, allBlogs, updateBlog, deleteBlog, userBlog };

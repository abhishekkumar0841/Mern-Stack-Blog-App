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
      author: userId,
    });

    const savedBlog = await blog.save();

    await savedBlog.populate("author");

    const addBlogInUserModel = await User.findByIdAndUpdate(
      userId,
      { $push: { blog: savedBlog._id } },
      { new: true }
    )
      .populate("blog")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Blog posted successfully",
      savedBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBlog = async (req, res) => {
  const blogId = req.params.id;
  if (!blogId) {
    return res.status(404).json({
      success: false,
      message: "Blog id does not exists",
    });
  }

  const userId = req.user.id;
  if (!userId) {
    return res.status(404).json({
      success: false,
      message: "User id is not exists",
    });
  }
  const { title, description, blogContent } = req.body;

  const blog = await Blog.findById(blogId);

  //compare userId to postedBy properties of blog model
  const authorId = blog.author.toString();
  console.log("CHECK BLOG POSTED BY-->", authorId);

  //only allow to update blog to that user who posted this blog
  if (authorId !== userId) {
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

    //compare userId to author properties of blog model
    const authorId = blog?.author?.toString();
    console.log("CHECK BLOG POSTED BY-->", authorId);

    //only allow to update blog to that user who posted this blog
    if (authorId !== userId) {
      return res.status(404).json({
        success: false,
        message: "You cannot delete this blog!",
      });
    }

    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    const updateInUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { blog: deletedBlog._id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      updateInUser,
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
    console.log("USER ID:", userId);
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User id is not available",
      });
    }

    const blog = await Blog.find({ author: userId }).populate('author').exec();

    return res.status(200).json({
      success: true,
      message: "All your blogs fetched successfully",
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

const allBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .populate({
        path: "author",
        select: "firstName lastName",
      })
      .exec();
    // console.log("Blogs are-->", blogs);

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

const getBlogById = async (req, res) => {
  const blogId = req.params.id;
  if (!blogId) {
    return res.status(404).json({
      success: false,
      message: "Blog id is not available",
    });
  }
  try {
    const blog = await Blog.findById(blogId)
      .populate({
        path: "author",
      })
      .exec();
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "This blog is not exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createBlog, allBlogs, updateBlog, deleteBlog, userBlog, getBlogById };

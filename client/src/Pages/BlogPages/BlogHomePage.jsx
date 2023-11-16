import React, { useEffect } from "react";
import HomeLayout from "../../Layout/HomeLayout";
import axiosInstance from "../../Helper/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { getBlog } from "../../redux/slice/blogSlice";
import { toast } from "react-hot-toast";
import { setLoading } from "../../redux/slice/loadingSlice";
import BlogCard from "../../Components/BlogComponents/BlogCard";
import Loader from "../../Components/Loader";

const BlogHomePage = () => {
  const dispatch = useDispatch();

  const { blogs } = useSelector((state) => state.blog);
  const { loading } = useSelector((state) => state.loader);
  // console.log("Blogs from state->", blogs);

  async function fetchBlog() {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get("/blog");
      // console.log("RESPONSE OF BLOGS->", response);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        const blog = dispatch(getBlog(response?.data?.blogs));
        // console.log("CHECKING ALL BLOGS", blog);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] max-w-[1400px] mx-auto py-10 px-2 flex gap-10 flex-wrap justify-center">
        {loading ? (
          <div className=" min-h-[80vh] max-w-[1400px] mx-auto py-10 flex items-center justify-center">
            <div>
              <Loader/>
            </div>
          </div>
        ) : blogs.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <div>
            <h1 className=" text-4xl font-bold tracking-widest dark:text-gray-200 text-red-900">
              No Blogs Available
            </h1>
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default BlogHomePage;

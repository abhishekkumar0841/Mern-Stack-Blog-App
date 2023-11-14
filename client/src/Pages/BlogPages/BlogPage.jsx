import React, { useEffect } from "react";
import HomeLayout from "../../Layout/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../Helper/axiosInstance";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getBlogById } from "../../redux/slice/blogSlice";
import { setLoading } from "../../redux/slice/loadingSlice";
import BlogTemplate from "../../Components/BlogComponents/BlogTemplate";

const BlogPage = () => {
  const params = useParams();
  const id = params.id;
  // console.log("PARAMS->", id);

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.loader);

  useEffect(() => {
    (async function () {
      dispatch(setLoading(true));
      const response = await axiosInstance.get(`/blog/${id}`);
      // console.log("RESPONSE OF BLOG BY ID->", response);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        const { blog } = response?.data;
        const res = await dispatch(getBlogById(blog));
        // console.log("RES OF DISPATCH OF BLOG BY ID->", res);
        dispatch(setLoading(false));
      }
    })();
  }, []);

  return (
    <HomeLayout>
        {loading && (
          <div className=" min-h-[80vh] flex items-center justify-center  ">
            <h1 className=" text-4xl dark:text-gray-200 text-gray-900 transition-all duration-300 ease-in-out">Loading...</h1>
          </div>
        )}
        <BlogTemplate />
    </HomeLayout>
  );
};

export default BlogPage;

import React, { useEffect } from "react";
import HomeLayout from "../../Layout/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../Helper/axiosInstance";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getBlogById } from "../../redux/slice/blogSlice";
import { setLoading } from "../../redux/slice/loadingSlice";
import BlogTemplate from "../../Components/BlogComponents/BlogTemplate";
import Loader from "../../Components/Loader";

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
          <div className=" min-h-[90vh] flex items-center justify-center  ">
            <div>
              <Loader/>
            </div>
          </div>
        )}
        <BlogTemplate />
    </HomeLayout>
  );
};

export default BlogPage;

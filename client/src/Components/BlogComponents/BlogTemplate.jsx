import React from "react";
import { useSelector } from "react-redux";
import BlogCardFooter from "./BlogCardFooter";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import BlogLogo from "../../assets/images/blogLogo.png";

const BlogTemplate = () => {
  const { blogById } = useSelector((state) => state.blog);
  const authorAvatar = blogById?.author?.avatar?.secure_url;
  const blogImage = blogById?.blogImage;

  const navigate = useNavigate();

  return (
    <div className=" min-h-[90vh] px-2 flex items-center justify-center ">
      <div className="w-full max-w-[800px] mx-auto py-6 dark:text-gray-200 text-gray-900 transition-all duration-300 ease-in-out shadow-[0_0_10px_gray] my-10 ">
        <div className=" relative px-5 py-3">
          <div onClick={() => navigate(-1)}>
            <BsFillArrowLeftCircleFill className=" text-4xl cursor-pointer" />
          </div>
          <div className=" text-center">
            <h1 className=" text-3xl font-bold capitalize  w-1/2 mx-auto">
              {blogById?.title}
            </h1>
            <p className=" dark:text-gray-600 text-gray-400 font-semibold">
              . . By . .
            </p>
            <p className=" uppercase text-xl font-semibold">
              {blogById?.author?.firstName} {blogById?.author?.lastName}
            </p>
          </div>
          <div className=" absolute right-5 top-4 ">
            <img src={authorAvatar} alt="" width={80} className=" rounded-md" />
          </div>
        </div>
        {/* description & content section */}
        <div className=" px-5 py-3 text-center space-y-4 text-xl">
          <p className="font-bold capitalize">{blogById?.description}</p>
          <img
            src={blogImage ? blogImage : BlogLogo}
            alt="Blog Image"
            className=" w-full h-72 object-fill rounded-xl"
          />
          <p dangerouslySetInnerHTML={{ __html: blogById?.blogContent }} />
        </div>

        {/* Blog card footer */}
        <BlogCardFooter />
      </div>
    </div>
  );
};

export default BlogTemplate;

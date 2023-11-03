import React from "react";
import { useSelector } from "react-redux";

const BlogTemplate = () => {
  const { blogById } = useSelector((state) => state.blog);
  console.log("BLOG BY ID-->", blogById);

  return (
    <div className=" min-h-[80vh] flex items-center justify-center ">
      <div className="w-full max-w-[800px] mx-auto py-6 dark:text-gray-200 text-gray-900 transition-all duration-300 ease-in-out shadow-[0_0_10px_gray] my-10 ">
        <div className=" relative px-5 py-3">
          <div className=" text-center">
            <h1 className=" text-3xl font-bold capitalize  w-1/2 mx-auto">
              {blogById?.title}
            </h1>
            <p className=" dark:text-gray-600 text-gray-400 font-semibold">
              . . By . .
            </p>
            <p className=" uppercase text-xl font-semibold">
              {blogById?.postedBy?.firstName} {blogById?.postedBy?.lastName}
            </p>
          </div>
          <div className=" absolute right-5 top-4 ">
            <img
              src={blogById?.postedBy?.avatar?.secure_url}
              alt=""
              width={100}
              className=" rounded-md"
            />
          </div>
        </div>
        {/* description & content section */}
        <div className=" px-5 py-3 text-center space-y-4 text-xl">
          <p className="font-bold">{blogById.description}</p>
          <p>{blogById.blogContent}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogTemplate;

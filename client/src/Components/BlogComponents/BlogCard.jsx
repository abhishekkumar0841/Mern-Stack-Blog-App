import React from "react";
import blogLogo from "../../assets/images/blogLogo.png";
import { useNavigate } from "react-router-dom";
import { BiSolidComment, BiSolidLike } from "react-icons/bi";
import { useDispatch } from "react-redux";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleCardClick = ()=>{
    navigate(`/blogs/${blog._id}`)
  }
  return (
    <div
      className="dark:text-gray-200 text-gray-900 transition-all duration-300 ease-in-out shadow-[0_0_10px_gray] w-[400px] h-[400px] overflow-hidden rounded-md py-6 px-4 flex flex-col items-center gap-6 hover:scale-105 cursor-pointer"
      onClick={handleCardClick}
    >
      <div>
        <h1 className=" text-center text-2xl font-bold">{blog?.title}</h1>
        <h2 className=" text-center text-xl font-semibold">
          {blog?.description}
        </h2>
      </div>
      <div>
        <img src={blogLogo} alt="Blog Image" width={100} />
      </div>
      <div>
        <p className=" text-center">{blog.blogContent.substring(0, 100)}...</p>
      </div>

      <div className=" flex flex-col gap-2 w-full">
        <div className=" flex  justify-between items-center">
          <p className=" flex items-center gap-3 text-xl font-semibold">
            Total
            <BiSolidLike />
            {blog?.likes?.length}
          </p>
          <p className=" flex items-center gap-3 text-xl font-semibold">
            Total
            <BiSolidComment />
            {blog?.comments?.length}
          </p>
        </div>
        <div className=" text-center">
          <p className=" capitalize font-semibold text-xl">
            Author:{" "}
            <span className=" underline">
              {blog?.author?.firstName} {blog?.author?.lastName}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

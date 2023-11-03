import React, { useState } from "react";
import { BiCommentAdd } from "react-icons/bi";
import { SlDislike, SlLike } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const BlogCardFooter = () => {
    const {blogById} = useSelector(state=>state.blog)
  const [like, setLike] = useState(false);
  const likeHandler = () => {
    setLike(!like);
  };
  return (
    <div className="flex justify-between py-3 mt-5 w-[90%] mx-auto border px-5">
      <div className=" text-2xl flex items-center gap-5 ">
        {like ? (
          <SlLike
            className=" text-3xl dark:text-cyan-300 text-indigo-500 transition-all duration-300 ease-in-out hover:scale-125 cursor-pointer"
            onClick={likeHandler}
          />
        ) : (
          <SlDislike className=" text-3xl text-red-400 transition-all duration-300 ease-in-out hover:scale-125 cursor-pointer" onClick={likeHandler} />
        )}
        <p className=" font-semibold text-xl">
            {blogById?.likes?.length} likes
        </p>
      </div>

      {/* TODO */}
      {/* <div>
        <p>Created At: {new Date(getBlogById?.createdAt)?.toString()}</p>
      </div> */}

      <Link to={'/comments'} className=" flex justify-end gap-5 items-center  cursor-pointer group">
        <BiCommentAdd className="text-3xl group-hover:scale-125 transition-all duration-300 ease-in-out" />{" "}
        <span className=" font-semibold text-xl">
           {blogById?.comments?.length} Comment</span>
      </Link>
    </div>
  );
};

export default BlogCardFooter;

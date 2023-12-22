import React from "react";
import { BiCommentAdd, BiEdit, BiTrash } from "react-icons/bi";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

import useProfile from "../../hooks/useProfile";
import { Link } from "react-router-dom";
import useBlogCardFooter from "../../hooks/useBlogCardFooter";

const BlogCardFooter = () => {
  const [
    isLike,
    fetchLike,
    fetchRemoveLike,
    blogById,
    id,
    handleEdit,
    handleDelete,
  ] = useBlogCardFooter();

  const [userData] = useProfile();
  // console.log("User data---", userData);

  const blogOfThisUser = userData?.blog?.includes(id);
  // console.log("check blogOfThisUser:", blogOfThisUser);

  return (
    <div className="flex justify-between py-3 mt-5 w-[90%] mx-auto shadow-[0_0_10px_black] px-5 flex-wrap">
      <div className=" text-2xl flex items-center gap-5 w-full justify-center xs:w-auto mb-3 xs:mb-0  ">
        {!isLike ? (
          <div className=" h-14 w-14  rounded-full bg-gray-50 flex items-center justify-center">
            <FcLikePlaceholder
              onClick={fetchLike}
              className=" text-3xl dark:text-cyan-300 text-indigo-500 transition-all duration-300 ease-in-out hover:scale-125 cursor-pointer"
            />
          </div>
        ) : (
          <div className="  h-14 w-14 bg-gray-50  rounded-full flex items-center justify-center">
            <FcLike
              onClick={fetchRemoveLike}
              className=" text-3xl text-red-400 transition-all duration-300 ease-in-out hover:scale-125 cursor-pointer"
            />
          </div>
        )}
        <p className=" font-semibold text-xl">
          {blogById?.likes?.length} likes
        </p>
      </div>

      <Link
        to={`/${id}/comments`}
        className=" flex justify-center xs:justify-end gap-5 items-center w-full xs:w-auto  cursor-pointer group"
      >
        <BiCommentAdd className="text-3xl group-hover:scale-125 transition-all duration-300 ease-in-out" />{" "}
        <span className=" font-semibold text-xl">
          {blogById?.comments?.length} Comment
        </span>
      </Link>

      {blogOfThisUser && (
        <div className=" text-2xl font-bold flex mt-5 xs:mt-0 gap-8 w-full justify-center  md:w-auto">
          <button
            onClick={handleEdit}
            className="group border-2 dark:border-gray-200 border-gray-900 rounded-full p-1 h-12 w-12 flex items-center justify-center"
          >
            <BiEdit className=" group-hover:scale-125 transition-all duration-300 ease-in-out" />
          </button>
          <button
            onClick={handleDelete}
            className="group border-2 dark:border-gray-200 border-gray-900 rounded-full p-1 h-12 w-12 flex items-center justify-center"
          >
            <BiTrash className="group-hover:scale-125 transition-all duration-300 ease-in-out" />
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogCardFooter;

import React from "react";
import HomeLayout from "../../Layout/HomeLayout";
import { BiComment, BiPlus } from "react-icons/bi";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Loader from "../../Components/Loader";
import useComment from "../../hooks/useComment";

const CommentPage = () => {
  const [loading, navigate, handleComment, input, handleChange, comments] =
    useComment();
  return (
    <HomeLayout>
      <div className=" flex items-center justify-center min-h-[90vh] dark:text-gray-200 text-gray-900 transition-all duration-300 ease-in-out px-2">
        {loading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div className="w-full max-w-[1000px] mx-auto p-6 dark:text-gray-200 text-gray-900 transition-all duration-300 ease-in-out shadow-[0_0_10px_gray] my-10 flex flex-col items-center gap-4">
            <div className=" relative w-full">
              <h1 className=" text-4xl font-bold text-center tracking-widest">
                Comments of this blog
              </h1>
              <BsFillArrowLeftCircleFill
                onClick={() => navigate(-1)}
                className=" text-4xl cursor-pointer absolute left-0 top-1 hidden sm:block"
              />
            </div>
            <form
              onSubmit={handleComment}
              className="flex flex-col w-full items-center gap-2"
            >
              <input
                className=" rounded-md w-full h-16 resize-none px-4 py-2 overflow-y-scroll bg-transparent border border-gray-900 dark:border-gray-200"
                name="text"
                id="comment"
                value={input.text}
                onChange={handleChange}
                placeholder="Write your comment here..."
              />
              <button
                type="submit"
                className=" rounded-sm flex items-center w-fit bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 ease-in-out px-3 gap-2 py-1 font-bold text-xl"
              >
                <BiPlus /> <span>Comment</span>
              </button>
            </form>
            <div className="w-full px-2 py-1 gap-3">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <React.Fragment key={comment?._id}>
                    <h1 className="flex items-center gap-3 font-bold capitalize">
                      <img
                        src={comment?.author?.avatar?.secure_url}
                        alt=""
                        width={40}
                        className=" rounded-full"
                      />
                      {comment?.author?.firstName} {comment?.author?.lastName}{" "}
                    </h1>

                    <li className=" text-lg mb-1 font-semibold tracking-normal flex items-center px-10 gap-5">
                      <BiComment />
                      <p>{comment.text}</p>
                    </li>

                    <div className=" w-full h-[2px] bg-gray-300 dark:bg-gray-700 mb-2"></div>
                  </React.Fragment>
                ))
              ) : (
                <p className=" text-2xl font-semibold tracking-wide text-center">
                  No anyone commented on this post yet!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default CommentPage;

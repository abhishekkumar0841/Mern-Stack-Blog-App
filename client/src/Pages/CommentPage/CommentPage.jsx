import React, { useEffect, useState } from "react";
import HomeLayout from "../../Layout/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../Helper/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { setComments } from "../../redux/slice/commentSlice";
import { setLoading } from "../../redux/slice/loadingSlice";
import { BiComment, BiPlus } from "react-icons/bi";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const CommentPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.loader);
  const { comments } = useSelector((state) => state.comment);
  // console.log("COMMENTS:", comments);

  useEffect(() => {
    (async () => {
      try {
        dispatch(setLoading(true));
        const response = await axiosInstance.get(`/blog/comment/${id}`);
        // console.log("response of comments:", response);
        if (response?.data?.success) {
          toast.success(response?.data?.message);
          const res = await dispatch(setComments(response?.data));
          // console.log("dispatch of comment:", res);
          dispatch(setLoading(false));
        }
      } catch (error) {
        // console.log(error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
        dispatch(setLoading(false));
      }
    })();
  }, []);

  const [input, setInput] = useState({
    text: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/blog/comment/${id}`, input);
      // console.log("RESPONSE OF COMMENT POST:", response);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setInput({
          text: "",
        });
        const aaa = await dispatch(setComments(response?.data));
        console.log('aaa:', aaa);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <HomeLayout>
      <div className=" flex items-center justify-center min-h-[90vh] dark:text-gray-200 text-gray-900 transition-all duration-300 ease-in-out px-2">
        {loading ? (
          <h1 className=" text-4xl ">Loading...</h1>
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
              <textarea
                className=" rounded-md w-full h-16 resize-none px-4 py-2 overflow-y-scroll bg-transparent border border-gray-900 dark:border-gray-200"
                name="text"
                id="comment"
                value={input.text}
                onChange={handleChange}
                placeholder="Write your comment here..."
              ></textarea>
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
                      <img src={comment?.author?.avatar?.secure_url} alt="" width={40} className=" rounded-full" />
                      {comment?.author?.firstName} {comment?.author?.lastName}{" "}
                    </h1>

                    <li className=" text-lg mb-1 font-semibold tracking-normal flex items-center px-10 gap-5">
                    <BiComment /><p>{comment.text}</p>
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

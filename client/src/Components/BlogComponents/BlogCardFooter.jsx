import React, { useEffect, useState } from "react";
import { BiCommentAdd, BiEdit, BiTrash } from "react-icons/bi";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../Helper/axiosInstance";
import { toast } from "react-hot-toast";
import { getBlogById } from "../../redux/slice/blogSlice";

const BlogCardFooter = () => {
  const params = useParams();
  const id = params.id;

  const [isLike, setIsLike] = useState(null);
  console.log("CHECK IS_LIKE STATE:", isLike);

  const { blogById } = useSelector((state) => state.blog);
  const { userData } = useSelector((state) => state.auth);
  console.log("USER DATA IN BLOG FOOTER:", userData);

  const blogOfThisUser = userData?.blog?.includes(id);
  console.log("check blogOfThisUser:", blogOfThisUser);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    (async function () {
      const res = await axiosInstance.get(`/blog/like/user/${id}`);
      console.log("res of useEffect in footer blog", res.data);
      if (res?.data?.success) {
        setIsLike(res?.data?.isLiked);
        toast.success(res?.data?.message);
      }
    })();
  }, [blogById]);

  const fetchLike = async () => {
    try {
      const response = await axiosInstance.post(`/blog/like/${blogById?._id}`);
      if (response?.data?.success) {
        toast.success(response?.data?.message);

        //fetch blogById here again for updating again in blogById state
        const response2 = await axiosInstance.get(`/blog/${blogById._id}`);
        if (response2?.data?.success) {
          const res = await dispatch(getBlogById(response2?.data?.blog));
          console.log("res of again blog", res);
          toast.success(response2?.data?.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchRemoveLike = async () => {
    try {
      const response = await axiosInstance.delete(`/blog/like/${blogById._id}`);
      console.log("response of remove like:", response);
      if (response?.data?.success) {
        toast.success(response?.data?.message);

        const response2 = await axiosInstance.get(`/blog/${blogById._id}`);
        if (response2?.data?.success) {
          const res = await dispatch(getBlogById(response2?.data?.blog));
          console.log("res of again blog", res);
          toast.success(response2?.data?.message);
        }
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  const handleEdit =()=>{
    navigate(`/editblog/${id}`)
  }

  const handleDelete = async ()=>{
    console.log('clicked')
    try {
      const response = await axiosInstance.delete(`/blog/${id}`)
      console.log('res of delete:', response)
      if(response?.data?.success){
        toast.success(response?.data?.message)
        navigate('/myblogs')
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div className="flex justify-between py-3 mt-5 w-[90%] mx-auto shadow-[0_0_10px_black] px-5">
      <div className=" text-2xl flex items-center gap-5 ">
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

      {/* TODO */}
      {/* <div>
        <p>Created At: {new Date(getBlogById?.createdAt)?.toString()}</p>
      </div> */}

      <Link
        to={`/${id}/comments`}
        className=" flex justify-end gap-5 items-center  cursor-pointer group"
      >
        <BiCommentAdd className="text-3xl group-hover:scale-125 transition-all duration-300 ease-in-out" />{" "}
        <span className=" font-semibold text-xl">
          {blogById?.comments?.length} Comment
        </span>
      </Link>

      {blogOfThisUser && (
        <div className=" text-2xl font-bold flex gap-8">
          <button onClick={handleEdit} className="group border-2 dark:border-gray-200 border-gray-900 rounded-full p-1 h-12 w-12 flex items-center justify-center">
            <BiEdit className=" group-hover:scale-125 transition-all duration-300 ease-in-out"/>
          </button>
          <button onClick={handleDelete} className="group border-2 dark:border-gray-200 border-gray-900 rounded-full p-1 h-12 w-12 flex items-center justify-center">
            <BiTrash className="group-hover:scale-125 transition-all duration-300 ease-in-out"/>
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogCardFooter;

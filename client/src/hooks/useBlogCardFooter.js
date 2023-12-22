import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { getBlogById } from '../redux/slice/blogSlice'; 
import axiosInstance from "../Helper/axiosInstance";
import { useEffect, useState } from "react";

const useBlogCardFooter = () => {
  const params = useParams();
  const id = params.id;

  const [isLike, setIsLike] = useState(null);
  // console.log("CHECK IS_LIKE STATE:", isLike);

  const { blogById } = useSelector((state) => state.blog);
  // const { userData } = useSelector((state) => state.auth);
  // console.log("USER DATA IN BLOG FOOTER:", userData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      const res = await axiosInstance.get(`/blog/like/user/${id}`);
      // console.log("res of useEffect in footer blog", res.data);
      if (res?.data?.success) {
        setIsLike(res?.data?.isLiked);
        toast.success(res?.data?.message);
      }
    })();
  }, [blogById]);

  const fetchLike = async () => {
    toast.loading("Liking Blog");
    try {
      const response = await axiosInstance.post(`/blog/like/${blogById?._id}`);
      if (response?.data?.success) {
        toast.dismiss();
        toast.success(response?.data?.message);

        //fetch blogById here again for updating again in blogById state
        const response2 = await axiosInstance.get(`/blog/${blogById._id}`);
        if (response2?.data?.success) {
          const res = await dispatch(getBlogById(response2?.data?.blog));
          // console.log("res of again blog", res);
          toast.success(response2?.data?.message);
        }
      }
    } catch (error) {
      toast.dismiss();
      // console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchRemoveLike = async () => {
    toast.loading("Removing like..");
    try {
      const response = await axiosInstance.delete(`/blog/like/${blogById._id}`);
      // console.log("response of remove like:", response);
      if (response?.data?.success) {
        toast.dismiss();
        toast.success(response?.data?.message);

        const response2 = await axiosInstance.get(`/blog/${blogById._id}`);
        if (response2?.data?.success) {
          const res = await dispatch(getBlogById(response2?.data?.blog));
          // console.log("res of again blog", res);
          toast.success(response2?.data?.message);
        }
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data?.message);
      // console.log(error?.response?.data?.message);
    }
  };

  const handleEdit = () => {
    navigate(`/editblog/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you want to delete this blog!")) {
      // console.log('clicked')
      toast.loading("Wait, blog deleting...");
      try {
        const response = await axiosInstance.delete(`/blog/${id}`);
        // console.log('res of delete:', response)
        if (response?.data?.success) {
          toast.dismiss();
          toast.success(response?.data?.message);
          navigate("/myblogs");
        }
      } catch (error) {
        toast.dismiss();
        // console.log(error)
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return [
    isLike,
    fetchLike,
    fetchRemoveLike,
    blogById,
    id,
    handleEdit,
    handleDelete,
  ];
};

export default useBlogCardFooter;

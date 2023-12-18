import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { setComments } from "../redux/slice/commentSlice";
import { setLoading } from "../redux/slice/loadingSlice";
import { useEffect, useState } from "react";
import axiosInstance from "../Helper/axiosInstance";

const useComment = () => {
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
    toast.loading("Wait, posting comment...");
    try {
      const response = await axiosInstance.post(`/blog/comment/${id}`, input);
      // console.log("RESPONSE OF COMMENT POST:", response);
      if (response?.data?.success) {
        toast.dismiss();
        toast.success(response?.data?.message);
        setInput({
          text: "",
        });
        await dispatch(setComments(response?.data));
        // console.log("aaa:", aaa);
      }
    } catch (error) {
      // console.log(error);
      toast.dismiss();
      toast.error(error?.response?.data?.message);
    }
  };
  return [loading, navigate, handleComment, input, handleChange, comments];
};

export default useComment;

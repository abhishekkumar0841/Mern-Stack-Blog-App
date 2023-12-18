import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../Helper/axiosInstance";
import { useEffect, useState } from "react";

const useEditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    blogContent: "",
  });

  const [value, setValue] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get(`/blog/${id}`);
        // console.log("get blog in edit blog:", data);
        const { title, description, blogContent } = data?.blog;
        // console.log("***********", title, description, blogContent);
        if (data?.success) {
          setBlogData({
            ...blogData,
            title: title,
            description: description,
            blogContent: blogContent,
          });
        }
      } catch (error) {
        // console.log(error)
        toast.error(error?.response?.data?.message);
      }
    })();
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setBlogData({
      ...blogData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(`/blog/${id}`, {
        ...blogData,
        blogContent: value,
      });
      // console.log('is blog updated??', response)
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        navigate("/myblogs");
      }
    } catch (error) {
      // console.log(error)
      toast.error(error?.response?.data?.message);
    }
  };
  return [handleSubmit, blogData, changeHandler, value, setValue];
};

export default useEditBlog;

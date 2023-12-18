import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../Helper/axiosInstance";

const usePostBlog = () => {
  const [input, setInput] = useState({
    blogImage: "",
    title: "",
    description: "",
    blogContent: "",
  });

  const [value, setValue] = useState("");
  const [blogImage, setBlogImage] = useState("");

  const getImage = (e) => {
    const uploadedBlogImage = e.target.files[0];
    // console.log("Uploaded blog img", uploadedBlogImage);

    if (uploadedBlogImage) {
      setInput({
        ...input,
        blogImage: uploadedBlogImage,
      });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedBlogImage);
      fileReader.addEventListener("load", function () {
        setBlogImage(this.result);
      });
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Wait! posting your blog...");

    const formData = new FormData();
    formData.append("blogImage", input.blogImage);
    formData.append("title", input.title);
    formData.append("description", input.description);
    formData.append("blogContent", value);

    try {
      const response = await axiosInstance.post("/blog/post", formData);
      if (response?.data?.success) {
        toast.dismiss(); //it dismiss the toast.loading()
        toast.success(response?.data?.message);
        setInput({
          title: "",
          description: "",
          blogContent: "",
          blogImage: "",
        });
        setValue("");
        setBlogImage("");
      }
    } catch (error) {
      toast.dismiss();
      // console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return [
    handleSubmit,
    blogImage,
    getImage,
    input,
    changeHandler,
    value,
    setValue,
  ];
};

export default usePostBlog;

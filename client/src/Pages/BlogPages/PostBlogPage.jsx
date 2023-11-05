import React, { useState } from "react";
import HomeLayout from "../../Layout/HomeLayout";
import axiosInstance from "../../Helper/axiosInstance";
import toast from "react-hot-toast";

const PostBlogPage = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    blogContent: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Wait! Blog is posting...");
    try {
      const response = await axiosInstance.post("/blog/post", input);
      if (response?.data?.success) {
        //settimeout is use to show the loader for at least 2000 sec, it gives good user experience
        setTimeout(() => {
          toast.dismiss(); //it dismiss the toast.loading()
          toast.success(response?.data?.message);
          setInput({
            title: "",
            description: "",
            blogContent: "",
          });
        }, 2000);
      }
    } catch (error) {
        //if error comes setTimeout give the better user experience
      setTimeout(() => {
        toast.dismiss();
        console.log(error);
        toast.error(error?.response?.data?.message);
      }, 4000);
    }
  };

  return (
    <HomeLayout>
      <div className=" flex items-center justify-center min-h-[80vh] max-w-[1440px] mx-auto">
        <div className=" mx-auto py-5 shadow-[0_0_10px_black] w-[60%] dark:text-gray-200 text-gray-900 transition-all duration-300 ease-in-out">
          <h1 className=" text-2xl text-center font-bold mb-2">
            Write your blog here, and post it...
          </h1>
          <form className=" px-8 py-6 space-y-4" onSubmit={handleSubmit}>
            <div className=" flex flex-col gap-2">
              <label htmlFor="title" className="block font-semibold text-xl">
                Title of the Blog :
              </label>
              <input
                className=" w-full bg-transparent px-4 py-1 border dark:border-gray-200 border-gray-900 rounded-sm"
                type="text"
                id="title"
                name="title"
                placeholder="Enter Your Blog Title"
                value={input.title}
                onChange={changeHandler}
              />
            </div>

            <div className=" flex flex-col gap-2">
              <label
                htmlFor="description"
                className="block font-semibold text-xl"
              >
                Description: of the Blog :
              </label>
              <input
                className=" w-full bg-transparent px-4 py-1 border dark:border-gray-200 border-gray-900 rounded-sm"
                type="text"
                id="description"
                name="description"
                placeholder="Enter Your Blog Description"
                value={input.description}
                onChange={changeHandler}
              />
            </div>

            <div className=" flex flex-col gap-2">
              <label
                htmlFor="blogContent"
                className="block font-semibold text-xl"
              >
                Content of the Blog :
              </label>
              <textarea
                className=" resize-none overflow-y-scroll w-full bg-transparent px-4 py-1 border dark:border-gray-200 border-gray-900 rounded-sm h-32"
                type="text"
                id="blogContent"
                name="blogContent"
                placeholder="Enter Your Blog Content"
                value={input.blogContent}
                onChange={changeHandler}
              />
            </div>
            <button
              type="submit"
              className=" bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 ease-in-out w-full py-1 font-bold text-xl rounded-md"
            >
              Post Blog
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default PostBlogPage;

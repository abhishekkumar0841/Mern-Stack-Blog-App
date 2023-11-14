import React, { useEffect, useState } from "react";
import HomeLayout from "../../Layout/HomeLayout";
import axiosInstance from "../../Helper/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    blogContent: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const {data} = await axiosInstance.get(`/blog/${id}`);
        // console.log("get blog in edit blog:", data);
        const {title, description, blogContent} = data?.blog
        // console.log("***********" ,title, description, blogContent)
        if(data?.success){
          setBlogData({
              ...blogData,
              title: title,
              description: description,
              blogContent: blogContent
          })
        }
      } catch (error) {
        // console.log(error)
        toast.error(error?.response?.data?.message)
      }
    })();
  }, []);

  const changeHandler = (e)=>{
    const {name, value} = e.target;
    setBlogData({
        ...blogData,
        [name] : value,
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
        const response = await axiosInstance.put(`/blog/${id}`, blogData)
        // console.log('is blog updated??', response)
        if(response?.data?.success){
            toast.success(response?.data?.message)
            navigate('/myblogs')
        }
    } catch (error) {
        // console.log(error)
        toast.error(error?.response?.data?.message)
    }
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[80vh] text-gray-900 dark:text-gray-200 transition-all duration-300 ease-in-out">
        <div className="mx-auto py-2 shadow-[0_0_10px_black] w-[60%] dark:text-gray-200 text-gray-900 transition-all duration-300 ease-in-out">
            <h1 className=" text-4xl font-bold mt-10 text-center">Edit and update your blog here...</h1>
            <form className=" px-8 py-3 space-y-4" onSubmit={handleSubmit}>
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
                value={blogData.title}
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
                value={blogData.description}
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
                className=" resize-none h-36 w-full bg-transparent px-4 py-1 border dark:border-gray-200 border-gray-900 rounded-sm"
                type="text"
                id="blogContent"
                name="blogContent"
                placeholder="Enter Your Blog Content"
                value={blogData.blogContent}
                onChange={changeHandler}
              />
            </div>
            <button
              type="submit"
              className=" bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 ease-in-out w-full py-1 font-bold text-xl rounded-md"
            >
              Update Blog
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default EditBlogPage;

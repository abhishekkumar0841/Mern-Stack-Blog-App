import React from "react";
import HomeLayout from "../../Layout/HomeLayout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BiPhotoAlbum } from "react-icons/bi";
import usePostBlog from "../../hooks/usePostBlog";

const PostBlogPage = () => {
  const [
    handleSubmit,
    blogImage,
    getImage,
    input,
    changeHandler,
    value,
    setValue,
  ] = usePostBlog();

  return (
    <HomeLayout>
      <div className=" flex items-center justify-center min-h-[90vh] max-w-[1440px] mx-auto">
        <div className=" mx-auto py-5 shadow-[0_0_10px_black] w-[90%] md:w-[60%] dark:text-gray-200 text-gray-900 transition-all duration-300 ease-in-out mt-10">
          <h1 className=" text-2xl text-center font-bold mb-2">
            Write your blog here, and post it...
          </h1>
          <form className=" px-8 py-6 space-y-4" onSubmit={handleSubmit}>
            <div className=" flex flex-col gap-2 shadow-[0_0_10px_blue] items-center rounded-xl">
              <label
                htmlFor="blogImage"
                className="block font-semibold text-xl cursor-pointer"
              >
                {blogImage ? (
                  <img
                    src={blogImage}
                    alt="Blog Image"
                    className=" h-40 w-52 text-blue-700"
                  />
                ) : (
                  <BiPhotoAlbum className=" h-40 w-52 text-blue-700" />
                )}
              </label>
              <input
                className=" w-full bg-transparent px-4 py-1 border dark:border-gray-200 border-gray-900 rounded-sm hidden"
                type="file"
                id="blogImage"
                name="blogImage"
                onChange={getImage}
                accept=".jpg, .jpeg, .png, .svg"
              />
            </div>

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
              <ReactQuill value={value} onChange={setValue} />
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

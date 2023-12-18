import React from "react";
import HomeLayout from "../../Layout/HomeLayout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useEditBlog from "../../hooks/useEditBlog";

const EditBlogPage = () => {
  const [handleSubmit, blogData, changeHandler, value, setValue] =
    useEditBlog();

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[90vh] px-4 text-gray-900 dark:text-gray-200 transition-all duration-300 ease-in-out">
        <div className="mx-auto py-2 shadow-[0_0_10px_black] px-2 md:px-8 dark:text-gray-200 text-gray-900 transition-all duration-300 ease-in-out w-[90%] md:w-[60%] mt-10">
          <h1 className=" text-4xl font-bold mt-10 text-center">
            Edit and update your blog here...
          </h1>
          <form
            className=" px-2 md:px-8 py-3 space-y-4"
            onSubmit={handleSubmit}
          >
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

              {/* React Quill */}
              <ReactQuill
                value={!value ? blogData.blogContent : value}
                onChange={setValue}
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

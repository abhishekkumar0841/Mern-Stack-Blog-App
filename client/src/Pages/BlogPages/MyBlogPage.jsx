import React, { useEffect } from "react";
import HomeLayout from "../../Layout/HomeLayout";
import BlogCard from "../../Components/BlogComponents/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../Helper/axiosInstance";
import toast from "react-hot-toast";
import { setMyBlog } from "../../redux/slice/blogSlice";
import { setLoading } from "../../redux/slice/loadingSlice";

const MyBlogPage = () => {

    const {myBlog} = useSelector(state=> state.blog)
    console.log('USER BLOG/ myblog:',myBlog)
    const {loading} = useSelector(state => state.loader)
    console.log('LOADING:', loading)
    const dispatch = useDispatch()

    useEffect(()=>{
        (async()=>{
            dispatch(setLoading(true))
            try {
                const response = await axiosInstance.get('/blog/myblog')
                console.log('RESPONSE OF USER BLOG:', response)
                if(response?.data?.success){
                    toast.success(response?.data?.message)
                    dispatch(setMyBlog(response?.data?.blog))
                    dispatch(setLoading(false))
                }
            } catch (error) {
                console.log(error)
                toast.error(error?.response?.data?.message)
                dispatch(setLoading(false))
            }
        })()
    },[])

  return (
    <HomeLayout>
      <div className="min-h-[80vh] max-w-[1400px] mx-auto py-10 flex gap-10 flex-wrap justify-center">
        {
            loading ? (
                <div>
                    <h1 className=" text-4xl text-white font-bold tracking-widest">Loading...</h1>
                </div>
            ) : (
                myBlog.length < 1  ? (
                    <div>
                        <h1  className=" text-4xl text-white font-bold tracking-widest">Sorry, you have not posted any blog yet!</h1>
                    </div>
                ): (
                    myBlog.map((blog)=>(
                        <BlogCard key={blog._id} blog={blog} />
                    ))
                )
            )
        }
      </div>
    </HomeLayout>
  );
};

export default MyBlogPage;

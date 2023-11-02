import React from "react";
import HomeLayout from "../Layout/HomeLayout";
import blogLogo from "../assets/images/blogLogo.png";
import { BiPen } from "react-icons/bi";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <HomeLayout>
      <div className=" w-full min-h-[80vh] flex max-w-[1400px] mx-auto items-center justify-center">
        <div className=" max-w-[60%] flex flex-col gap-5">
          <div className=" flex flex-col items-center gap-4">
            <img src={blogLogo} alt="Blog Image" width={200} className="" />
            <h1 className=" dark:text-gray-200 text-gray-900 text-4xl text-center font-bold tracking-widest">
              ..Blog it..
            </h1>
          </div>
          <div className="dark:text-gray-200 text-gray-900 flex flex-col items-center justify-center gap-4">
            <p className=" text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              similique debitis veniam, numquam ipsam magnam suscipit, et eaque
              velit molestias minus cumque, at reiciendis nihil eligendi maiores
              reprehenderit? Praesentium, temporibus?
            </p>
            <Link to={'/postblog'} className=" bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 ease-in-out py-2 font-bold px-4 rounded-md w-fit flex items-center gap-3 text-2xl">
              <BiPen />
              Write Your First Blog
            </Link>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default HomePage;

import React, { useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import axiosInstance from "../Helper/axiosInstance";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  function changeHandler(e) {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    try {
      const response = await axiosInstance.post("/user/login", input);
      console.log("RESPONSE OF LOGIN->", response);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setInput({
          email: "",
          password: "",
        });

        const user = response?.data?.user;
        const res = dispatch(login(user));
        navigate('/')
        console.log('DISPATCH OF LOGIN->', res)
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    <HomeLayout>
      <div className=" min-h-[90vh] flex items-center justify-center dark:text-gray-200 text-gray-900 transition-all duration-300 ease-in-out">
        <form onSubmit={handleSubmit} className=" w-96 shadow-[0_0_10px_gray] px-4 py-8 flex flex-col gap-4 rounded-md">
          <h1 className=" text-4xl font-bold text-center">Login Form</h1>
          <div className="">
            <label htmlFor="email" className=" block">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="abc@example.com"
              value={input.email}
              onChange={changeHandler}
              className=" bg-transparent border border-gray-900 dark:border-gray-200 px-2 py-1 w-full rounded-sm "
            />
          </div>
          <div>
            <label htmlFor="password" className=" block">Password:</label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={input.password}
              onChange={changeHandler}
              className=" bg-transparent border border-gray-900 dark:border-gray-200 px-2 py-1 w-full rounded-sm"
            />
          </div>
          <button type="submit" className=" bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 ease-in-out w-full py-1 font-bold text-xl">Login</button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default LoginPage;

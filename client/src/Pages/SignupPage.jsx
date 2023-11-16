import React, { useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import axiosInstance from "../Helper/axiosInstance";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../redux/slice/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    userName: "",
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
    // console.log(input);
    toast.loading('Wait, your account creating')
    try {
      const response = await axiosInstance.post("/user/signup", input);
      // console.log('RESPONSE OF SIGNUP->', response)
      if (response?.data?.success) {
        toast.dismiss()
        toast.success("Registration successful");
        setInput({
          firstName: "",
          lastName: "",
          userName: "",
          email: "",
          password: "",
        });
        navigate("/login");
        dispatch(signup(input));
      }
    } catch (error) {
      // console.log(error)
      toast.dismiss()
      toast.error(error?.response?.data?.message);
    }
  }

  const changePassType = () => {
    setShowPassword(!showPassword);
  };

  return (
    <HomeLayout>
      <div className=" min-h-[90vh] flex items-center justify-center dark:text-gray-200 text-gray-900 transition-all duration-300 ease-in-out px-2">
        <form
          onSubmit={handleSubmit}
          className=" w-96 shadow-[0_0_10px_gray] px-4 py-8 flex flex-col gap-4 rounded-md"
        >
          <h1 className=" text-4xl font-bold text-center">Signup Form</h1>
          <div className="">
            <label htmlFor="firstName" className=" block">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter first name"
              value={input.firstName}
              onChange={changeHandler}
              className=" bg-transparent border border-gray-900 dark:border-gray-200 px-2 py-1 w-full rounded-sm "
            />
          </div>
          <div className="">
            <label htmlFor="lastName" className=" block">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter last name"
              value={input.lastName}
              onChange={changeHandler}
              className=" bg-transparent border border-gray-900 dark:border-gray-200 px-2 py-1 w-full rounded-sm "
            />
          </div>
          <div className="">
            <label htmlFor="userName" className=" block">
              Username:
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="abc@example"
              value={input.userName}
              onChange={changeHandler}
              className=" bg-transparent border border-gray-900 dark:border-gray-200 px-2 py-1 w-full rounded-sm "
            />
          </div>
          <div className="">
            <label htmlFor="email" className=" block">
              Email:
            </label>
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
          <div className=" relative">
            <label htmlFor="password" className=" block">
              Password:
            </label>
            <input
              type={!showPassword ? "password" : "text"}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={input.password}
              onChange={changeHandler}
              className=" bg-transparent border border-gray-900 dark:border-gray-200 px-2 py-1 w-full rounded-sm"
            />
            {showPassword ? (
              <FaEye
                className="absolute right-4 top-8 text-xl cursor-pointer"
                onClick={changePassType}
              />
            ) : (
              <FaEyeSlash
                className="absolute right-4 top-8 text-xl cursor-pointer"
                onClick={changePassType}
              />
            )}
          </div>
          <button
            type="submit"
            className=" bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 ease-in-out w-full py-1 font-bold text-xl"
          >
            Sign up
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default SignupPage;

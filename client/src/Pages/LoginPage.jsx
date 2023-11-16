import React, { useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import axiosInstance from "../Helper/axiosInstance";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const changePassType = () => {
    setShowPassword(!showPassword);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const { signupData } = useSelector((state) => state.auth);
  // console.log("signup data:", signupData);

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
    toast.loading("Wait...")
    try {
      const response = await axiosInstance.post("/user/login", input);
      // console.log("RESPONSE OF LOGIN->", response);
      if (response?.data?.success) {
        toast.dismiss()
        toast.success(response?.data?.message);
        setInput({
          email: "",
          password: "",
        });

        const user = response?.data?.user;
        const res = dispatch(login(user));
        navigate("/");
        // console.log("DISPATCH OF LOGIN->", res);
      }
    } catch (error) {
      // console.log(error);
      toast.dismiss()
      toast.error(error?.response?.data?.message);
    }
  }

  setTimeout(() => {
    dispatch(signup(null));
  }, 5000);

  return (
    <HomeLayout>
      <div className="relative min-h-[80vh] flex items-center justify-center dark:text-gray-200 text-gray-900 transition-all duration-300 ease-in-out px-2">
        {signupData && (
          <div className=" text-black absolute top-2 text-2xl font-bold tracking-widest bg-green-400 px-4 py-2 rounded-md transition-all duration-500 ease-in-out">
            Congrats{" "}
            <span className=" text-indigo-800">{signupData?.firstName}</span>,
            You are successfully registered with us👌.. login and enjoy👍
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className=" w-96 shadow-[0_0_10px_gray] px-4 py-8 flex flex-col gap-4 rounded-md"
        >
          <h1 className=" text-4xl font-bold text-center">Login Form</h1>
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
          <div className="relative">
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
            Login
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default LoginPage;

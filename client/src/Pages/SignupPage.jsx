import React, { useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import axiosInstance from "../Helper/axiosInstance";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../redux/slice/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { BiUser } from "react-icons/bi";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    avatar: "",
  });

  function changeHandler(e) {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

  const getImage = (e) => {
    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      setInput({
        ...input,
        avatar: uploadedImage,
      });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log("Check input-->", input);
    toast.loading("Wait, your account creating");

    const formData = new FormData();
    formData.append("firstName", input.firstName);
    formData.append("lastName", input.lastName);
    formData.append("userName", input.userName);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("avatar", input.avatar);

    try {
      const response = await axiosInstance.post("/user/signup", formData);
      if (response?.data?.success) {
        toast.dismiss();
        toast.success("Registration successful");
        setInput({
          firstName: "",
          lastName: "",
          userName: "",
          email: "",
          password: "",
          avatar: "",
        });

        //removing the avatar and only send serializable data in redux store
        const userWithoutAvatar = { ...input };
        delete userWithoutAvatar.avatar;
        dispatch(signup(userWithoutAvatar));
        navigate("/login");
      }
    } catch (error) {
      toast.dismiss();
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
          <div className=" flex flex-col items-center">
            <label htmlFor="avatar" className="cursor-pointer">
              {previewImage ? (
                <img
                  src={previewImage}
                  className="w-24 h-24 rounded-full m-auto"
                />
              ) : (
                <BiUser className="w-24 h-24 rounded-full m-auto" />
              )}
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={getImage}
              accept=".jpg, .jpeg, .png, .svg"
              className="hidden"
            />
          </div>
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

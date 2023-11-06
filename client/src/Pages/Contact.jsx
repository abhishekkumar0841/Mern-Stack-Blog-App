import React, { useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import toast from "react-hot-toast";
import axiosInstance from "../Helper/axiosInstance";

const Contact = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    message: "",
  });

  function changeHandler(e) {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.loading('Wait, sending message...')
      const response = await axiosInstance.post("/others/contact", input);
      console.log("CONTACT US RESPONSE:", response);
      if (response?.data?.success) {
        setInput({
          fullName: "",
          email: "",
          contactNumber: "",
          message: "",
        });
        toast.dismiss()
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      toast.dismiss()
    }
  };

  return (
    <HomeLayout>
      <div className=" flex items-center justify-evenly px-10 max-w-[1400px] mx-auto min-h-[80vh] py-10 text-gray-900 dark:text-gray-200">
        <div className=" w-1/2">
          <img
            src="https://www.marshalsecurity.ca/wp-content/uploads/2014/02/contactus.jpg"
            alt=""
            className=" w-auto h-96"
          />
        </div>
        <div className=" shadow-[0_0_10px_black] w-1/2 px-6 py-4 rounded-md">
          <h1 className=" text-4xl font-bold text-center">Contact Us</h1>
          <form onSubmit={handleSubmit} className=" flex flex-col gap-3">
            <div className=" flex flex-col gap-1">
              <label htmlFor="fullName" className=" block">
                Full Name:
              </label>
              <input
                name="fullName"
                className=" bg-transparent border rounded-sm dark:border-gray-200 border-gray-900 w-full py-1 px-3"
                type="text"
                id="fullName"
                placeholder="Enter Your Full Name"
                value={input.fullName}
                onChange={changeHandler}
              />
            </div>

            <div className=" flex flex-col gap-1">
              <label htmlFor="email" className=" block">
                Email :
              </label>
              <input
                name="email"
                className=" bg-transparent border rounded-sm dark:border-gray-200 border-gray-900 w-full py-1 px-3"
                type="text"
                id="email"
                placeholder="Enter Your Email"
                value={input.email}
                onChange={changeHandler}
              />
            </div>

            <div className=" flex flex-col gap-1">
              <label htmlFor="contactNumber" className=" block">
                Contact Number:
              </label>
              <input
                name="contactNumber"
                className=" bg-transparent border rounded-sm dark:border-gray-200 border-gray-900 w-full py-1 px-3 appearance-none"
                type="number"
                id="contactNumber"
                placeholder="Enter Your Contact Number"
                value={input.contactNumber}
                onChange={changeHandler}
              />
            </div>

            <div className=" flex flex-col gap-1">
              <label htmlFor="message" className=" block">
                Message:
              </label>
              <textarea
                name="message"
                className=" bg-transparent border rounded-sm dark:border-gray-200 border-gray-900 w-full py-1 px-3 resize-none overflow-y-scroll h-32"
                type="text"
                id="message"
                placeholder="Enter your message or ask you query"
                value={input.message}
                onChange={changeHandler}
              />
            </div>
            <button
              type="submit"
              className=" bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 ease-in-out w-full py-1 font-bold text-xl rounded-sm"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Contact;

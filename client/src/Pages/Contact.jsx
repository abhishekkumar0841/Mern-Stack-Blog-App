import React from "react";
import HomeLayout from "../Layout/HomeLayout";
import { useContact } from "../hooks/useContact";

const Contact = () => {
  const [handleSubmit, input, changeHandler] = useContact();
  return (
    <HomeLayout>
      <div className=" flex items-center flex-col lg:flex-row gap-10 justify-evenly px-10 max-w-[1400px] mx-auto min-h-[80vh] py-10 text-gray-900 dark:text-gray-200">
        <div className=" w-full lg:w-1/2">
          <img
            src="https://www.marshalsecurity.ca/wp-content/uploads/2014/02/contactus.jpg"
            alt=""
            className=" w-auto h-96 mx-auto"
          />
        </div>
        <div className=" shadow-[0_0_10px_black] w-full lg:w-1/2 px-6 py-4 rounded-md">
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

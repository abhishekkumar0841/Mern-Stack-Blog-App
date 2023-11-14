import React, { useEffect, useState } from "react";
import HomeLayout from "../../Layout/HomeLayout";
import { Link } from "react-router-dom";
import axiosInstance from "../../Helper/axiosInstance";

const ProfilePage = () => {

  const [userData, setUserData] = useState(null)

  useEffect(()=>{
    (async()=>{
      const response = await axiosInstance.get('user/profile')
      console.log('res:', response);
      if(response?.data?.success){
        setUserData(response?.data?.user)
      }
    })()
  }, [])

  return (
    <HomeLayout>
      <div className=" flex items-center px-2 sm:px-6 justify-center min-h-[90vh]">
        <div className=" w-full sm:w-[600px] shadow-[0_0_10px_black] rounded-md mx-auto transition-all duration-300 ease-in-out text-gray-900 dark:text-white flex flex-col gap-8 px-8 py-6">
          <div className=" flex gap-2 flex-col items-center justify-center">
            <img
              src={userData?.avatar?.secure_url}
              alt="User Image"
              width={150}
              className=" rounded-full"
            />
            <div className=" border-2 dark:border-gray-200 border-gray-900 px-8 py-1 rounded-sm">
              <h1>
                Role :{" "}
                <span className=" font-semibold capitalize">
                  {userData?.role.toLowerCase()}
                </span>
              </h1>
            </div>
          </div>

          <div className=" flex flex-col gap-2">
            <div className=" flex flex-col xs:flex-row lg:items-center justify-between">
              <p>
                First Name :{" "}
                <span className="font-semibold capitalize dark:text-yellow-400">{userData?.firstName}</span>
              </p>
              <p>
                Last Name :{" "}
                <span className="capitalize font-semibold dark:text-yellow-400">{userData?.lastName}</span>
              </p>
            </div>
            <div>
              <p>
                Email : <span className="font-semibold dark:text-yellow-400">{userData?.email}</span>
              </p>
              <p>
                Username : <span className="font-semibold dark:text-yellow-400">{userData?.userName}</span>
              </p>
              <div className=" bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 ease-in-out py-1 font-bold text-xl xs:mx-auto rounded-md w-fit mt-4">
                <Link to={'/myblogs'}>
                  <p className=" px-2 xs:px-6 py-2">
                    Total Posted Blogs : <span>{userData?.blog?.length}</span>
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default ProfilePage;

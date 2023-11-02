import React, { useEffect } from "react";
import blogLogo from "../assets/images/blogLogo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiSun, BiMoon } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/slice/themeSlice";
import axiosInstance from "../Helper/axiosInstance";
import { logout } from "../redux/slice/authSlice";

const Navbar = () => {
  const { theme } = useSelector((state) => state.theme);
  const { isLoggedIn, userData } = useSelector((state) => state.auth);
  //   console.log("THEME IS-->", theme);
  console.log("IS LOGGED IN-->", isLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async()=>{
    const res = await axiosInstance.get('/user/logout')
    console.log("RES OF LOGOUT->",res)
    if(res?.data?.success){
      dispatch(logout())
      navigate('/')
    }
  }

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className=" w-full h-[10vh] sticky top-0 flex items-center justify-between bg-gray-300 dark:bg-indigo-950 transition-all duration-300 ease-in-out text-gray-900 dark:text-white px-10 py-4">
      {/* logo */}
      <div className="flex items-center">
        <Link to={'/'} className="flex items-center gap-2">
          <img
            src={blogLogo}
            alt=""
            width={50}
            className=" hover:scale-110 transition-all duration-300 ease-in-out "
          />{" "}
          <span className=" font-semibold text-2xl tracking-widest">it...</span>
        </Link>
      </div>

      {/* links */}
      <ul className=" flex gap-6 font-bold text-xl">
        <li>
          <NavLink
            to={"/"}
            className=" hover:text-yellow-500 transition-all duration-300 ease-in-out active:text-yellow-500"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/blogs"}
            className=" hover:text-yellow-500 transition-all duration-300 ease-in-out active:text-yellow-500"
          >
            Blogs
          </NavLink>
        </li>
        {isLoggedIn && <li>
          <NavLink
            to={"/myblogs"}
            className=" hover:text-yellow-500 transition-all duration-300 ease-in-out active:text-yellow-500"
          >
            My Blogs
          </NavLink>
        </li>}
        <li>
          <NavLink
            to={"/contact"}
            className=" hover:text-yellow-500 transition-all duration-300 ease-in-out active:text-yellow-500"
          >
            Contact Us
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/about"}
            className=" hover:text-yellow-500 transition-all duration-300 ease-in-out active:text-yellow-500"
          >
            About Us
          </NavLink>
        </li>
      </ul>

      {/* other icons */}
      <div className="flex items-center gap-4">
        <div>
          {!theme ? (
            <BiMoon
              onClick={() => dispatch(toggleTheme())}
              className=" text-2xl cursor-pointer hover:text-yellow-500 transition-all duration-300 ease-in-out"
            />
          ) : (
            <BiSun
              onClick={() => dispatch(toggleTheme())}
              className=" text-2xl cursor-pointer hover:text-yellow-500 transition-all duration-300 ease-in-out"
            />
          )}
        </div>

        {!isLoggedIn ? (
          <div className=" text-xl font-bold flex items-center gap-4">
            <NavLink to={"/login"} className='active:text-yellow-500 hover:text-yellow-500 transition-all duration-300 ease-in-out '>Login</NavLink>
            <NavLink to={"/signup"}  className='active:text-yellow-500 hover:text-yellow-500 transition-all duration-300 ease-in-out '>Sign up</NavLink>
          </div>
        ) : (
          <div className=" text-xl font-bold flex items-center gap-4">
            <NavLink to={"/"} onClick={handleLogout}  className='active:text-yellow-500 hover:text-yellow-500 transition-all duration-300 ease-in-out '>Logout</NavLink>
            <NavLink to={"/dashboard"} >
              <img src={userData?.avatar?.secure_url} alt="User" width={50} className=" rounded-full" />
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

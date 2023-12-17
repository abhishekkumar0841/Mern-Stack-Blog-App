import axiosInstance from "../Helper/axiosInstance";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const useLogin = () => {
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
    toast.loading("Wait...");
    try {
      const response = await axiosInstance.post("/user/login", input);
      // console.log("RESPONSE OF LOGIN->", response);
      if (response?.data?.success) {
        toast.dismiss();
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
      toast.dismiss();
      toast.error(error?.response?.data?.message);
    }
  }

  setTimeout(() => {
    dispatch(signup(null));
  }, 5000);

  return [
    signupData,
    handleSubmit,
    changeHandler,
    input,
    showPassword,
    changePassType,
  ];
};

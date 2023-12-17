import { useState } from "react";
import axiosInstance from "../Helper/axiosInstance";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../redux/slice/authSlice";

export const useSignup = () => {
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

  return [
    handleSubmit,
    previewImage,
    showPassword,
    input,
    changeHandler,
    getImage,
    changePassType,
  ];
};

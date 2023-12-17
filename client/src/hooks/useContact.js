import toast from "react-hot-toast";
import axiosInstance from "../Helper/axiosInstance";
import { useState } from "react";

export const useContact = () => {
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
      toast.loading("Wait, sending message...");
      const response = await axiosInstance.post("/others/contact", input);
      // console.log("CONTACT US RESPONSE:", response);
      if (response?.data?.success) {
        setInput({
          fullName: "",
          email: "",
          contactNumber: "",
          message: "",
        });
        toast.dismiss();
        toast.success(response?.data?.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error?.response?.data?.message);
      toast.dismiss();
    }
  };
  return [handleSubmit, input, changeHandler];
};

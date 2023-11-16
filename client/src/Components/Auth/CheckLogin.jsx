import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import LoginPage from "../../Pages/LoginPage";

const CheckLogin = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return isLoggedIn ? <Outlet /> : <LoginPage />;
};

export default CheckLogin;

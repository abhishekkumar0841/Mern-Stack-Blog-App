import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NotFoundPage from "./Pages/NotFoundPage";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import BlogHomePage from "./Pages/BlogPages/BlogHomePage";
import BlogPage from "./Pages/BlogPages/BlogPage";
import PostBlogPage from "./Pages/BlogPages/PostBlogPage";
import MyBlogPage from "./Pages/BlogPages/MyBlogPage";
import CommentPage from "./Pages/CommentPage/CommentPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import EditBlogPage from "./Pages/BlogPages/EditBlogPage";
import CheckLogin from "./Components/Auth/CheckLogin";
import { useSelector } from "react-redux";

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blogs" element={<BlogHomePage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />

      <Route
        path="/login"
        element={isLoggedIn ? <ProfilePage /> : <LoginPage />}
      />
      <Route path="/signup" element={<SignupPage />} />

      {/*PROTECTED ROUTES **** Only show if user is logged in */}
      <Route element={<CheckLogin />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/myblogs" element={<MyBlogPage />} />
        <Route path="/postblog" element={<PostBlogPage />} />
        <Route path="/blogs/:id" element={<BlogPage />} />
        <Route path="/editblog/:id" element={<EditBlogPage />} />
        <Route path="/:id/comments" element={<CommentPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;

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

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blogs" element={<BlogHomePage/>} />
      <Route path="/postblog" element={<PostBlogPage/>} />
      <Route path="/blogs/:id" element={<BlogPage/>} />
      <Route path="/myblogs" element={<MyBlogPage />} />
      <Route path="/:id/comments" element={<CommentPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;

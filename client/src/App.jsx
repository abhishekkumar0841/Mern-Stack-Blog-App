import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage"));
const Contact = lazy(() => import("./Pages/Contact"));
const About = lazy(() => import("./Pages/About"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const SignupPage = lazy(() => import("./Pages/SignupPage"));
const BlogHomePage = lazy(() => import("./Pages/BlogPages/BlogHomePage"));
const BlogPage = lazy(() => import("./Pages/BlogPages/BlogPage"));
const PostBlogPage = lazy(() => import("./Pages/BlogPages/PostBlogPage"));
const MyBlogPage = lazy(() => import("./Pages/BlogPages/MyBlogPage"));
const CommentPage = lazy(() => import("./Pages/CommentPage/CommentPage"));
const ProfilePage = lazy(() => import("./Pages/ProfilePage/ProfilePage"));
const EditBlogPage = lazy(() => import("./Pages/BlogPages/EditBlogPage"));
import CheckLogin from "./Components/Auth/CheckLogin";
import { useSelector } from "react-redux";
import FallBackLoader from "./Components/FallBackLoader/FallBackLoader";

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <Suspense fallback={<FallBackLoader/>}>
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
    </Suspense>
  );
};

export default App;

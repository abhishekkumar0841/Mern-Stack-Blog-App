import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
// import NotFoundPage from "./Pages/NotFoundPage";
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage"));
// import Contact from "./Pages/Contact";
const Contact = lazy(() => import("./Pages/Contact"));
// import About from "./Pages/About";
const About = lazy(() => import("./Pages/About"));
// import LoginPage from "./Pages/LoginPage";
const LoginPage = lazy(() => import("./Pages/LoginPage"));
// import SignupPage from "./Pages/SignupPage";
const SignupPage = lazy(() => import("./Pages/SignupPage"));
// import BlogHomePage from "./Pages/BlogPages/BlogHomePage";
const BlogHomePage = lazy(() => import("./Pages/BlogPages/BlogHomePage"));
// import BlogPage from "./Pages/BlogPages/BlogPage";
const BlogPage = lazy(() => import("./Pages/BlogPages/BlogPage"));
// import PostBlogPage from "./Pages/BlogPages/PostBlogPage";
const PostBlogPage = lazy(() => import("./Pages/BlogPages/PostBlogPage"));
// import MyBlogPage from "./Pages/BlogPages/MyBlogPage";
const MyBlogPage = lazy(() => import("./Pages/BlogPages/MyBlogPage"));
// import CommentPage from "./Pages/CommentPage/CommentPage";
const CommentPage = lazy(() => import("./Pages/CommentPage/CommentPage"));
// import ProfilePage from "./Pages/ProfilePage/ProfilePage";
const ProfilePage = lazy(() => import("./Pages/ProfilePage/ProfilePage"));
// import EditBlogPage from "./Pages/BlogPages/EditBlogPage";
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

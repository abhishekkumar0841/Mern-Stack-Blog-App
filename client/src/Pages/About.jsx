import React from "react";
import HomeLayout from "../Layout/HomeLayout";
import blogLogo from "../assets/images/blogLogo.png";

const About = () => {
  return (
    <HomeLayout>
      <div className=" w-[1400px] mx-auto flex items-center justify-center min-h-[80vh] py-10">
        <div className=" text-gray-900 dark:text-gray-200 flex items-center justify-center flex-col gap-2">
          <img src={blogLogo} alt="" width={200} />
          <div className="flex items-center justify-center flex-col w-[800px] mx-auto gap-4">
            <h1 className=" text-4xl font-bold">Blog it...</h1>
            <p className=" font-semibold tracking-wider text-lg">
              Welcome to Blog it, where creativity meets community! We're more
              than just a platform; we're a vibrant hub for writers, thinkers,
              and dreamers. Our mission is simple: to empower individuals to
              share their unique stories, insights, and perspectives with the
              world.
            </p>
            <p className=" font-semibold tracking-wider text-lg">
              At Blog it, we believe that every voice deserves to be heard.
              Whether you're a seasoned writer or just starting your blogging
              journey, our user-friendly interface makes it easy for you to
              express yourself. Register with us to unlock a world of
              possibilities – create an account, log in, and start penning down
              your thoughts with the click of a button.
            </p>
            <p className=" font-semibold tracking-wider text-lg">
              What sets Blog it apart is our focus on fostering a supportive
              community. Writers can not only publish their blogs but also
              connect with a diverse audience. We encourage interaction through
              likes, comments, and meaningful discussions. Imagine a place where
              your words resonate with others, where your stories inspire, and
              where your ideas spark conversations.
            </p>
            <p className=" font-semibold tracking-wider text-lg">
              Our intuitive platform allows you to manage your content
              effortlessly. Write, edit, delete, and even like the blogs of
              fellow writers – Blog it gives you the tools to engage
              meaningfully with the creative works of others. Whether you're
              sharing your passions, experiences, or expertise, Blog it provides
              the canvas for your words to flourish.
            </p>
            <p className=" font-semibold tracking-wider text-lg">
              Join us in this literary adventure, where each blog post is a step
              toward building a stronger, more connected community. Together,
              let's inspire, learn, and grow. Your story matters, and Blog it is
              here to help you share it with the world.
            </p>
            <h1  className=" text-4xl font-bold">Discover the joy of blogging. Discover Blog it.</h1>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default About;

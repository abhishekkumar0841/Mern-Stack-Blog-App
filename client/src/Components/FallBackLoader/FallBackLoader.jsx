import React from "react";
import HomeLayout from "../../Layout/HomeLayout";

const FallBackLoader = () => {
  return (
    <HomeLayout>
      <div className=" min-h-[90vh] flex items-center justify-center">
        <h1 className=" text-4xl text-white">Wait...</h1>
      </div>
    </HomeLayout>
  );
};

export default FallBackLoader;

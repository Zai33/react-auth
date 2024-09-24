import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className=" bg-purple-400 w-full h-16 flex items-center justify-end p-8">
      <div className=" flex items-center  gap-5">
        <Link
          to={"/login"}
          className=" text-white px-6 py-2 bg-gray-500 rounded-md shadow-md shadow-white backdrop-blur-lg backdrop-brightness-150"
        >
          Login
        </Link>
        <Link
          to={"/register"}
          className=" text-white px-4 py-2 bg-gray-500 rounded-md shadow-md shadow-white backdrop-blur-lg backdrop-brightness-150"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

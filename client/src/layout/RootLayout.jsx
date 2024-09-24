import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full min-h-screen fixed">
      <Navbar />
      <div className=" bg-gray-200">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;

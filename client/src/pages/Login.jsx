import React, { useEffect, useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/api/login`, {
        email: formData.email,
        password: formData.password,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasswordShow = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className=" flex items-center justify-center h-screen bg-gradient-to-r from-teal-300 via-purple-400 to-sky-400">
      <div className="backdrop:blur-md rounded-lg p-6 w-96 flex flex-col items-center justify-center gap-8 shadow-lg shadow-blue-300 bg-white">
        <p
          className="text-2xl font-bold text-gray-500"
          style={{
            textShadow:
              "0px 0px 10px rgba(255, 55, 255, 0.7), 0px 0px 20px rgba(25, 255, 255, 0.5)",
          }}
        >
          Login Form
        </p>
        <div className="relative">
          <FaEnvelope
            size={20}
            className=" absolute left-2 top-1/2 transform -translate-y-1/2 "
          />
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            value={formData.email}
            className="px-10 py-3 outline-none shadow-md shadow-blue-300 rounded-md"
          />
        </div>
        <div className=" relative">
          <FaLock
            size={20}
            className=" absolute left-2 top-1/2 transform -translate-y-1/2 "
          />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="Enter password"
            className="px-10 py-3 outline-none shadow-md shadow-blue-300 rounded-md"
          />
          <button
            onClick={handlePasswordShow}
            className=" absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </button>
        </div>
        <button
          onClick={handleSubmit}
          className=" w-32 h-10 rounded-md shadow-md shadow-blue-300 bg-green-500 text-white"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

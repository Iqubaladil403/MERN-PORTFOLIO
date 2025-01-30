import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/rootSlice";

function AdminLogin() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async(e) => {
        try {
            const data = {
                username,
                password
            }
            e.preventDefault();
            console.log(data);
            dispatch(showLoading());
            const response=await axios.post("/api/portfolio/admin-login",
                data
            );
            dispatch(hideLoading());
            if(response.data.success){
                message.success("Login Successfull");
                localStorage.setItem("token",response.data);
                window.location.href="/admin";
            }
        } catch (error) {
            dispatch(hideLoading());
            message.error("Invalid Credentials");
        }
    };
  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="bg-gray-100 p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center">Admin Login</h1>
        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="username" className="block">
              username
            </label>
            <input
              type="text"
              name="username"
              value={username}
                onChange={(e)=>setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              type="password"
              name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
          onSubmit={handleSubmit}
            type="submit"
            className="w-full bg-primary text-white p-2 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;

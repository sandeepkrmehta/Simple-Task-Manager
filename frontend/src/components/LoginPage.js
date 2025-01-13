import React, { useState } from "react";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

async function loginUser(credentials) {
  try {
    const response = await axios.post(
      "http://localhost:8080/login",
      credentials
    );
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    return { success: false, message: "Failed to login. Please try again." };
  }
}

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const credentials = { username, password };

    try {
      const { success, message, token } = await loginUser(credentials);

      if (success) {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        toast.success("Login successful!", { position: "top-right" });
        navigate("/");
      } else {
        toast.error(message);
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Username</label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full outline-none"
              placeholder="Enter your username"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Password</label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none"
              placeholder="Enter your password"
            />
          </div>
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 flex justify-center items-center"
        >
          <FaSignInAlt className="mr-2" />
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;

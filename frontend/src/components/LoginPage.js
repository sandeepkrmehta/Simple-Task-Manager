import React, { useState } from 'react';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import { notify } from '../utils';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      notify('Please fill in all fields', 'error');
      return;
    }
    const credentials = { username, password };
    try {
      const { success, message, token } = await loginUser(credentials);
      if (success) {
        // Store the token in local storage or cookies
        localStorage.setItem('token', token);
        notify(message, 'success');
        navigate('/tasks'); // Redirect to tasks page after successful login
      } else {
        notify(message, 'error');
      }
    } catch (err) {
      console.error(err);
      notify('Login failed', 'error');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
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
          <label className="block text-gray-700">Password</label>
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
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          <FaSignInAlt className="inline mr-2" />
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;

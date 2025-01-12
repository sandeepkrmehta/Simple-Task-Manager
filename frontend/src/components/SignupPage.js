import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';
import { notify } from '../utils';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username || !password || !email) {
      notify('Please fill in all fields', 'error');
      return;
    }
    const userObj = { username, password, email };
    try {
      const { success, message } = await registerUser(userObj);
      if (success) {
        notify(message, 'success');
        navigate('/login'); // Redirect to login after successful signup
      } else {
        notify(message, 'error');
      }
    } catch (err) {
      console.error(err);
      notify('Signup failed', 'error');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full outline-none"
              placeholder="Choose a username"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none"
              placeholder="Enter your email"
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
              placeholder="Create a password"
            />
          </div>
        </div>
        <button
          onClick={handleSignup}
          className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
        >
          <FaUserPlus className="inline mr-2" />
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Signup;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import TaskManager from './components/TaskManager';
import Login from './components/LoginPage';
import Signup from './components/SignupPage';

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-lg font-bold">Task Manager</Link>
          <div>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 p-2 rounded"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="text-white p-2">Login</Link>
                <Link to="/signup" className="text-white p-2">Signup</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/"
          element={isAuthenticated ? <TaskManager /> : <Login setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </div>
  );
}

export default App;
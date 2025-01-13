import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import TaskManager from "./components/TaskManager";
import Login from "./components/LoginPage";
import Signup from "./components/SignupPage";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      toast.success("Welcome back!", { position: "top-right" });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    toast.success("Logged out successfully!", { position: "top-right" });
    navigate("/login");
  };

  return (
    <div>
      {}
      <Toaster position="top-right" reverseOrder={false} />

      {}
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-lg font-bold">
            Task Manager
          </Link>
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
                <Link to="/login" className="text-white p-2">
                  Login
                </Link>
                <Link to="/signup" className="text-white p-2">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {}
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/signup"
          element={<Signup setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <TaskManager />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;

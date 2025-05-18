import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../Redux/Auth';
import { ArrowLeft } from 'lucide-react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { getUserProfile } from '../../../Redux/UserSlice';
import { FcBusinessman } from 'react-icons/fc';

const UserNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedUser = useSelector((state) => state.user.selectedUser);

  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side */}
          <div className="flex items-center gap-3 px-4 py-2 bg-white dark:bg-gray-900">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-blue-600 transition"
              title="Go Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
              Dash<span className="text-blue-600">Host</span>
            </h1>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-gray-600 dark:text-gray-300 hover:text-yellow-400"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* User Avatar */}
            {selectedUser &&
              <div className="relative">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-blue-600 cursor-pointer bg-white shadow-md hover:scale-105 transition-transform duration-200"
                >
                  <FcBusinessman className="text-3xl" />
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;

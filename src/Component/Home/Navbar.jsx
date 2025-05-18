import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { FcBusinessman } from 'react-icons/fc';
import { FiHome, FiUser, FiMail, FiUserPlus } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Redux/Auth';
import { getUserProfile } from '../../Redux/UserSlice';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const userId = localStorage.getItem('userId');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const panelRef = useRef();

  useEffect(() => {
    if (!selectedUser) {
      dispatch(getUserProfile());
    }
  }, [dispatch]);

  useEffect(() => {
  if (userId && !selectedUser) {
    dispatch(getUserProfile());
  }
}, [dispatch, userId, selectedUser]);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-3 flex items-center justify-between">

        {/* Left Section: Logo & Brand */}
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-2xl hidden md:block sm:text-3xl font-bold tracking-wide hover:opacity-90 transition duration-300"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 dark:from-blue-400 dark:to-cyan-300 drop-shadow-md">
              <span className="text-4xl font-extrabold text-blue-700 dark:text-blue-300 animate-pulse">D</span>
              ashHost
            </span>
          </Link>

          {/* Hamburger Icon (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(true)}
              className="text-2xl p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Open menu"
            >
              <FaBars />
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-16 font-medium text-lg">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-300 transition">Home</Link>
          <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-300 transition">About</Link>
          <Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-300 transition">Contact</Link>
        </div>

        {/* Right Section: Theme & User Avatar or Sign Up */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleDarkMode}
            className="text-xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Display Avatar if the user is logged in, otherwise Show Sign Up Button */}
          {selectedUser ? (
            <div className="relative" ref={panelRef}>
              <div
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-blue-600 cursor-pointer bg-white shadow-md hover:scale-105 transition-transform duration-200"
              >
                <FcBusinessman className="text-3xl" />
              </div>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-50">
                  {selectedUser && (
                    <Link
                      to={
                        selectedUser.role === 'ROLE_ADMIN'
                          ? `/adminDash`
                          : `/dashboard/${userId}`
                      }
                      className="block px-4 py-2 text-sm hover:bg-blue-100 dark:hover:bg-slate-700 dark:text-white transition"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-red-100 dark:hover:bg-slate-700 text-red-600 dark:text-red-400 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/signup"
              className="inline-block bg-blue-600 text-xs md:text-md text-white px-2 md:px-4 md:py-2 py-1.5 rounded-lg shadow hover:bg-blue-700 dark:bg-cyan-600 transition duration-300"
            >
              Sign Up
            </Link>
          )}
        </div>
      </div>

      {/* Sidebar Overlay */}
      <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-black/60 to-slate-900/50 backdrop-blur-md"
          onClick={() => setMenuOpen(false)}
        ></div>

        {/* Sidebar */}
        <div
          className={`absolute top-0 left-0 w-60 h-full bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 shadow-2xl p-6 pt-10 rounded-tr-3xl rounded-br-3xl transform transition-transform duration-500 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-xl text-gray-600 dark:text-gray-300 hover:text-red-500 transition-all bg-gray-100 dark:bg-slate-700 p-2 rounded-full shadow hover:scale-110"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>

          {/* Links */}
          <nav className="flex flex-col mt-10 space-y-5 font-semibold text-[17px] tracking-wide">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-cyan-300 transition"
            >
              <FiHome className="text-xl" /> Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-cyan-300 transition"
            >
              <FiUser className="text-xl" /> About
            </Link>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-cyan-300 transition"
            >
              <FiMail className="text-xl" /> Contact
            </Link>
            {!selectedUser &&
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-500 transition shadow"
              >
                <FiUserPlus className="text-xl" /> Sign Up
              </Link>
            }
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

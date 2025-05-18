import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Redux/Auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'ROLE_USER',
    adminKey: '',
  });

  useEffect(() => {
    if (token) {
      toast.success('Login successful!');
      setTimeout(() => navigate('/'), 1500);
    }
  }, [token, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleToggle = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
      adminKey: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.role === 'ROLE_ADMIN' && formData.adminKey.trim() === '') {
      toast.error('Admin Key is required for Admins');
      return;
    }
  
    try {
      const resultAction = await dispatch(loginUser(formData));
  
      if (loginUser.fulfilled.match(resultAction)) {
        // token handling and redirect logic will trigger from useEffect
      } else {
        // fallback error in case error state is not set
        toast.error(resultAction.payload?.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      toast.error('Unexpected error occurred.');
    }
  };
  
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gradient-to-br dark:from-gray-900 dark:to-black dark:text-white flex items-center justify-center px-4 py-10 transition-colors duration-300">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-md mx-auto bg-gray-100/70 dark:bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-extrabold mb-2 text-center">
          Login to <span className="text-blue-500">DashHost</span>
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-6">
          Access your account based on role
        </p>

        {/* Role Toggle */}
        <div className="flex justify-center gap-4 mb-6">
          {['ROLE_USER', 'ROLE_ADMIN'].map((roleOption) => (
            <button
              key={roleOption}
              type="button"
              onClick={() => handleRoleToggle(roleOption)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                formData.role === roleOption
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {roleOption === 'ROLE_USER' ? 'Staff' : 'Admin'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {formData.role === 'ROLE_ADMIN' && (
            <input
              type="password"
              name="adminKey"
              placeholder="Admin Key"
              value={formData.adminKey}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          )}

          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-500" />
              Remember me
            </label>
            <a href="#" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-500 underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

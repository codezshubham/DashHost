import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../Redux/Auth';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'ROLE_USER',
        adminKey: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        if (formData.role === 'ROLE_ADMIN' && formData.adminKey.trim() === '') {
            return setError('Admin Key is required for Admins');
        }

        setLoading(true);
        setError('');

        try {
            const resultAction = await dispatch(signupUser(formData));

            if (signupUser.fulfilled.match(resultAction)) {
                localStorage.setItem('token', resultAction.payload.token);
                toast.success('Signup successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                const errorMessage = resultAction.payload || 'Signup failed';
                toast.error(errorMessage);
                setError(errorMessage);
            }
        } catch (err) {
            toast.error(err?.message || 'Signup failed');
            setError(err?.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-black dark:bg-gradient-to-br dark:from-gray-900 dark:to-black dark:text-white flex items-center justify-center px-4 transition-colors duration-300 py-0 md:py-10">
            <ToastContainer position="top-center" autoClose={3000} />
            <div className="w-full max-w-4xl mx-auto bg-gray-100/70 dark:bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-center">
                    Join <span className="text-blue-500">DashHost</span>
                </h1>
                <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-6">
                    Create your account below to get started.
                </p>

                {/* Role Toggle */}
                <div className="flex justify-center gap-4 mb-6">
                    {['ROLE_USER', 'ROLE_ADMIN'].map((roleOption) => (
                        <button
                            key={roleOption}
                            type="button"
                            onClick={() => handleRoleToggle(roleOption)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${formData.role === roleOption
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-gray-300 text-black hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                                }`}
                        >
                            {roleOption === 'ROLE_USER' ? 'Staff' : 'Admin'}
                        </button>
                    ))}
                </div>

                {error && <p className="text-red-500 text-center mb-4 font-medium">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="flex gap-4">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-1/2 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-1/2 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {formData.role === 'ROLE_ADMIN' && (
                        <input
                            type="password"
                            name="adminKey"
                            placeholder="Admin Key"
                            value={formData.adminKey}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white border border-red-400 dark:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    )}

                    <div className="flex items-center gap-2">
                        <input type="checkbox" required />
                        <label className="text-sm text-gray-600 dark:text-gray-400">
                            I agree to the{' '}
                            <a href="#" className="text-blue-500 underline">
                                Privacy Policy & Terms
                            </a>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>

                    <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-500 underline">
                            Sign In
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;

import React from 'react';
import { Link } from 'react-router-dom';
import image from '../../Asset/WebLanding.png';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-900 text-gray-800 dark:text-white py-16 px-6 md:px-12 lg:px-24">

      {/* 🔵 Brighter Animated Blobs */}
      <div className="absolute top-[-5rem] left-[-5rem] w-[350px] h-[350px] bg-blue-500 opacity-60 rounded-full mix-blend-lighten filter blur-2xl animate-blob"></div>
      <div className="absolute top-[10rem] right-[-5rem] w-[350px] h-[350px] bg-purple-500 opacity-60 rounded-full mix-blend-lighten filter blur-2xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-5rem] left-[10rem] w-[350px] h-[350px] bg-pink-500 opacity-60 rounded-full mix-blend-lighten filter blur-2xl animate-blob animation-delay-4000"></div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">

        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left space-y-6 z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Simplify Your <span className="text-blue-600 dark:text-blue-400">Web Hosting</span> Management
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto md:mx-0">
            Manage domains, monitor uptime, configure servers, and track usage all in one seamless dashboard. Fast, secure, and built for scale.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2">
            <Link
              to="/get-started"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md shadow transition duration-300"
            >
              Get Started
            </Link>
            <Link
              to="/demo"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 dark:text-blue-400 font-semibold px-6 py-3 rounded-md transition duration-300"
            >
              Watch Demo
            </Link>
          </div>
        </div>

        {/* Right Content (Image or Illustration) */}
        <div className="md:w-1/3 flex justify-center z-10 mt-10 md:mt-0">
          <div className="relative p-2 bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-500 rounded-2xl shadow-xl hover:scale-105 transition duration-500 ease-in-out">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-2 backdrop-blur-sm bg-opacity-70 shadow-lg">
              <img
                src={image}
                alt="Dashboard Illustration"
                className="w-full max-w-md h-auto rounded-xl shadow-md"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;

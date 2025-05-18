import React from 'react';
import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagram,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 pt-20 pb-6 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300 border-t-2 border-gray-400 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-14 text-center">
          
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-3xl font-bold tracking-wide inline-block hover:opacity-90 transition"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 dark:from-blue-400 dark:to-cyan-300 drop-shadow-md">
                <span className="text-4xl font-extrabold text-blue-700 dark:text-blue-300 animate-pulse">D</span>
                ashHost
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Reliable Dashboard Hosting <br /> & Management Made Easy.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-800 dark:text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Features', 'Pricing', 'My Dashboard', 'Support'].map((label, idx) => (
                <li key={idx}>
                  <Link to={`/${label.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-blue-500 dark:hover:text-cyan-300 transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-gray-800 dark:text-white font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Preferences'].map((item, idx) => (
                <li key={idx}>
                  <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-blue-500 dark:hover:text-cyan-300 transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className='text-center'>
            <h4 className="text-gray-800 dark:text-white font-semibold text-lg mb-4 text-center">Get in Touch</h4>
            <div className="flex space-x-5 mt-5 text-xl justify-center md:justify-start">
              <a href="https://twitter.com/dashhost" target="_blank" rel="noreferrer" aria-label="Twitter" className="text-[#1DA1F2] hover:text-white transition">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com/company/dashhost" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-[#0077B5] hover:text-white transition">
                <FaLinkedin />
              </a>
              <a href="https://github.com/dashhost" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-gray-800 dark:text-white hover:text-gray-500 transition">
                <FaGithub />
              </a>
              <a href="https://instagram.com/dashhost" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-[#E1306C] hover:text-white transition">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 dark:border-gray-800 my-6"></div>

        {/* Copyright */}
        <p className="text-xs text-gray-500 dark:text-gray-500">
          © {new Date().getFullYear()} <strong>DashHost</strong>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { ServerIcon, CalendarIcon, ClipboardListIcon, LinkIcon } from 'lucide-react';

const HostingPage = ({ hostings, setHostings }) => {
  const hosting = hostings[0] || {
    provider: '',
    expiryDate: '',
    plan: '',
    loginUrl: ''
  };

  const handleChange = (field, value) => {
    const updatedHosting = { ...hosting, [field]: value };
    setHostings([updatedHosting]); // Always keep a single-item array
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-indigo-700 dark:text-indigo-400">Hosting Details</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
          Manage hosting provider, plan details, and login URL.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl space-y-6 transition">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Provider */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <ServerIcon className="w-4 h-4" />
              Provider
            </label>
            <input
              type="text"
              value={hosting.provider}
              onChange={(e) => handleChange('provider', e.target.value)}
              placeholder="Enter provider"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Expiry Date */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              Expiry Date
            </label>
            <input
              type="date"
              value={hosting.expiryDate}
              onChange={(e) => handleChange('expiryDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Plan */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <ClipboardListIcon className="w-4 h-4" />
              Plan
            </label>
            <input
              type="text"
              value={hosting.plan}
              onChange={(e) => handleChange('plan', e.target.value)}
              placeholder="Enter plan"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Login URL */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <LinkIcon className="w-4 h-4" />
              Login URL
            </label>
            <input
              type="text"
              value={hosting.loginUrl}
              onChange={(e) => handleChange('loginUrl', e.target.value)}
              placeholder="Enter login URL"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostingPage;

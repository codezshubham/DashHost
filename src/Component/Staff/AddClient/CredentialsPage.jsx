import React from 'react';
import { KeyRoundIcon, UserIcon, ShieldIcon } from 'lucide-react';

const CredentialsPage = ({ credentials, setCredentials }) => {
  const credential = credentials[0] || { type: '', username: '', encryptedPassword: '' };

  const handleChange = (field, value) => {
    const updatedCredential = { ...credential, [field]: value };
    setCredentials([updatedCredential]); // Always keep a single-item array
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-indigo-700 dark:text-indigo-400">Credentials</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
          Securely store login information for server or panel access.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl space-y-6 transition">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Type */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <KeyRoundIcon className="w-4 h-4" />
              Credential Type
            </label>
            <input
              type="text"
              value={credential.type}
              onChange={(e) => handleChange('type', e.target.value)}
              placeholder="e.g., cPanel, FTP"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Username */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              Username
            </label>
            <input
              type="text"
              value={credential.username}
              onChange={(e) => handleChange('username', e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <ShieldIcon className="w-4 h-4" />
              Password
            </label>
            <input
              type="password"
              value={credential.encryptedPassword}
              onChange={(e) => handleChange('encryptedPassword', e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CredentialsPage;

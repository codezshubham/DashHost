import React from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/solid';

const CredentialsPage = ({ credentials, setCredentials }) => {
  const handleChange = (index, field, value) => {
    const updated = [...credentials];
    updated[index][field] = value;
    setCredentials(updated);
  };

  const handleAddCredential = () => {
    setCredentials([...credentials, { type: '', username: '', encryptedPassword: '' }]);
  };

  const handleRemoveCredential = (index) => {
    setCredentials(credentials.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6 border-b border-gray-300 dark:border-gray-700 pb-3">
        Credentials
      </h2>

      {credentials.map((cred, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition hover:shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Type', field: 'type', placeholder: 'e.g., cPanel, FTP' },
              { label: 'Username', field: 'username', placeholder: 'Enter username' },
              { label: 'Password', field: 'encryptedPassword', type: 'password', placeholder: 'Enter password' }
            ].map(({ label, field, type = 'text', placeholder }) => (
              <div key={field} className="flex flex-col">
                <label
                  htmlFor={`${field}-${index}`}
                  className="mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  {label}
                </label>
                <input
                  id={`${field}-${index}`}
                  type={type}
                  value={cred[field]}
                  onChange={(e) => handleChange(index, field, e.target.value)}
                  placeholder={placeholder}
                  className="rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-sm"
                />
              </div>
            ))}
          </div>

          {credentials.length > 1 && (
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => handleRemoveCredential(index)}
                className={`inline-flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 font-semibold rounded-md
                  hover:bg-red-50 dark:hover:bg-red-800 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={credentials.length <= 1}
              >
                <MinusIcon className="h-5 w-5" />
                Remove Credential
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleAddCredential}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300
            text-white font-bold rounded-lg shadow-lg transition"
        >
          <PlusIcon className="h-6 w-6" />
          Add Credential
        </button>
      </div>
    </div>
  );
};

export default CredentialsPage;

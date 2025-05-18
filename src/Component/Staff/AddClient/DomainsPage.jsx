import React from 'react';
import { GlobeIcon, CalendarIcon, Building2Icon, ShieldCheckIcon } from 'lucide-react';

const DomainsPage = ({ domains, setDomains }) => {
  const domain = domains[0] || {
    domainName: '',
    registrar: '',
    expiryDate: '',
    status: ''
  };

  const handleChange = (field, value) => {
    const updatedDomain = { ...domain, [field]: value };
    setDomains([updatedDomain]); // Always keep a single-item array
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-indigo-700 dark:text-indigo-400">Domain Details</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
          Manage domain registration information and expiration status.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl space-y-6 transition">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Domain Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <GlobeIcon className="w-4 h-4" />
              Domain Name
            </label>
            <input
              type="text"
              value={domain.domainName}
              onChange={(e) => handleChange('domainName', e.target.value)}
              placeholder="e.g., example.com"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Registrar */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Building2Icon className="w-4 h-4" />
              Registrar
            </label>
            <input
              type="text"
              value={domain.registrar}
              onChange={(e) => handleChange('registrar', e.target.value)}
              placeholder="Enter registrar"
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
              value={domain.expiryDate}
              onChange={(e) => handleChange('expiryDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <ShieldCheckIcon className="w-4 h-4" />
              Status
            </label>
            <input
              type="text"
              value={domain.status}
              onChange={(e) => handleChange('status', e.target.value)}
              placeholder="e.g., Active, Expired"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainsPage;

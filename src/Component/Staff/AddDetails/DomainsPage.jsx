import React from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/solid';

const DomainsPage = ({ domains, setDomains }) => {
  const handleChange = (index, field, value) => {
    const updatedDomains = [...domains];
    updatedDomains[index][field] = value;
    setDomains(updatedDomains);
  };

  const handleAddDomain = () => {
    setDomains([...domains, { domainName: '', registrar: '', expiryDate: '', status: '' }]);
  };

  const handleRemoveDomain = (index) => {
    setDomains(domains.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6 border-b border-gray-300 dark:border-gray-700 pb-3 cursor-pointer select-none"
          onClick={handleAddDomain}
          title="Click to add a new domain"
      >
        Domains
      </h2>

      {domains.map((domain, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition hover:shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Domain Name', field: 'domainName', placeholder: 'Enter domain name' },
              { label: 'Registrar', field: 'registrar', placeholder: 'Enter registrar' },
              { label: 'Expiry Date', field: 'expiryDate', type: 'date' },
              { label: 'Status', field: 'status', placeholder: 'Enter status' }
            ].map(({ label, field, placeholder, type = 'text' }) => (
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
                  value={domain[field]}
                  onChange={(e) => handleChange(index, field, e.target.value)}
                  placeholder={placeholder}
                  className="rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-sm"
                />
              </div>
            ))}
          </div>

          {domains.length > 1 && (
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => handleRemoveDomain(index)}
                className="inline-flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 font-semibold rounded-md
                  hover:bg-red-50 dark:hover:bg-red-800 transition"
              >
                <MinusIcon className="h-5 w-5" />
                Remove
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleAddDomain}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300
            text-white font-bold rounded-lg shadow-lg transition"
        >
          <PlusIcon className="h-6 w-6" />
          Add Domain
        </button>
      </div>
    </div>
  );
};

export default DomainsPage;

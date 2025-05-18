import React from 'react';
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  LocationMarkerIcon,
} from '@heroicons/react/outline';

const ClientInfoPage = ({ client }) => {
  const infoItems = [
    { label: 'Client Name', value: client?.name, icon: UserIcon },
    { label: 'Contact Email', value: client?.contactEmail, icon: MailIcon },
    { label: 'Phone', value: client?.phone, icon: PhoneIcon },
    { label: 'Address', value: client?.address, icon: LocationMarkerIcon },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 pb-4 select-none">
        Client Information
      </h2>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 space-y-8">
        {infoItems.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center space-x-4">
            <Icon className="h-7 w-7 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {label}
              </label>
              <p className="text-lg text-gray-900 dark:text-gray-100">
                {value || 'N/A'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientInfoPage;

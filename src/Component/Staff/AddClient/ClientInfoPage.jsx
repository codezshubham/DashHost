import React from 'react';
import { UserIcon, MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';

const ClientInfoPage = ({ client, setClient }) => {
  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-indigo-700 dark:text-indigo-400">Client Information</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">Please fill out the details below</p>
      </div>

      <div className="bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700 p-8 rounded-3xl space-y-6">
        {/* Name */}
        <div>
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <UserIcon className="w-4 h-4" />
            Client Name
          </label>
          <input
            type="text"
            name="name"
            value={client.name}
            onChange={handleChange}
            placeholder="e.g., Shubham Kumar"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className=" text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <MailIcon className="w-4 h-4" />
            Contact Email
          </label>
          <input
            type="email"
            name="contactEmail"
            value={client.contactEmail}
            onChange={handleChange}
            placeholder="e.g., client@example.com"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className=" text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <PhoneIcon className="w-4 h-4" />
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={client.phone}
            onChange={handleChange}
            placeholder="e.g., +91 9876543210"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Address */}
        <div>
          <label className=" text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <MapPinIcon className="w-4 h-4" />
            Address
          </label>
          <input
            type="text"
            name="address"
            value={client.address}
            onChange={handleChange}
            placeholder="e.g., 123 Main St, New Delhi, India"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientInfoPage;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyClients } from '../../../Redux/UserSlice';
import ClientCard from './ClientCard';
import { FaFilter, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const DashHomepage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { clients, loading, error } = useSelector((state) => state.user);

  const [clientFilter, setClientFilter] = useState({
    name: '',
    contactEmail: '',
    phone: '',
    address: '',
  });

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(getMyClients());
  }, [dispatch]);

  const handleAddClient = () => {
    navigate(`/dashboard/${id}/addClient`);
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const filteredClients = clients?.filter((client) =>
    client.name?.toLowerCase().includes(clientFilter.name.toLowerCase()) &&
    client.contactEmail?.toLowerCase().includes(clientFilter.contactEmail.toLowerCase()) &&
    client.phone?.toLowerCase().includes(clientFilter.phone.toLowerCase()) &&
    client.address?.toLowerCase().includes(clientFilter.address.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Buttons Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        {/* Add Client Button (Left) */}
        <button
          onClick={handleAddClient}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          + Add Client
        </button>

        {/* Filter Button (Right) */}
        <button
          onClick={toggleFilters}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <FaFilter className="text-gray-600 dark:text-gray-300" />
          <span className="hidden sm:inline">Filters</span>
        </button>
      </div>

      {/* Filter Section */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 mt-6 border border-gray-200 dark:border-gray-700 transition-all duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Name Filter */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 flex items-center gap-2">
                <FaUser className="text-gray-500 dark:text-gray-400" />
                Name
              </label>
              <input
                type="text"
                placeholder="Filter by Name"
                value={clientFilter.name}
                onChange={(e) => setClientFilter({ ...clientFilter, name: e.target.value })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email Filter */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 flex items-center gap-2">
                <FaEnvelope className="text-gray-500 dark:text-gray-400" />
                Email
              </label>
              <input
                type="email"
                placeholder="Filter by Email"
                value={clientFilter.contactEmail}
                onChange={(e) => setClientFilter({ ...clientFilter, contactEmail: e.target.value })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone Filter */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 flex items-center gap-2">
                <FaPhone className="text-gray-500 dark:text-gray-400" />
                Phone
              </label>
              <input
                type="text"
                placeholder="Filter by Phone"
                value={clientFilter.phone}
                onChange={(e) => setClientFilter({ ...clientFilter, phone: e.target.value })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address Filter */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-500 dark:text-gray-400" />
                Address
              </label>
              <input
                type="text"
                placeholder="Filter by Address"
                value={clientFilter.address}
                onChange={(e) => setClientFilter({ ...clientFilter, address: e.target.value })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 mt-6">Your Clients</h1>
      {/* Client Cards or Status */}
      {loading ? (
        <div className="text-center text-blue-600 dark:text-blue-400 font-medium">Loading clients...</div>
      ) : error ? (
        <div className="text-center text-red-500 font-medium">Error: {error}</div>
      ) : filteredClients?.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400">No clients found with current filter.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filteredClients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashHomepage;

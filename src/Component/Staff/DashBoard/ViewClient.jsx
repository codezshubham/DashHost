import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMyClients } from '../../../Redux/UserSlice';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Server,
  KeyRound,
} from 'lucide-react';

const ViewClient = () => {
  const { clientId } = useParams();
  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getMyClients());
  }, [dispatch]);

  const client = clients?.find((c) => c.id === parseInt(clientId));

  if (loading) return <div className="text-center mt-20 text-lg font-medium text-indigo-600 animate-pulse">Loading client info...</div>;
  if (error) return <div className="text-center mt-20 text-red-600 font-semibold">{error}</div>;
  if (!client) return <div className="text-center mt-20 text-gray-500 dark:text-gray-400 font-medium">Client not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Client Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-10 text-white text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-3 drop-shadow-md">{client.name}</h1>
        <div className="flex flex-col sm:flex-row justify-center gap-10 text-xl font-light tracking-wide">
          <div className="flex items-center gap-3 hover:text-blue-300 transition cursor-default">
            <Mail className="w-6 h-6" />
            <span>{client.contactEmail || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-3 hover:text-green-300 transition cursor-default">
            <Phone className="w-6 h-6" />
            <span>{client.phone || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-3 hover:text-red-300 transition cursor-default">
            <MapPin className="w-6 h-6" />
            <span>{client.address || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Domains */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold flex items-center gap-4 text-indigo-700 dark:text-indigo-400 mb-4">
            <Globe className="w-7 h-7 text-indigo-500" />
            Domains
          </h2>
          {client.domains?.length ? (
            client.domains.map((domain) => (
              <div
                key={domain.id}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition cursor-pointer"
                title={`Domain: ${domain.domainName}`}
              >
                <p className="text-lg font-semibold mb-1 dark:text-white">{domain.domainName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400"><strong>Registrar:</strong> {domain.registrar}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400"><strong>Expiry:</strong> {domain.expiryDate}</p>
                <p className={`text-sm font-medium ${
                  domain.status.toLowerCase() === 'active' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  Status: {domain.status}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 dark:text-gray-500 italic">No domains found.</p>
          )}
        </section>

        {/* Hostings */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold flex items-center gap-4 text-purple-700 dark:text-purple-400 mb-4">
            <Server className="w-7 h-7 text-purple-500" />
            Hostings
          </h2>
          {client.hostings?.length ? (
            client.hostings.map((hosting) => (
              <div
                key={hosting.id}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition cursor-pointer"
                title={`Hosting by ${hosting.provider}`}
              >
                <p className="text-lg font-semibold mb-1 dark:text-white">{hosting.provider}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400"><strong>Plan:</strong> {hosting.plan}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400"><strong>Expiry:</strong> {hosting.expiryDate}</p>
                <p className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                  <strong>Login URL:</strong>{' '}
                  <a href={hosting.loginUrl} target="_blank" rel="noopener noreferrer" className="break-all">
                    {hosting.loginUrl}
                  </a>
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 dark:text-gray-500 italic">No hosting information available.</p>
          )}
        </section>

        {/* Credentials */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold flex items-center gap-4 text-yellow-600 dark:text-yellow-400 mb-4">
            <KeyRound className="w-7 h-7 text-yellow-500" />
            Credentials
          </h2>
          {client.credentials?.length ? (
            client.credentials.map((cred) => (
              <div
                key={cred.id}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition cursor-pointer"
                title={`${cred.type} credentials`}
              >
                <p className="text-lg font-semibold mb-1 dark:text-white">{cred.type}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400"><strong>Username:</strong> {cred.username}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 break-all"><strong>Password:</strong> {cred.encryptedPassword}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 dark:text-gray-500 italic">No credentials stored.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ViewClient;

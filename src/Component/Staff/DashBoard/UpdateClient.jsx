import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  updateClient,
  updateCredential,
  updateDomain,
  updateHosting,
} from '../../../Redux/UpdateClientSlice';
import { getMyClients } from '../../../Redux/UserSlice';
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  LocationMarkerIcon,
  KeyIcon,
  GlobeAltIcon,
  DatabaseIcon,
  LockClosedIcon,
  CalendarIcon,
  LinkIcon,
} from '@heroicons/react/outline';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InputGroup = ({ icon: Icon, placeholder, value, onChange, type = 'text' }) => (
  <div className="relative">
    <Icon className="absolute top-1/2 left-3 w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none" />
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
    />
  </div>
);

const UpdateClientPage = () => {
  const dispatch = useDispatch();
  const { clientId } = useParams();
  const { clients } = useSelector((state) => state.user);
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    dispatch(getMyClients());
  }, [dispatch]);

  useEffect(() => {
    if (clients?.length) {
      const selected = clients.find((c) => String(c.id) === clientId);
      setClientData(selected || null);
    }
  }, [clients, clientId]);

  const handleFieldChange = (section, index, field, value) => {
    setClientData((prev) => {
      const updated = [...prev[section]];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, [section]: updated };
    });
  };

  const handleMainChange = (field, value) => {
    setClientData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clientData) return;

    try {
      await dispatch(updateClient({
        id: clientData.id,
        clientData: {
          name: clientData.name,
          contactEmail: clientData.contactEmail,
          phone: clientData.phone,
          address: clientData.address,
        },
      })).unwrap();

      await Promise.all(
        clientData.credentials?.map((cred) =>
          dispatch(updateCredential({
            id: cred.id,
            credentialData: {
              type: cred.type,
              username: cred.username,
              encryptedPassword: cred.encryptedPassword,
            },
          })).unwrap()
        )
      );

      await Promise.all(
        clientData.domains?.map((domain) =>
          dispatch(updateDomain({
            id: domain.id,
            domainData: {
              domainName: domain.domainName,
              registrar: domain.registrar,
              expiryDate: domain.expiryDate,
              status: domain.status,
            },
          })).unwrap()
        )
      );

      await Promise.all(
        clientData.hostings?.map((host) =>
          dispatch(updateHosting({
            id: host.id,
            hostingData: {
              provider: host.provider,
              expiryDate: host.expiryDate,
              plan: host.plan,
              loginUrl: host.loginUrl,
            },
          })).unwrap()
        )
      );

      toast.success('Client updated successfully!');
    } catch (error) {
      toast.error('Failed to update client. Please try again.');
      console.error('Update error:', error);
    }
  };

  if (!clientData) return <p className="p-6 text-gray-600 dark:text-gray-300 text-center">Loading client data...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 py-10 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-lg">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-8 text-blue-700 dark:text-blue-400 text-center">Update Client: {clientData.name}</h2>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Client Info */}
        <section>
          <h3 className="text-2xl font-semibold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">Client Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputGroup icon={UserIcon} placeholder="Name" value={clientData.name} onChange={(e) => handleMainChange('name', e.target.value)} />
            <InputGroup icon={MailIcon} placeholder="Email" value={clientData.contactEmail} onChange={(e) => handleMainChange('contactEmail', e.target.value)} />
            <InputGroup icon={PhoneIcon} placeholder="Phone" value={clientData.phone} onChange={(e) => handleMainChange('phone', e.target.value)} />
            <InputGroup icon={LocationMarkerIcon} placeholder="Address" value={clientData.address} onChange={(e) => handleMainChange('address', e.target.value)} />
          </div>
        </section>

        {/* Credentials */}
        <section>
          <h3 className="text-2xl font-semibold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">Credentials</h3>
          {clientData.credentials.map((cred, index) => (
            <div key={cred.id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputGroup icon={KeyIcon} placeholder="Type" value={cred.type} onChange={(e) => handleFieldChange('credentials', index, 'type', e.target.value)} />
                <InputGroup icon={UserIcon} placeholder="Username" value={cred.username} onChange={(e) => handleFieldChange('credentials', index, 'username', e.target.value)} />
                <InputGroup icon={LockClosedIcon} placeholder="Password" value={cred.encryptedPassword} onChange={(e) => handleFieldChange('credentials', index, 'encryptedPassword', e.target.value)} />
              </div>
            </div>
          ))}
        </section>

        {/* Domains */}
        <section>
          <h3 className="text-2xl font-semibold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">Domains</h3>
          {clientData.domains.map((domain, index) => (
            <div key={domain.id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup icon={GlobeAltIcon} placeholder="Domain Name" value={domain.domainName} onChange={(e) => handleFieldChange('domains', index, 'domainName', e.target.value)} />
                <InputGroup icon={UserIcon} placeholder="Registrar" value={domain.registrar} onChange={(e) => handleFieldChange('domains', index, 'registrar', e.target.value)} />
                <InputGroup icon={CalendarIcon} type="date" value={domain.expiryDate} onChange={(e) => handleFieldChange('domains', index, 'expiryDate', e.target.value)} />
                <InputGroup icon={LockClosedIcon} placeholder="Status" value={domain.status} onChange={(e) => handleFieldChange('domains', index, 'status', e.target.value)} />
              </div>
            </div>
          ))}
        </section>

        {/* Hostings */}
        <section>
          <h3 className="text-2xl font-semibold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">Hostings</h3>
          {clientData.hostings.map((host, index) => (
            <div key={host.id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup icon={DatabaseIcon} placeholder="Provider" value={host.provider} onChange={(e) => handleFieldChange('hostings', index, 'provider', e.target.value)} />
                <InputGroup icon={CalendarIcon} type="date" value={host.expiryDate} onChange={(e) => handleFieldChange('hostings', index, 'expiryDate', e.target.value)} />
                <InputGroup icon={UserIcon} placeholder="Plan" value={host.plan} onChange={(e) => handleFieldChange('hostings', index, 'plan', e.target.value)} />
                <InputGroup icon={LinkIcon} placeholder="Login URL" value={host.loginUrl} onChange={(e) => handleFieldChange('hostings', index, 'loginUrl', e.target.value)} />
              </div>
            </div>
          ))}
        </section>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition duration-300"
          >
            Update Client
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateClientPage;

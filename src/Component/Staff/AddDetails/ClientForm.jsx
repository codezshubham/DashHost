import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ClientInfoPage from './ClientInfoPage';
import DomainsPage from './DomainsPage';
import HostingPage from './HostingPage';
import CredentialsPage from './CredentialsPage';

import {
  getClientById,
  createDomain,
  createHosting,
  createCredential,
} from '../../../Redux/addClientDetails';

const AddClientPage = () => {
  const dispatch = useDispatch();
  const { clientId } = useParams();
  const client = useSelector((state) => state.client.client);

  const [domains, setDomains] = useState([
    { domainName: '', registrar: '', expiryDate: '', status: '' },
  ]);
  const [hostings, setHostings] = useState([
    { provider: '', expiryDate: '', plan: '', loginUrl: '' },
  ]);
  const [credentials, setCredentials] = useState([
    { type: '', username: '', encryptedPassword: '' },
  ]);

  useEffect(() => {
    if (clientId) {
      dispatch(getClientById(clientId));
    }
  }, [clientId, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      for (const credential of credentials) {
        await dispatch(createCredential({ clientId, credentialData: credential })).unwrap();
      }

      for (const domain of domains) {
        await dispatch(createDomain({ clientId, domainData: domain })).unwrap();
      }

      for (const hosting of hostings) {
        await dispatch(createHosting({ clientId, hostingData: hosting })).unwrap();
      }

      toast.success('Client data added successfully!');
    } catch (error) {
      console.error('Error while submitting:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white dark:bg-gray-800 shadow"
    >
      <ClientInfoPage client={client} setClient={() => {}} readOnly={true} />

      <DomainsPage domains={domains} setDomains={setDomains} />
      <HostingPage hostings={hostings} setHostings={setHostings} />
      <CredentialsPage credentials={credentials} setCredentials={setCredentials} />

      <div className="flex justify-end">
        <button
          type="submit"
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </form>
  );
};

export default AddClientPage;

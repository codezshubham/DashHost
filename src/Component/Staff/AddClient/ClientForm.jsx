import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClientInfoPage from './ClientInfoPage';
import DomainsPage from './DomainsPage';
import HostingPage from './HostingPage';
import CredentialsPage from './CredentialsPage';
import { getUserProfile } from '../../../Redux/UserSlice';
import {
  createClient,
  createDomain,
  createHosting,
  createCredential,
} from '../../../Redux/CreateClientSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddClientPage = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.user.selectedUser);

  const [client, setClient] = useState({
    name: '',
    contactEmail: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const [domains, setDomains] = useState([
    { domainName: '', registrar: '', expiryDate: '', status: '' },
  ]);
  const [hostings, setHostings] = useState([
    { provider: '', expiryDate: '', plan: '', loginUrl: '' },
  ]);
  const [credentials, setCredentials] = useState([
    { type: '', username: '', encryptedPassword: '' },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const clientRes = await dispatch(createClient(client)).unwrap();
      const clientId = clientRes?.id;

      if (!clientId) {
        throw new Error('Client ID not received. Aborting subsequent requests.');
      }

      for (const credential of credentials) {
        await dispatch(createCredential({ ...credential, client: { id: clientId } }));
      }

      for (const domain of domains) {
        await dispatch(createDomain({ ...domain, client: { id: clientId } }));
      }

      for (const hosting of hostings) {
        await dispatch(createHosting({ ...hosting, client: { id: clientId } }));
      }

      toast.success('Client and related information successfully added!');
    } catch (error) {
      console.error('Submission failed:', error);
      toast.error('An error occurred while submitting. Please try again.');
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-2 bg-white dark:bg-gray-800 shadow"
      >
        <ClientInfoPage client={client} setClient={setClient} />
        <DomainsPage domains={domains} setDomains={setDomains} />
        <HostingPage hostings={hostings} setHostings={setHostings} />
        <CredentialsPage credentials={credentials} setCredentials={setCredentials} />
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-4 py-2 mb-6 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>

      </form>
      <ToastContainer position="top-right" autoClose={4000} />
    </>
  );
};

export default AddClientPage;

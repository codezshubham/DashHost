import React, { useState, useEffect } from 'react';

const ClientFilter = ({ clients }) => {
  const [client, setClient] = useState({
    name: '',
    contactEmail: '',
    phone: '',
    address: '',
  });

  const [filteredClients, setFilteredClients] = useState(clients);

  useEffect(() => {
    const filtered = clients.filter((c) => {
      return (
        c.name.toLowerCase().includes(client.name.toLowerCase()) &&
        c.contactEmail.toLowerCase().includes(client.contactEmail.toLowerCase()) &&
        c.phone.toLowerCase().includes(client.phone.toLowerCase()) &&
        c.address.toLowerCase().includes(client.address.toLowerCase())
      );
    });
    setFilteredClients(filtered);
  }, [client, clients]);

  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-4 p-4 bg-gray-100 rounded-md"
      >
        <input
          type="text"
          placeholder="Client Name"
          value={client.name}
          onChange={(e) => setClient({ ...client, name: e.target.value })}
          className="input-style"
        />
        <input
          type="email"
          placeholder="Contact Email"
          value={client.contactEmail}
          onChange={(e) => setClient({ ...client, contactEmail: e.target.value })}
          className="input-style"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={client.phone}
          onChange={(e) => setClient({ ...client, phone: e.target.value })}
          className="input-style"
        />
        <input
          type="text"
          placeholder="Address"
          value={client.address}
          onChange={(e) => setClient({ ...client, address: e.target.value })}
          className="input-style"
        />

        <button
          type="button"
          onClick={() =>
            setClient({ name: '', contactEmail: '', phone: '', address: '' })
          }
          className="btn-secondary"
        >
          Clear
        </button>
      </form>

      <div className="mt-6">
        {filteredClients.length === 0 ? (
          <p>No clients found.</p>
        ) : (
          filteredClients.map((c) => (
            <div key={c.id} className="p-4 border rounded mb-2">
              <p>Name: {c.name}</p>
              <p>Email: {c.contactEmail}</p>
              <p>Phone: {c.phone}</p>
              <p>Address: {c.address}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClientFilter;

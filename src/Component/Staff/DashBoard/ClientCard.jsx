import React from 'react';
import { Mail, Phone, MapPin, Eye, Pencil, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteClient } from '../../../Redux/DeleteClientSlice';
import { toast } from 'react-toastify';

const ClientCard = ({ client }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${client.name}?`)) {
      try {
        const resultAction = await dispatch(deleteClient(client.id));

        if (deleteClient.fulfilled.match(resultAction)) {
          toast.success(`${client.name} deleted successfully.`);
        } else {
          toast.error(resultAction.payload || 'Failed to delete client.');
        }
      } catch (err) {
        toast.error('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition duration-300 ease-in-out w-full max-w-md mx-auto">
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {client.name}
        </h2>
        <button
          onClick={() => navigate(`/dashboard/${userId}/addMore/${client.id}`)}
          title="Add"
          className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700 transition"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
        <Mail className="w-5 h-5 mr-2 text-blue-500" />
        <span className="text-sm">{client.contactEmail}</span>
      </div>

      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
        <Phone className="w-5 h-5 mr-2 text-green-500" />
        <span className="text-sm">{client.phone}</span>
      </div>

      <div className="flex items-start text-gray-600 dark:text-gray-300 mb-4">
        <MapPin className="w-5 h-5 mr-2 text-red-500 mt-0.5" />
        <span className="text-sm">{client.address}</span>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => navigate(`/dashboard/${userId}/view/${client.id}`)}
          title="View"
          className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700 transition"
        >
          <Eye className="w-5 h-5" />
        </button>
        <button
          onClick={() => navigate(`/dashboard/${userId}/update/${client.id}`)}
          title="Update"
          className="p-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white dark:bg-yellow-600 dark:hover:bg-yellow-700 transition"
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button
          onClick={handleDelete}
          title="Delete"
          className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700 transition"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ClientCard;

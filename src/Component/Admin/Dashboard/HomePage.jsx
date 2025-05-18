import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, deleteUser } from '../../../Redux/UserSlice';
import { Trash2, ActivitySquare, X } from 'lucide-react';
import AdminActivityLog from './LogsComponent';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UsersList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this user?")) {
    dispatch(deleteUser(id))
      .unwrap()
      .then(() => {
        toast.success("User deleted successfully!");
      })
      .catch((error) => {
        toast.error(`Delete failed: ${error || 'Unknown error'}`);
      });
  }
};


  return (
    <div className="relative max-w-7xl mx-auto p-4 overflow-x-hidden dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

      {/* Button to toggle drawer */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="fixed top-20 right-6 z-30 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
      >
        <ActivitySquare size={18} className="inline-block mr-2" />
        View Activity Logs
      </button>

      {/* Users List Section */}
      <div className={`transition-all duration-300 ${drawerOpen ? 'md:pr-[370px]' : ''}`}>
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 overflow-auto max-h-[80vh]">
          <h2 className="text-2xl font-semibold mb-6">All Users</h2>

          {/* Grid Header */}
          <div className="hidden md:grid grid-cols-[2fr_2fr_2fr_1fr] gap-4 bg-rose-600 text-white px-6 py-3 rounded-t-lg font-semibold shadow-md">
            <p>ID</p>
            <p>Name</p>
            <p>Email</p>
            <p className="text-right">Action</p>
          </div>

          {/* Users List */}
          <div className="space-y-4 mt-2">
            {loading ? (
              <p>Loading users...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : Array.isArray(users) && users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user.id}
                  className="grid md:grid-cols-[2fr_2fr_2fr_1fr] gap-4 bg-gray-50 dark:bg-gray-700 px-6 py-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 items-center"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-300">{user.id}</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{user.name}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-200">{user.email}</p>
                  <div className="text-right">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                      aria-label={`Delete user ${user.name}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-300 text-lg mt-6">
                No users found.
              </p>
            )}
          </div>
        </section>
      </div>

      {/* Slide-in Drawer for Logs */}
      <div
        className={`fixed top-0 right-0 h-full w-[350px] bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 z-40 ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">Activity Logs</h2>
          <button
            onClick={() => setDrawerOpen(false)}
            className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Logs content */}
        <div className="p-4 overflow-auto h-[calc(100vh-70px)]">
          <AdminActivityLog />
        </div>
      </div>

      {/* Overlay */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-30"
        />
      )}
    </div>
  );
};

export default UsersList;

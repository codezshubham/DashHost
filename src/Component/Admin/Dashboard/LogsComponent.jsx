import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLogs } from "../../../Redux/UserSlice";

const AdminActivityLog = () => {
  const dispatch = useDispatch();
  const { logs, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllLogs());
  }, [dispatch]);

  return (
    <div className="overflow-auto max-h-[70vh]">
      <h1 className="text-3xl p-6 text-semibold">Activity Logs</h1>
      {loading ? (
        <p className="text-center text-gray-500 mt-6">Loading activity logs...</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-6">Error: {error}</p>
      ) : logs.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">No activity logs found.</p>
      ) : (
        <table className="min-w-full table-auto bg-white dark:bg-slate-900 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600 dark:bg-blue-800 text-white text-left">
              <th className="p-3 font-semibold text-sm">User</th>
              <th className="p-3 font-semibold text-sm">Role</th>
              <th className="p-3 font-semibold text-sm">Action</th>
              <th className="p-3 font-semibold text-sm">Details</th>
              <th className="p-3 font-semibold text-sm">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr
                key={log.id}
                className="border-b border-gray-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors duration-200"
              >
                <td className="p-3 text-sm text-gray-800 dark:text-gray-200">{log.username}</td>
                <td className="p-3 text-sm text-gray-700 dark:text-gray-400">{log.role}</td>
                <td className="p-3 text-sm text-gray-700 dark:text-gray-400">{log.action}</td>
                <td className="p-3 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">{log.details}</td>
                <td className="p-3 text-sm text-gray-600 dark:text-gray-400">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminActivityLog;

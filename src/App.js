import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './Component/Routers/MainLayout';
import StaffPage from './Component/Routers/StaffPage';
import AdminPage from './Component/Routers/AdminPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/*" element={<MainLayout />} />
          <Route path="/dashboard/:id/*" element={<StaffPage />} />
          <Route path="/adminDash/*" element={<AdminPage />} />
        </Routes>
      </Router>

      {/* Toast container must be placed once in your app */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;

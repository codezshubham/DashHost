import { Routes, Route } from 'react-router-dom';
import UserNavbar from '../Staff/navbar/Navbar';
import AdminHomePage from '../Admin/Dashboard/HomePage';
import Footer from '../Home/Footer';
const AdminPage = () => {

  return (
    <>
      <UserNavbar />
      <Routes>
        <Route path="/" element={<AdminHomePage />} />
      </Routes>
        <Footer/>
    </>
  );
};

export default AdminPage;

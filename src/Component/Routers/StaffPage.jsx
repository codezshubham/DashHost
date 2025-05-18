import { Routes, Route, useParams } from 'react-router-dom';
import AddClientForm from '../Staff/AddClient/ClientForm';
import UserNavbar from '../Staff/navbar/Navbar';
import Footer from '../Home/Footer';
import DashHomepage from '../Staff/DashBoard/DashHomepage';
import ViewClient from '../Staff/DashBoard/ViewClient';
import AddClientDetails from '../Staff/AddDetails/ClientForm';
import UpdateClient from '../Staff/DashBoard/UpdateClient';
const StaffPage = () => {
  

  return (
    <>
      <UserNavbar />
      <Routes>
        <Route path="/" element={<DashHomepage />} />
        <Route path="/addClient" element={<AddClientForm />} />
        <Route path='/view/:clientId' element={<ViewClient/>} />
        <Route path='/addMore/:clientId' element={<AddClientDetails/>} />
        <Route path='/update/:clientId' element={<UpdateClient/>} />
      </Routes>
      <Footer/>
    </>
  );
};

export default StaffPage;

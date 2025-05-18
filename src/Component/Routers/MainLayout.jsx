import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import Signup from '../Auth/Signup';
import Login from '../Auth/Login';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import AboutPage from '../Home/About';
import ContactPage from '../Home/Contact';

const MainLayout = () => {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
};

export default MainLayout;

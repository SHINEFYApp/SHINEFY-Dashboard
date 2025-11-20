import i18n from './i18n';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/home';
import LogIn from './pages/logIn/logIn';
import CreateBookings from './pages/bookings/CreateBookings';
import { Layout } from './components/layout/Layout';
import ManageBooking from './pages/bookings/manage_booking/ManageBooking';
import ManageBookingDetails from './pages/bookings/manage_booking/ManageBookingDetails';
import ManageSlot from './pages/bookings/manage_slot/manageSlot';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, []);

  const authPages = ['/login', '/forgot-password'];
  const isAuthPage = authPages.includes(location.pathname);

  return (
    <>
      {isAuthPage ? (
        // Render without layout
        <Routes>
          <Route path="/login" element={<LogIn />} />
        </Routes>
      ) : (
        // Render with layout
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookings/create" element={<CreateBookings />} />
            <Route path="/bookings/manage" element={<ManageBooking />} />
            <Route path="/bookings/slot" element={<ManageSlot />} />
            <Route path="/bookings/manage/:id" element={<ManageBookingDetails />} />
          </Routes>
        </Layout>
      )}
    </>
  );
}

export default App;

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
import AddVehicles from './pages/vehicles/addVehicles';
import ManageSubAdmin from './pages/users&staff/manageSubAdmin';
import AddSubAdmin from './pages/users&staff/AddSubAdmin';
import UsersWallets from './pages/users&staff/userWallets';

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
            <Route path="/vehicles/add" element={<AddVehicles />} />
            <Route path="/users&staff/manage/subAdmin" element={<ManageSubAdmin />} />
            <Route path="/users&staff/manage/subAdmin/addSubAdmin" element={<AddSubAdmin />} />
            <Route path="/users&staff/manage/usersWallet" element={<UsersWallets />} />
          </Routes>
        </Layout>
      )}
    </>
  );
}

export default App;

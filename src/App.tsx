import i18n from './i18n';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/home';
import LogIn from './pages/logIn/logIn';
import CreateBookings from './pages/bookings/CreateBookings';
import { Layout } from './components/layout/Layout';
import ManageBooking from './pages/bookings/manage_booking/ManageBooking';
import ManageBookingDetails from './pages/bookings/manage_booking/ManageBookingDetails';
import ManageSlot from './pages/bookings/bookings_slot/ManageSlots';
import AddVehicles from './pages/vehicles/addVehicles';
import ManageSubAdmin from './pages/users&staff/manageSubAdmin';
import AddSubAdmin from './pages/users&staff/addSubAdmin';
import UsersWallets from './pages/users&staff/userWallets';
import CreateBookingsSlot from './pages/bookings/bookings_slot/CreateBookingsSlot';
import ManageCountries from './pages/Geography&Regions/manageCountries';
import ManageRegions from './pages/Geography&Regions/manageRegions';
import ManageAreas from './pages/Geography&Regions/manageAreas';
import ManageVehicles from './pages/vehicles/ManageVehicles';
import AddServiceBoy from './pages/users&staff/AddServiceBoy';
import ServiceBoyDetails from './pages/users&staff/ServiceBoyDetails';
import ManageUsers from './pages/users&staff/ManageUsers';

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
            <Route path="/bookings/slot/create" element={<CreateBookingsSlot />} />
            <Route path="/vehicles/add" element={<AddVehicles />} />
            <Route path="/vehicles/manageVehicles" element={<ManageVehicles />} />
            <Route path="/users&staff/manageUsers" element={<ManageUsers />} />
            <Route path="/users&staff/manageSubAdmin" element={<ManageSubAdmin />} />
            <Route path="/users&staff/manageServiceBoy/:id" element={<ServiceBoyDetails />} />
            <Route path="/users&staff/manageServiceBoy/addServiceBoy" element={<AddServiceBoy />} />
            <Route path="/users&staff/subAdmin/addSubAdmin" element={<AddSubAdmin />} />
            <Route path="/users&staff/manageUsersWallet" element={<UsersWallets />} />
            <Route path="/geography&regions/manageCountries" element={<ManageCountries />} />
            <Route path="/geography&regions/manageRegions" element={<ManageRegions />} />
            <Route path="/geography&regions/manageAreas" element={<ManageAreas />} />
          </Routes>
        </Layout>
      )}
    </>
  );
}

export default App;

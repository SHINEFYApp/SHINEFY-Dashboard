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
import ManageService from './pages/services&extra/manageService/manageService';
import AddService from './pages/services&extra/manageService/addService';
import ManageExtraService from './pages/services&extra/manageExtraService/manageExtraService';
import AddExtraService from './pages/services&extra/manageExtraService/addExtraService';
import ManageCoupon from './pages/services&extra/manageCoupon/manageCoupon';
import ManageVehicles from './pages/vehicles/ManageVehicles';
import AddServiceBoy from './pages/users&staff/AddServiceBoy';
import ServiceBoyDetails from './pages/users&staff/ServiceBoyDetails';
import ManageUsers from './pages/users&staff/ManageUsers';
import ManageServiceBoy from './pages/users&staff/ManageServiceBoy';
import AddCoupon from './pages/services&extra/manageCoupon/addCoupon';
import ManageProducts from './pages/productsAndOrders/manageProducts';
import AddProduct from './pages/productsAndOrders/subPages/addProducts';
import AddCategory from './pages/productsAndOrders/subPages/addCategory';
import ManageOrders from './pages/productsAndOrders/manageOrders';
import AddAreas from './pages/Geography&Regions/subPagesAddAreas/addMainArea';
import AddMainArea from './pages/Geography&Regions/subPagesAddAreas/addMainArea';
import AddSubArea from './pages/Geography&Regions/subPagesAddAreas/addSubArea';

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
            <Route path="/users&staff/manage/subAdmin" element={<ManageSubAdmin />} />
            <Route path="/users&staff/manage/subAdmin/addSubAdmin" element={<AddSubAdmin />} />
            <Route path="/users&staff/manage/usersWallet" element={<UsersWallets />} />
            <Route path="/geography&regions/manage/countries" element={<ManageCountries />} />
            <Route path="/geography&regions/manage/regions" element={<ManageRegions />} />
            <Route path="/geography&regions/manage/area" element={<ManageAreas />} />
            <Route path="/geography&regions/manage/area/add/mainArea" element={<AddMainArea />} />
            <Route path="/geography&regions/manage/area/add/subArea" element={<AddSubArea />} />
              <Route path="/services&extra/manage/Service" element={<ManageService />} />
              <Route path="/services&extra/manage/Service/addService" element={<AddService />} />
              <Route path="/services&extra/manage/ExtreService" element={<ManageExtraService />} />
              <Route path="/services&extra/manage/extreService/addExtraService" element={<AddExtraService />} />
              <Route path="/services&extra/manage/coupon" element={<ManageCoupon />} />
              <Route path="/services&extra/manage/coupon/addCoupon" element={<AddCoupon />} />
            <Route path="/vehicles/manage" element={<ManageVehicles />} />
            <Route path="/users&staff/manage/users" element={<ManageUsers />} />
            <Route path="/users&staff/manage/subAdmin" element={<ManageSubAdmin />} />
              <Route path="/users&staff/manage/serviceBoy" element={<ManageServiceBoy />} />
            <Route path="/users&staff/manage/serviceBoy/:id" element={<ServiceBoyDetails />} />
            <Route path="/users&staff/manage/serviceBoy/addServiceBoy" element={<AddServiceBoy />} />
            <Route path="/users&staff/manage/subAdmin/addSubAdmin" element={<AddSubAdmin />} />
            <Route path="/users&staff/manage/usersWallet" element={<UsersWallets />} />
            <Route path="/geography&regions/manage/countries" element={<ManageCountries />} />
            <Route path="/geography&regions/manage/regions" element={<ManageRegions />} />
            <Route path="/geography&regions/manage/area" element={<ManageAreas />} />
              <Route path="/products&orders/manage/Products" element={<ManageProducts />} />
              <Route path="/products&orders/manage/Products/addProduct" element={<AddProduct />} />
              <Route path="/products&orders/manage/Products/addGategory" element={<AddCategory />} />
              <Route path="/products&orders/manage/Orders" element={<ManageOrders />} />
          </Routes>
        </Layout>
      )}
    </>
  );
}

export default App;

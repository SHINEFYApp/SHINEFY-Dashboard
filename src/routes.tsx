import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import CreateBookings from './pages/bookings/CreateBookings';
import ManageBooking from './pages/bookings/manage_booking/ManageBooking';
import ManageBookingDetails from './pages/bookings/manage_booking/ManageBookingDetails';
import ManageSlot from './pages/bookings/bookings_slot/ManageSlots';
import AddVehicles from './pages/vehicles/addVehicles';
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
import ManageUsers from './pages/users&staff/ManageUsers';
import ManageServiceBoy from './pages/users&staff/ManageServiceBoy';
import AddCoupon from './pages/services&extra/manageCoupon/addCoupon';
import ManageProducts from './pages/productsAndOrders/manageProducts';
import AddProduct from './pages/productsAndOrders/subPages/addProducts';
import AddCategory from './pages/productsAndOrders/subPages/addCategory';
import ManageOrders from './pages/productsAndOrders/manageOrders';
import AddMainArea from './pages/Geography&Regions/subPagesAddAreas/addMainArea';
import AddSubArea from './pages/Geography&Regions/subPagesAddAreas/addSubArea';
import ManagePackage from './pages/services&extra/managePackage/managePackage';
import AddNewPackage from './pages/services&extra/managePackage/addNewPackage';
import UpdatePackage from './pages/services&extra/managePackage/updatePackage';
import ManageVat from './pages/Financial & Points/manageVat';
import ManageDriverCommission from './pages/Financial & Points/manageDriverCommission';
import ManageBonusPoint from './pages/Financial & Points/manageBonusPoint';
import ManageAdminEarning from './pages/Financial & Points/manageAdminEarning';
import ManageSubAdmin from './pages/users&staff/manageSubAdmin';
import AddServiceBoy from './pages/users&staff/subPages/AddServiceBoy';
import EditServiceBoy from './pages/users&staff/subPages/EditServiceBoy';
import AddSubAdmin from './pages/users&staff/subPages/addSubAdmin';
import EditSubAdmin from './pages/users&staff/subPages/editSubAdmin';
import ViewSubAdmin from './pages/users&staff/subPages/viewSubAdmin';
import ServiceBoyDetails from './pages/users&staff/subPages/ServiceBoyDetails';
import TrackServiceBoy from './pages/users&staff/subPages/TrackServiceBoy';
import ManageGroup from './pages/users&staff/subPages/ManageGroup';
import ContactUs from './pages/technicalSupport/contactUs/contactUs';
import ManageCompanies from './pages/technicalSupport/Manage Companies/manageCompanies';
import Broadcast from './pages/technicalSupport/Broadcast/broadcast';
import SendBroadcast from './pages/technicalSupport/Broadcast/sendBroadcast';
import Managefaqs from './pages/technicalSupport/managefaqs/managefaqs';
import AddFqs from './pages/technicalSupport/managefaqs/addFqs';
import ManageOrdersQuestions from './pages/technicalSupport/manage orders questions/manageOrdersQuestions';
import AddOrdersQuestions from './pages/technicalSupport/manage orders questions/addOrdersQuestions';

export const RoutesPages = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookings/create" element={<CreateBookings />} />
        <Route path="/bookings/manage" element={<ManageBooking />} />
        <Route path="/bookings/slot" element={<ManageSlot />} />
        <Route path="/bookings/manage/:id" element={<ManageBookingDetails />} />
        <Route path="/bookings/slot/create" element={<CreateBookingsSlot />} />
        <Route path="/vehicles/add" element={<AddVehicles />} />
        <Route path="/users&staff/manage/users" element={<ManageUsers />} />
        <Route path="/users&staff/manage/users/manageGroup" element={<ManageGroup />} />
        <Route path="/users&staff/manage/subAdmin" element={<ManageSubAdmin />} />
        <Route path="/users&staff/manage/serviceBoy" element={<ManageServiceBoy />} />
        <Route path="/users&staff/manage/serviceBoy/:id" element={<ServiceBoyDetails />} />
        <Route path="/users&staff/manage/serviceBoy/track/:id" element={<TrackServiceBoy />} />
        <Route path="/users&staff/manage/serviceBoy/edit/:id" element={<EditServiceBoy />} />
        <Route path="/users&staff/manage/serviceBoy/addServiceBoy" element={<AddServiceBoy />} />
        <Route path="/users&staff/manage/subAdmin/addSubAdmin" element={<AddSubAdmin />} />
        <Route path="/users&staff/manage/subAdmin/edit/:id" element={<EditSubAdmin />} />
        <Route path="/users&staff/manage/subAdmin/view/:id" element={<ViewSubAdmin />} />
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
        <Route path="/services&extra/manage/package" element={<ManagePackage />} />
        <Route path="/services&extra/manage/Package/addPackage" element={<AddNewPackage />} />
        <Route path="/services&extra/manage/Package/updatePackage/:id" element={<UpdatePackage />} />
        <Route path="/vehicles/manage" element={<ManageVehicles />} />
        <Route path="/geography&regions/manage/countries" element={<ManageCountries />} />
        <Route path="/geography&regions/manage/regions" element={<ManageRegions />} />
        <Route path="/geography&regions/manage/area" element={<ManageAreas />} />
        <Route path="/products&orders/manage/Products" element={<ManageProducts />} />
        <Route path="/products&orders/manage/Products/addProduct" element={<AddProduct />} />
        <Route path="/products&orders/manage/Products/addGategory" element={<AddCategory />} />
        <Route path="/products&orders/manage/Orders" element={<ManageOrders />} />
        <Route path="/financial&points/manage/Vat" element={<ManageVat />} />
        <Route path="/financial&points/manage/driverCommission" element={<ManageDriverCommission />} />
        <Route path="/financial&points/manage/bonusPoint" element={<ManageBonusPoint />} />
        <Route path="/financial&points/manage/adminEarning" element={<ManageAdminEarning />} />
        <Route path="/technicalSupport/contactUs" element={<ContactUs />} />
        <Route path="/technicalSupport/manage/companies" element={<ManageCompanies />} />
        <Route path="/technicalSupport/broadcast" element={<Broadcast />} />
        <Route path="/technicalSupport/broadcast/SendBroadcast" element={<SendBroadcast />} />
        <Route path="/technicalSupport/manage/faqs" element={<Managefaqs />} />
        <Route path="/technicalSupport/manage/faqs/addFqs" element={<AddFqs />} />
        <Route path="/technicalSupport/manage/orderQuestions" element={<ManageOrdersQuestions />} />
        <Route path="/technicalSupport/manage/orderQuestions/addOrdersQuestions" element={<AddOrdersQuestions />} />
      </Routes>
    </>
  );
};

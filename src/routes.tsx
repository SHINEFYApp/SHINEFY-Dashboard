import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import CreateBookings from './pages/bookings/CreateBookings';
import ManageBooking from './pages/bookings/manage_booking/ManageBooking';
import ManageBookingDetails from './pages/bookings/manage_booking/ManageBookingDetails';
import ManageSlot from './pages/bookings/bookings_slot/ManageSlots';
import AddVehicles from './pages/vehicles/addVehicles';
import UsersWallets from './pages/users&staff/userWallets';
import CreateBookingsSlot from './pages/bookings/bookings_slot/CreateBookingsSlot';
import EditSpecificSlot from './pages/bookings/bookings_slot/EditSpecificSlot';
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
import UserProfile from './pages/users&staff/UserProfile';
import ContactUs from './pages/technicalSupport/contactUs/contactUs';
import UserPackageDetails from './pages/users&staff/subPages/UserPackageDetails';
import ManageCompanies from './pages/technicalSupport/Manage Companies/manageCompanies';
import Broadcast from './pages/technicalSupport/Broadcast/broadcast';
import SendBroadcast from './pages/technicalSupport/Broadcast/sendBroadcast';
import Managefaqs from './pages/technicalSupport/managefaqs/managefaqs';
import AddFqs from './pages/technicalSupport/managefaqs/addFqs';
import ManageOrdersQuestions from './pages/technicalSupport/manage orders questions/manageOrdersQuestions';
import AddOrdersQuestions from './pages/technicalSupport/manage orders questions/addOrdersQuestions';
import { PermissionGuard } from './components/PermissionGuard';
import { PRIVILEGES } from './constants/permissions';

const P = PRIVILEGES;

export const RoutesPages = () => {
  return (
    <>
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<PermissionGuard permissionId={P.DASHBOARD}><Home /></PermissionGuard>} />

        {/* Bookings */}
        <Route path="/bookings/create" element={<PermissionGuard permissionId={P.MANAGE_CREATE_BOOKING}><CreateBookings /></PermissionGuard>} />
        <Route path="/bookings/manage" element={<PermissionGuard permissionId={P.MANAGE_BOOKING}><ManageBooking /></PermissionGuard>} />
        <Route path="/bookings/manage/:id" element={<PermissionGuard permissionId={P.MANAGE_BOOKING}><ManageBookingDetails /></PermissionGuard>} />
        <Route path="/bookings/slot" element={<PermissionGuard permissionId={P.MANAGE_SLOT}><ManageSlot /></PermissionGuard>} />
        <Route path="/bookings/slot/create" element={<PermissionGuard permissionId={P.MANAGE_SLOT}><CreateBookingsSlot /></PermissionGuard>} />
        <Route path="/bookings/slot/edit/:id" element={<PermissionGuard permissionId={P.MANAGE_SLOT}><EditSpecificSlot /></PermissionGuard>} />

        {/* Vehicles */}
        <Route path="/vehicles/add" element={<PermissionGuard permissionId={P.CREATE_VEHICLE}><AddVehicles /></PermissionGuard>} />
        <Route path="/vehicles/manage" element={<PermissionGuard permissionId={P.MANAGE_CAR_OPTIONS}><ManageVehicles /></PermissionGuard>} />

        {/* Users & Staff */}
        <Route path="/users&staff/manage/users" element={<PermissionGuard permissionId={P.MANAGE_USERS}><ManageUsers /></PermissionGuard>} />
        <Route path="/users&staff/manage/users/:id" element={<PermissionGuard permissionId={P.MANAGE_USERS}><UserProfile /></PermissionGuard>} />
        <Route path="/users&staff/manage/users/:userId/packageDetails/:packageId" element={<PermissionGuard permissionId={P.MANAGE_USERS}><UserPackageDetails /></PermissionGuard>} />
        <Route path="/users&staff/manage/users/manageGroup" element={<PermissionGuard permissionId={P.MANAGE_GROUP}><ManageGroup /></PermissionGuard>} />
        <Route path="/users&staff/manage/subAdmin" element={<PermissionGuard permissionId={P.MANAGE_SUB_ADMIN}><ManageSubAdmin /></PermissionGuard>} />
        <Route path="/users&staff/manage/subAdmin/addSubAdmin" element={<PermissionGuard permissionId={P.MANAGE_SUB_ADMIN}><AddSubAdmin /></PermissionGuard>} />
        <Route path="/users&staff/manage/subAdmin/edit/:id" element={<PermissionGuard permissionId={P.MANAGE_SUB_ADMIN}><EditSubAdmin /></PermissionGuard>} />
        <Route path="/users&staff/manage/subAdmin/view/:id" element={<PermissionGuard permissionId={P.MANAGE_SUB_ADMIN}><ViewSubAdmin /></PermissionGuard>} />
        <Route path="/users&staff/manage/serviceBoy" element={<PermissionGuard permissionId={P.MANAGE_SERVICE_BOY}><ManageServiceBoy /></PermissionGuard>} />
        <Route path="/users&staff/manage/serviceBoy/:id" element={<PermissionGuard permissionId={P.MANAGE_SERVICE_BOY}><ServiceBoyDetails /></PermissionGuard>} />
        <Route path="/users&staff/manage/serviceBoy/track/:id" element={<PermissionGuard permissionId={P.MANAGE_SERVICE_BOY}><TrackServiceBoy /></PermissionGuard>} />
        <Route path="/users&staff/manage/serviceBoy/edit/:id" element={<PermissionGuard permissionId={P.MANAGE_SERVICE_BOY}><EditServiceBoy /></PermissionGuard>} />
        <Route path="/users&staff/manage/serviceBoy/addServiceBoy" element={<PermissionGuard permissionId={P.MANAGE_SERVICE_BOY}><AddServiceBoy /></PermissionGuard>} />
        <Route path="/users&staff/manage/usersWallet" element={<PermissionGuard permissionId={P.MANAGE_USER_WALLET}><UsersWallets /></PermissionGuard>} />

        {/* Geography & Regions */}
        {/* <Route path="/geography&regions/manage/countries" element={<PermissionGuard permissionId={P.MANAGE_COUNTRIES}><ManageCountries /></PermissionGuard>} />
        <Route path="/geography&regions/manage/regions" element={<PermissionGuard permissionId={P.MANAGE_REGIONS}><ManageRegions /></PermissionGuard>} />
        <Route path="/geography&regions/manage/area" element={<PermissionGuard permissionId={P.MANAGE_AREA}><ManageAreas /></PermissionGuard>} />
        <Route path="/geography&regions/manage/area/add/mainArea" element={<PermissionGuard permissionId={P.MANAGE_AREA}><AddMainArea /></PermissionGuard>} />
        <Route path="/geography&regions/manage/area/add/subArea" element={<PermissionGuard permissionId={P.MANAGE_AREA}><AddSubArea /></PermissionGuard>} /> */}

        {/* Services & Extra */}
        {/* <Route path="/services&extra/manage/Service" element={<PermissionGuard permissionId={P.MANAGE_SERVICE}><ManageService /></PermissionGuard>} />
        <Route path="/services&extra/manage/Service/addService" element={<PermissionGuard permissionId={P.MANAGE_SERVICE}><AddService /></PermissionGuard>} />
        <Route path="/services&extra/manage/ExtreService" element={<PermissionGuard permissionId={P.MANAGE_EXTRA_SERVICE}><ManageExtraService /></PermissionGuard>} />
        <Route path="/services&extra/manage/extreService/addExtraService" element={<PermissionGuard permissionId={P.MANAGE_EXTRA_SERVICE}><AddExtraService /></PermissionGuard>} />
        <Route path="/services&extra/manage/coupon" element={<PermissionGuard permissionId={P.MANAGE_COUPON}><ManageCoupon /></PermissionGuard>} />
        <Route path="/services&extra/manage/coupon/addCoupon" element={<PermissionGuard permissionId={P.MANAGE_COUPON}><AddCoupon /></PermissionGuard>} />
        <Route path="/services&extra/manage/package" element={<PermissionGuard permissionId={P.MANAGE_PACKAGES}><ManagePackage /></PermissionGuard>} />
        <Route path="/services&extra/manage/Package/addPackage" element={<PermissionGuard permissionId={P.MANAGE_PACKAGES}><AddNewPackage /></PermissionGuard>} />
        <Route path="/services&extra/manage/Package/updatePackage/:id" element={<PermissionGuard permissionId={P.MANAGE_PACKAGES}><UpdatePackage /></PermissionGuard>} /> */}

        {/* Products & Orders (no specific privilege mapping yet) */}
        {/* <Route path="/products&orders/manage/Products" element={<ManageProducts />} />
        <Route path="/products&orders/manage/Products/addProduct" element={<AddProduct />} />
        <Route path="/products&orders/manage/Products/addGategory" element={<AddCategory />} />
        <Route path="/products&orders/manage/Orders" element={<ManageOrders />} /> */}

        {/* Financial & Points */}
        {/* <Route path="/financial&points/manage/Vat" element={<PermissionGuard permissionId={P.MANAGE_VAT}><ManageVat /></PermissionGuard>} />
        <Route path="/financial&points/manage/driverCommission" element={<PermissionGuard permissionId={P.DRIVER_COMMISSION}><ManageDriverCommission /></PermissionGuard>} />
        <Route path="/financial&points/manage/bonusPoint" element={<PermissionGuard permissionId={P.MANAGE_BONUS_POINT}><ManageBonusPoint /></PermissionGuard>} />
        <Route path="/financial&points/manage/adminEarning" element={<PermissionGuard permissionId={P.MANAGE_EARNING}><ManageAdminEarning /></PermissionGuard>} /> */}

        {/* Technical Support */}
        {/* <Route path="/technicalSupport/contactUs" element={<PermissionGuard permissionId={P.CONTACT_US}><ContactUs /></PermissionGuard>} />
        <Route path="/technicalSupport/manage/companies" element={<PermissionGuard permissionId={P.MANAGE_COMPANIES}><ManageCompanies /></PermissionGuard>} />
        <Route path="/technicalSupport/broadcast" element={<PermissionGuard permissionId={P.BROADCAST}><Broadcast /></PermissionGuard>} />
        <Route path="/technicalSupport/broadcast/SendBroadcast" element={<PermissionGuard permissionId={P.BROADCAST}><SendBroadcast /></PermissionGuard>} />
        <Route path="/technicalSupport/manage/faqs" element={<PermissionGuard permissionId={P.MANAGE_FAQS}><Managefaqs /></PermissionGuard>} />
        <Route path="/technicalSupport/manage/faqs/addFqs" element={<PermissionGuard permissionId={P.MANAGE_FAQS}><AddFqs /></PermissionGuard>} />
        <Route path="/technicalSupport/manage/orderQuestions" element={<PermissionGuard permissionId={P.MANAGE_ORDER_QUESTION}><ManageOrdersQuestions /></PermissionGuard>} />
        <Route path="/technicalSupport/manage/orderQuestions/addOrdersQuestions" element={<PermissionGuard permissionId={P.MANAGE_ORDER_QUESTION}><AddOrdersQuestions /></PermissionGuard>} /> */}
      </Routes>
    </>
  );
};

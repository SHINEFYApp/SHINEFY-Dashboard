import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import CreateBookings from './pages/bookings/CreateBookings';
import ManageBooking from './pages/bookings/manage_booking/ManageBooking';
import ManageBookingDetails from './pages/bookings/manage_booking/ManageBookingDetails';
import BookingReports from './pages/bookings/manage_booking/BookingReports';
import ServiceBoysWithBookings from './pages/bookings/manage_booking/ServiceBoysWithBookings';
import ManageSlot from './pages/bookings/bookings_slot/ManageSlots';
import AdminSlots from './pages/bookings/bookings_slot/AdminSlots';
import AddVehicles from './pages/vehicles/addVehicles';
import UsersWallets from './pages/users&staff/userWallets';
import CreateBookingsSlot from './pages/bookings/bookings_slot/CreateBookingsSlot';
import EditSpecificSlot from './pages/bookings/bookings_slot/EditSpecificSlot';
import DailySlotSettings from './pages/bookings/bookings_slot/DailySlotSettings';
import ManageCountries from './pages/Geography&Regions/manageCountries';
import ManageRegions from './pages/Geography&Regions/manageRegions';
import ManageAreas from './pages/Geography&Regions/manageAreas';
import ManageService from './pages/services&extra/manageService/manageService';
import AddService from './pages/services&extra/manageService/addService';
import EditService from './pages/services&extra/manageService/editService';
import ViewService from './pages/services&extra/manageService/viewService';
import ReorderServices from './pages/services&extra/manageService/reorderServices';
import ManageExtraService from './pages/services&extra/manageExtraService/manageExtraService';
import AddExtraService from './pages/services&extra/manageExtraService/addExtraService';
import EditExtraService from './pages/services&extra/manageExtraService/editExtraService';
import ViewExtraService from './pages/services&extra/manageExtraService/viewExtraService';
import ManageSpecialService from './pages/services&extra/manageSpecialService/manageSpecialService';
import AddSpecialService from './pages/services&extra/manageSpecialService/addSpecialService';
import EditSpecialService from './pages/services&extra/manageSpecialService/editSpecialService';
import ViewSpecialService from './pages/services&extra/manageSpecialService/viewSpecialService';
import ManageCoupon from './pages/services&extra/manageCoupon/manageCoupon';
import ViewCoupon from './pages/services&extra/manageCoupon/viewCoupon';
import EditCoupon from './pages/services&extra/manageCoupon/editCoupon';
import ManageVehicles from './pages/vehicles/ManageVehicles';
import ManageUsers from './pages/users&staff/ManageUsers';
import AdvancedUserFilter from './pages/users&staff/AdvancedUserFilter';
import ManageServiceBoy from './pages/users&staff/ManageServiceBoy';
import AddCoupon from './pages/services&extra/manageCoupon/addCoupon';
import ManageProducts from './pages/productsAndOrders/manageProducts';
import AddProduct from './pages/productsAndOrders/subPages/addProducts';
import AddCategory from './pages/productsAndOrders/subPages/addCategory';
import ManageOrders from './pages/productsAndOrders/manageOrders';
import ManageAds from './pages/ads/manageAds';
import ManageAddAds from './pages/ads/manageAddAds';
import AddMainArea from './pages/Geography&Regions/subPagesAddAreas/addMainArea';
import AddSubArea from './pages/Geography&Regions/subPagesAddAreas/addSubArea';
import EditMainArea from './pages/Geography&Regions/subPagesAddAreas/editMainArea';
import EditSubArea from './pages/Geography&Regions/subPagesAddAreas/editSubArea';
import ManagePackage from './pages/services&extra/managePackage/managePackage';
import AddNewPackage from './pages/services&extra/managePackage/addNewPackage';
import UpdatePackage from './pages/services&extra/managePackage/updatePackage';
import AddSubscriptionPackage from './pages/services&extra/managePackage/addSubscriptionPackage';
import ManageSubscription from './pages/services&extra/managePackage/manageSubscription';
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
import AddCompany from './pages/technicalSupport/Manage Companies/addCompany';
import EditCompany from './pages/technicalSupport/Manage Companies/editCompany';
import ViewCompany from './pages/technicalSupport/Manage Companies/viewCompany';
import Broadcast from './pages/technicalSupport/Broadcast/broadcast';
import SendBroadcast from './pages/technicalSupport/Broadcast/sendBroadcast';
import BroadcastDetail from './pages/technicalSupport/Broadcast/broadcastDetail';
import ManageCommonMessages from './pages/technicalSupport/Broadcast/manageCommonMessages';
import Managefaqs from './pages/technicalSupport/managefaqs/managefaqs';
import AddFqs from './pages/technicalSupport/managefaqs/addFqs';
import EditFaqs from './pages/technicalSupport/managefaqs/editFaqs';
import ManageOrdersQuestions from './pages/technicalSupport/manage orders questions/manageOrdersQuestions';
import AddOrdersQuestions from './pages/technicalSupport/manage orders questions/addOrdersQuestions';
import EditOrdersQuestions from './pages/technicalSupport/manage orders questions/editOrdersQuestions';
import ViewOrdersQuestions from './pages/technicalSupport/manage orders questions/viewOrdersQuestions';
import ManageCompounds from './pages/compounds/manageCompounds';
import AddCompound from './pages/compounds/addCompound';
import EditCompound from './pages/compounds/editCompound';
import ManageCompoundPackages from './pages/compounds/managePackages';
import AddCompoundPackage from './pages/compounds/addPackage';
import EditCompoundPackage from './pages/compounds/editPackage';
import ManageCompoundSubscriptions from './pages/compounds/manageSubscriptions';
import AddCompoundSubscription from './pages/compounds/addSubscription';
import CompoundSubscriptionDetails from './pages/compounds/subscriptionDetails';
import ManageCompoundBookings from './pages/compounds/manageBookings';
import CompoundBookingDetails from './pages/compounds/bookingDetails';
import CompoundTodaySummary from './pages/compounds/todaySummary';
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
        <Route path="/bookings/manage/reports" element={<PermissionGuard permissionId={P.TABULAR_REPORTS}><BookingReports /></PermissionGuard>} />
        <Route path="/bookings/manage/service-boys" element={<PermissionGuard permissionId={P.MANAGE_BOOKING}><ServiceBoysWithBookings /></PermissionGuard>} />
        <Route path="/bookings/manage/:id" element={<PermissionGuard permissionId={P.MANAGE_BOOKING}><ManageBookingDetails /></PermissionGuard>} />
        <Route path="/bookings/slot" element={<PermissionGuard permissionId={P.MANAGE_SLOT}><ManageSlot /></PermissionGuard>} />
        <Route path="/bookings/slot/admin-slots" element={<PermissionGuard permissionId={P.MANAGE_SLOT}><AdminSlots /></PermissionGuard>} />
        <Route path="/bookings/slot/create" element={<PermissionGuard permissionId={P.MANAGE_SLOT}><CreateBookingsSlot /></PermissionGuard>} />
        <Route path="/bookings/slot/daily-slot" element={<PermissionGuard permissionId={P.MANAGE_SLOT}><DailySlotSettings /></PermissionGuard>} />
        <Route path="/bookings/slot/edit/:id" element={<PermissionGuard permissionId={P.MANAGE_SLOT}><EditSpecificSlot /></PermissionGuard>} />

        {/* Vehicles */}
        <Route path="/vehicles/add" element={<PermissionGuard permissionId={P.CREATE_VEHICLE}><AddVehicles /></PermissionGuard>} />
        <Route path="/vehicles/manage" element={<PermissionGuard permissionId={P.MANAGE_CAR_OPTIONS}><ManageVehicles /></PermissionGuard>} />

        {/* Users & Staff */}
        <Route path="/users&staff/manage/users" element={<PermissionGuard permissionId={P.MANAGE_USERS}><ManageUsers /></PermissionGuard>} />
        <Route path="/users&staff/manage/users/:id" element={<PermissionGuard permissionId={P.MANAGE_USERS}><UserProfile /></PermissionGuard>} />
        <Route path="/users&staff/manage/users/:userId/packageDetails/:packageId" element={<PermissionGuard permissionId={P.MANAGE_USERS}><UserPackageDetails /></PermissionGuard>} />
        <Route path="/users&staff/manage/users/advanced-filter" element={<PermissionGuard permissionId={P.MANAGE_USERS}><AdvancedUserFilter /></PermissionGuard>} />
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
        {/* <Route path="/geography&regions/manage/countries" element={<PermissionGuard permissionId={P.MANAGE_COUNTRIES}><ManageCountries /></PermissionGuard>} /> */}
        {/* <Route path="/geography&regions/manage/regions" element={<PermissionGuard permissionId={P.MANAGE_REGIONS}><ManageRegions /></PermissionGuard>} /> */}
        <Route path="/geography&regions/manage/area" element={<PermissionGuard permissionId={P.MANAGE_AREA}><ManageAreas /></PermissionGuard>} />
        <Route path="/geography&regions/manage/area/add/mainArea" element={<PermissionGuard permissionId={P.MANAGE_AREA}><AddMainArea /></PermissionGuard>} />
        <Route path="/geography&regions/manage/area/add/subArea" element={<PermissionGuard permissionId={P.MANAGE_AREA}><AddSubArea /></PermissionGuard>} /> 
        <Route path="/geography&regions/manage/area/edit/main/:id" element={<PermissionGuard permissionId={P.MANAGE_AREA}><EditMainArea /></PermissionGuard>} />
        <Route path="/geography&regions/manage/area/edit/sub/:id" element={<PermissionGuard permissionId={P.MANAGE_AREA}><EditSubArea /></PermissionGuard>} />
        {/* Services & Extra */}
        <Route path="/services&extra/manage/Service" element={<PermissionGuard permissionId={P.MANAGE_SERVICE}><ManageService /></PermissionGuard>} />
        <Route path="/services&extra/manage/Service/reorder" element={<PermissionGuard permissionId={P.MANAGE_SERVICE}><ReorderServices /></PermissionGuard>} />
        <Route path="/services&extra/manage/Service/addService" element={<PermissionGuard permissionId={P.MANAGE_SERVICE}><AddService /></PermissionGuard>} />
        <Route path="/services&extra/manage/Service/editService/:id" element={<PermissionGuard permissionId={P.MANAGE_SERVICE}><EditService /></PermissionGuard>} />
        <Route path="/services&extra/manage/Service/viewService/:id" element={<PermissionGuard permissionId={P.MANAGE_SERVICE}><ViewService /></PermissionGuard>} />
        <Route path="/services&extra/manage/ExtreService" element={<PermissionGuard permissionId={P.MANAGE_EXTRA_SERVICE}><ManageExtraService /></PermissionGuard>} />
        <Route path="/services&extra/manage/extreService/addExtraService" element={<PermissionGuard permissionId={P.MANAGE_EXTRA_SERVICE}><AddExtraService /></PermissionGuard>} />
        <Route path="/services&extra/manage/ExtreService/editExtraService/:id" element={<PermissionGuard permissionId={P.MANAGE_EXTRA_SERVICE}><EditExtraService /></PermissionGuard>} />
        <Route path="/services&extra/manage/ExtreService/viewExtraService/:id" element={<PermissionGuard permissionId={P.MANAGE_EXTRA_SERVICE}><ViewExtraService /></PermissionGuard>} />
        <Route path="/services&extra/manage/SpecialService" element={<PermissionGuard permissionId={P.MANAGE_SPECIAL_SERVICE}><ManageSpecialService /></PermissionGuard>} />
        <Route path="/services&extra/manage/SpecialService/addSpecialService" element={<PermissionGuard permissionId={P.MANAGE_SPECIAL_SERVICE}><AddSpecialService /></PermissionGuard>} />
        <Route path="/services&extra/manage/SpecialService/editSpecialService/:id" element={<PermissionGuard permissionId={P.MANAGE_SPECIAL_SERVICE}><EditSpecialService /></PermissionGuard>} />
        <Route path="/services&extra/manage/SpecialService/viewSpecialService/:id" element={<PermissionGuard permissionId={P.MANAGE_SPECIAL_SERVICE}><ViewSpecialService /></PermissionGuard>} />
        <Route path="/services&extra/manage/coupon" element={<PermissionGuard permissionId={P.MANAGE_COUPON}><ManageCoupon /></PermissionGuard>} />
        <Route path="/services&extra/manage/coupon/addCoupon" element={<PermissionGuard permissionId={P.MANAGE_COUPON}><AddCoupon /></PermissionGuard>} />
        <Route path="/services&extra/manage/coupon/view/:id" element={<PermissionGuard permissionId={P.MANAGE_COUPON}><ViewCoupon /></PermissionGuard>} />
        <Route path="/services&extra/manage/coupon/edit/:id" element={<PermissionGuard permissionId={P.MANAGE_COUPON}><EditCoupon /></PermissionGuard>} />
        <Route path="/services&extra/manage/package" element={<PermissionGuard permissionId={P.MANAGE_PACKAGES}><ManagePackage /></PermissionGuard>} />
        <Route path="/services&extra/manage/Package/addPackage" element={<PermissionGuard permissionId={P.MANAGE_PACKAGES}><AddNewPackage /></PermissionGuard>} />
        <Route path="/services&extra/manage/Package/updatePackage/:id" element={<PermissionGuard permissionId={P.MANAGE_PACKAGES}><UpdatePackage /></PermissionGuard>} />
        <Route path="/services&extra/manage/Package/addSubscriptionPackage" element={<PermissionGuard permissionId={P.PACKAGES_SUBSCRIPTION}><AddSubscriptionPackage /></PermissionGuard>} />
        <Route path="/services&extra/manage/Package/manageSubscriptions" element={<PermissionGuard permissionId={P.PACKAGES_SUBSCRIPTION}><ManageSubscription /></PermissionGuard>} />

        {/* Advertising */}
        <Route path="/advertising/manage" element={<PermissionGuard permissionId={P.AD_SECTION}><ManageAds /></PermissionGuard>} />
        <Route path="/advertising/manage/add" element={<PermissionGuard permissionId={P.AD_SECTION}><ManageAddAds /></PermissionGuard>} />
        <Route path="/advertising/manage/edit/:id" element={<PermissionGuard permissionId={P.AD_SECTION}><ManageAddAds /></PermissionGuard>} />

        {/* Products & Orders (no specific privilege mapping yet) */}
        <Route path="/products&orders/manage/Products" element={<ManageProducts />} />
        <Route path="/products&orders/manage/Products/addProduct" element={<AddProduct />} />
        <Route path="/products&orders/manage/Products/addGategory" element={<AddCategory />} />
        <Route path="/products&orders/manage/Orders" element={<ManageOrders />} />

        {/* Compounds System */}
        <Route path="/compounds/manage" element={<PermissionGuard permissionId={P.MANAGE_COMPOUNDS}><ManageCompounds /></PermissionGuard>} />
        <Route path="/compounds/manage/add" element={<PermissionGuard permissionId={P.MANAGE_COMPOUNDS}><AddCompound /></PermissionGuard>} />
        <Route path="/compounds/manage/edit/:id" element={<PermissionGuard permissionId={P.MANAGE_COMPOUNDS}><EditCompound /></PermissionGuard>} />
        <Route path="/compounds/packages" element={<PermissionGuard permissionId={P.MANAGE_COMPOUND_PACKAGES}><ManageCompoundPackages /></PermissionGuard>} />
        <Route path="/compounds/packages/add" element={<PermissionGuard permissionId={P.MANAGE_COMPOUND_PACKAGES}><AddCompoundPackage /></PermissionGuard>} />
        <Route path="/compounds/packages/edit/:id" element={<PermissionGuard permissionId={P.MANAGE_COMPOUND_PACKAGES}><EditCompoundPackage /></PermissionGuard>} />
        <Route path="/compounds/subscriptions" element={<PermissionGuard permissionId={P.MANAGE_COMPOUND_SUBSCRIPTIONS}><ManageCompoundSubscriptions /></PermissionGuard>} />
        <Route path="/compounds/subscriptions/add" element={<PermissionGuard permissionId={P.MANAGE_COMPOUND_SUBSCRIPTIONS}><AddCompoundSubscription /></PermissionGuard>} />
        <Route path="/compounds/subscriptions/:id" element={<PermissionGuard permissionId={P.MANAGE_COMPOUND_SUBSCRIPTIONS}><CompoundSubscriptionDetails /></PermissionGuard>} />
        <Route path="/compounds/bookings" element={<PermissionGuard permissionId={P.MANAGE_COMPOUND_BOOKINGS}><ManageCompoundBookings /></PermissionGuard>} />
        <Route path="/compounds/bookings/:id" element={<PermissionGuard permissionId={P.MANAGE_COMPOUND_BOOKINGS}><CompoundBookingDetails /></PermissionGuard>} />
        <Route path="/compounds/today-summary" element={<PermissionGuard permissionId={P.MANAGE_COMPOUND_BOOKINGS}><CompoundTodaySummary /></PermissionGuard>} />

        {/* Financial & Points */}
        <Route path="/financial&points/manage/Vat" element={<PermissionGuard permissionId={P.MANAGE_VAT}><ManageVat /></PermissionGuard>} />
        <Route path="/financial&points/manage/driverCommission" element={<PermissionGuard permissionId={P.DRIVER_COMMISSION}><ManageDriverCommission /></PermissionGuard>} />
        <Route path="/financial&points/manage/bonusPoint" element={<PermissionGuard permissionId={P.MANAGE_BONUS_POINT}><ManageBonusPoint /></PermissionGuard>} />
        {/* <Route path="/financial&points/manage/adminEarning" element={<PermissionGuard permissionId={P.MANAGE_EARNING}><ManageAdminEarning /></PermissionGuard>} /> */}

        {/* Technical Support */}
        <Route path="/technicalSupport/contactUs" element={<PermissionGuard permissionId={P.CONTACT_US}><ContactUs /></PermissionGuard>} />
        <Route path="/technicalSupport/manage/companies" element={<PermissionGuard permissionId={P.MANAGE_COMPANIES}><ManageCompanies /></PermissionGuard>} />
        <Route path="/technicalSupport/manage/companies/add" element={<PermissionGuard permissionId={P.MANAGE_COMPANIES}><AddCompany /></PermissionGuard>} />
        <Route path="/technicalSupport/manage/companies/edit/:id" element={<PermissionGuard permissionId={P.MANAGE_COMPANIES}><EditCompany /></PermissionGuard>} />
        <Route path="/technicalSupport/manage/companies/view/:id" element={<PermissionGuard permissionId={P.MANAGE_COMPANIES}><ViewCompany /></PermissionGuard>} />
        <Route path="/technicalSupport/broadcast" element={<PermissionGuard permissionId={P.BROADCAST}><Broadcast /></PermissionGuard>} />
        <Route path="/technicalSupport/broadcast/SendBroadcast" element={<PermissionGuard permissionId={P.BROADCAST}><SendBroadcast /></PermissionGuard>} />
        <Route path="/technicalSupport/broadcast/:id" element={<PermissionGuard permissionId={P.BROADCAST}><BroadcastDetail /></PermissionGuard>} />
        <Route path="/technicalSupport/broadcast/common-messages" element={<PermissionGuard permissionId={P.BROADCAST}><ManageCommonMessages /></PermissionGuard>} />
        <Route path="/technicalSupport/manage/faqs" element={<PermissionGuard permissionId={P.MANAGE_FAQS}><Managefaqs /></PermissionGuard>} />
        <Route path="/technicalSupport/manage/faqs/addFqs" element={<PermissionGuard permissionId={P.MANAGE_FAQS}><AddFqs /></PermissionGuard>} />
        <Route path="/technicalSupport/manage/faqs/edit/:id" element={<PermissionGuard permissionId={P.MANAGE_FAQS}><EditFaqs /></PermissionGuard>} />
        <Route path="/technicalSupport/manage/orderQuestions" element={<PermissionGuard permissionId={P.MANAGE_ORDER_QUESTION}><ManageOrdersQuestions /></PermissionGuard>} />
        <Route path="/technicalSupport/manage/orderQuestions/addOrdersQuestions" element={<PermissionGuard permissionId={P.MANAGE_ORDER_QUESTION}><AddOrdersQuestions /></PermissionGuard>} />
        <Route path="/technicalSupport/manage/orderQuestions/edit/:id" element={<PermissionGuard permissionId={P.MANAGE_ORDER_QUESTION}><EditOrdersQuestions /></PermissionGuard>} />
        <Route path="/technicalSupport/manage/orderQuestions/view/:id" element={<PermissionGuard permissionId={P.MANAGE_ORDER_QUESTION}><ViewOrdersQuestions /></PermissionGuard>} />
      </Routes>
    </>
  );
};

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BsGrid } from 'react-icons/bs';
import { cn } from '../../utils/utils';
import type { BreadcrumbItem, NavbarProps } from '../../types/layout';
import { routeConfig } from '../../constants/data';
import { LanguageSwitcher } from './LanguageSwitcher';

const breadcrumbKeyMap: Record<string, string> = {
  'Dashboard': 'navbar.dashboard',
  'Bookings': 'navbar.bookings',
  'Create Booking': 'navbar.createBooking',
  'Services Booking': 'navbar.servicesBooking',
  'Manage Bookings': 'navbar.manageBookings',
  'Booking Reports': 'navbar.bookingReports',
  'Manage Booking By Id': 'navbar.manageBookingById',
  'Manage Slot': 'navbar.manageSlot',
  'Admin Slots': 'navbar.adminSlots',
  'Vehicles': 'navbar.vehicles',
  'Add': 'navbar.add',
  'Manage Vehicles': 'navbar.manageVehicles',
  'Users & Stuff': 'navbar.usersAndStaff',
  'Manage Users': 'navbar.manageUsers',
  'Advanced User Filter': 'navbar.advancedUserFilter',
  'Manage Group': 'navbar.manageGroup',
  'Manage': 'navbar.manage',
  'Sub Admin': 'navbar.subAdmin',
  'Service Boy': 'navbar.serviceBoy',
  'Users Wallet': 'navbar.usersWallet',
  'Service Boy Details': 'navbar.serviceBoyDetails',
  'Add Service Boy': 'navbar.addServiceBoy',
  'Geography & Regions': 'navbar.geographyAndRegions',
  'Manage Countries': 'navbar.manageCountries',
  'Manage Regions': 'navbar.manageRegions',
  'Manage Area': 'navbar.manageArea',
  'Add Main Area': 'navbar.addMainArea',
  'Add Sub Area': 'navbar.addSubArea',
  'Services & Extra': 'navbar.servicesAndExtra',
  'Manage Service': 'navbar.manageService',
  'Reorder Services': 'navbar.reorderServices',
  'Add Service': 'navbar.addService',
  'Edit Service': 'navbar.editService',
  'View Service': 'navbar.viewService',
  'Manage Extra Service': 'navbar.manageExtraService',
  'Add Extra Service': 'navbar.addExtraService',
  'Edit Extra Service': 'navbar.editExtraService',
  'View Extra Service': 'navbar.viewExtraService',
  'Manage Special Service': 'navbar.manageSpecialService',
  'Add Special Service': 'navbar.addSpecialService',
  'Edit Special Service': 'navbar.editSpecialService',
  'View Special Service': 'navbar.viewSpecialService',
  'Manage Coupon': 'navbar.manageCoupon',
  'Add Coupon': 'navbar.addCoupon',
  'Manage Package': 'navbar.managePackage',
  'Add Package': 'navbar.addPackage',
  'Products & Orders': 'navbar.productsAndOrders',
  'Manage Products': 'navbar.manageProducts',
  'Add Products': 'navbar.addProducts',
  'Add Gategory': 'navbar.addCategory',
  'Manage Orders': 'navbar.manageOrders',
  'Financial & Points': 'navbar.financialAndPoints',
  'Manage Vat': 'navbar.manageVat',
  'Manage Driver Commission': 'navbar.manageDriverCommission',
  'Manage Bonus Point': 'navbar.manageBonusPoint',
  'Manage Admin Earning': 'navbar.manageAdminEarning',
  'Technical Support': 'navbar.technicalSupport',
  'Contact Us': 'navbar.contactUs',
  'Manage Companies': 'navbar.manageCompanies',
  'Add Company': 'navbar.addCompany',
  'Edit Company': 'navbar.editCompany',
  'View Company': 'navbar.viewCompany',
  'Broadcast': 'navbar.broadcast',
  'Send Broadcast': 'navbar.sendBroadcast',
  'Broadcast Detail': 'navbar.broadcastDetail',
  'Common Messages': 'navbar.commonMessages',
  'Manage FAQs': 'navbar.manageFAQS',
  'Add Fqs': 'navbar.addFqs',
  'Edit Fqs': 'navbar.editFqs',
  'Manage Order Questions': 'navbar.manageOrderQuestions',
  'Add Orders Questions': 'navbar.addOrdersQuestions',
  'Edit Orders Questions': 'navbar.editOrdersQuestions',
  'View Orders Questions': 'navbar.viewOrdersQuestions',
  'Compounds System': 'navbar.compoundsSystem',
  'Manage Compounds': 'navbar.manageCompounds',
  'Add Compound': 'navbar.addCompound',
  'Edit Compound': 'navbar.editCompound',
   'Manage Packages': 'navbar.managePackages',
   'Edit Package': 'navbar.editPackage',
   'Manage Subscriptions': 'navbar.manageSubscriptions',
   'Add Subscription': 'navbar.addSubscription',
   'Subscription Details': 'navbar.subscriptionDetails',
   'Booking Details': 'navbar.bookingDetails',
    'Today Summary': 'navbar.todaySummary',
    'Advertising': 'navbar.advertising',
    'Manage Ads': 'navbar.manageAds',
    'Add Ad': 'navbar.addAd',
    'Edit Ad': 'navbar.editAd',
};

export const Navbar: React.FC<NavbarProps> = ({ isCollapsed, currentPath = '/dashboard' }) => {
    const { t } = useTranslation();

    const { pageTitle, breadcrumbs } = useMemo(() => {
        const config = routeConfig[currentPath] || {
            title: 'Dashboard',
            breadcrumbs: ['Dashboard']
        };

        const breadcrumbItems: BreadcrumbItem[] = config.breadcrumbs.map((label, index) => ({
            label: t(breadcrumbKeyMap[label] || label),
            path: currentPath,
            isActive: index === config.breadcrumbs.length - 1
        }));

        return {
            pageTitle: t(breadcrumbKeyMap[config.title] || config.title),
            breadcrumbs: breadcrumbItems
        };
    }, [currentPath, t]);


    return (
        <header
            className={cn(
                "fixed top-0 ltr:right-0 rtl:left-0 h-20 bg-white transition-all duration-300 ease-in-out shadow-md z-20",
                isCollapsed ? 'ltr:left-20 rtl:right-20' : 'ltr:left-72 rtl:right-72'
            )}
        >
            <div className="h-full flex items-center justify-between px-6">
                {/* Left Section - Page Title */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl md:text-3xl mb-4 font-bold text-secondary-900">
                            {pageTitle}
                        </h1>
                    </div>
                </div>

                {/* Right Section - Language Switcher */}
                <div className="flex items-center gap-3">
                    <LanguageSwitcher />
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="hidden sm:flex absolute bottom-0 ltr:left-6 rtl:right-6 items-center gap-2 text-sm text-gray-500 pb-2">
                <BsGrid className="w-4 h-4 text-primary" />
                {breadcrumbs.map((crumb, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <span
                            className={cn(
                                "transition-colors",
                                crumb.isActive
                                    ? "text-secondary-900 font-medium"
                                    : ""
                            )}
                        >
                            {crumb.label}
                        </span>
                        {index < breadcrumbs.length - 1 && (
                            <span className="text-gray-400">/</span>
                        )}
                    </div>
                ))}
            </div>
        </header>
    );
};

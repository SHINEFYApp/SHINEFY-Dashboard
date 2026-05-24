import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MdDashboard } from 'react-icons/md';
import { BsCalendarEvent } from 'react-icons/bs';
import { IoChevronDown, IoChevronForward } from 'react-icons/io5';
import { cn } from '../../utils/utils';
import calendar from '../../assets/icons/calendar.svg';
import activeCalendar from '../../assets/icons/activeCalendar.svg';
import type { MenuItem, SidebarProps } from '../../types/layout';
import logo from '../../assets/logo.svg';
import { Box, CarFront, HandCoins, Headphones, Map, Settings, Users, LogOut, Wrench } from 'lucide-react';

import { Link, useNavigate } from 'react-router';
import { usePermissions } from '../../hooks/usePermissions';
import { PRIVILEGES } from '../../constants/permissions';
import { logout } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle, currentPath = '/bookings/create' }) => {
    const { t } = useTranslation();
    const { hasPermission } = usePermissions();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [expandedMenu, setExpandedMenu] = useState<string | null>('Bookings');

    useEffect(() => {
        if (currentPath.startsWith('/bookings/manage/service-boys') || currentPath.startsWith('/users&staff/manage/serviceBoy')) {
            setExpandedMenu('Service Boy');
        } else if (currentPath.startsWith('/vehicles')) {
            setExpandedMenu('Vehicles');
        } else if (currentPath.startsWith('/bookings')) {
            setExpandedMenu('Bookings');
        } else if (currentPath.startsWith('/users&staff/manage')) {
            setExpandedMenu('Users & Staff');
        } else if (currentPath.startsWith('/geography&regions/manage')) {
            setExpandedMenu('Geography & Regions');
        } else if (currentPath.startsWith('/services&extra/manage')) {
            setExpandedMenu('Services & Extra');
        } else if (currentPath.startsWith('/products&orders/manage')) {
            setExpandedMenu('Products & Orders');
        }else if (currentPath.startsWith('/financial&points/manage')) {
            setExpandedMenu('Financial & Points');
        } else if (currentPath.startsWith('/compounds')) {
            setExpandedMenu('Compounds System');
        } else if (currentPath.startsWith('/technicalSupport')) {
            setExpandedMenu('Technical Support');
        }
    }, [currentPath]);

    const allMenuItems: MenuItem[] = [
        {
            icon: <MdDashboard className="w-5 h-5" />,
            label: 'Dashboard',
            i18nKey: 'sidebar.dashboard',
            path: '/',
            permissionId: PRIVILEGES.DASHBOARD,
        },
        {
            icon: <BsCalendarEvent className="w-5 h-5" />,
            label: 'Bookings',
            i18nKey: 'sidebar.bookings',
            isActive: currentPath?.startsWith('/bookings'),
            subItems: [
                {
                    icon: null,
                    label: 'Create Booking',
                    i18nKey: 'sidebar.createBooking',
                    path: '/bookings/create',
                    permissionId: PRIVILEGES.MANAGE_CREATE_BOOKING,
                },
                {
                    icon: null,
                    label: 'Manage Bookings',
                    i18nKey: 'sidebar.manageBookings',
                    path: '/bookings/manage',
                    permissionId: PRIVILEGES.MANAGE_BOOKING,
                },
                {
                    icon: null,
                    label: 'Booking Reports',
                    i18nKey: 'sidebar.bookingReports',
                    path: '/bookings/manage/reports',
                    permissionId: PRIVILEGES.TABULAR_REPORTS,
                },
                {
                    icon: null,
                    label: 'Manage Slot',
                    i18nKey: 'sidebar.manageSlot',
                    path: '/bookings/slot',
                    permissionId: PRIVILEGES.MANAGE_SLOT,
                },
                {
                    icon: null,
                    label: 'Admin Slots',
                    i18nKey: 'sidebar.adminSlots',
                    path: '/bookings/slot/admin-slots',
                    permissionId: PRIVILEGES.MANAGE_SLOT,
                },
            ],
        },
        {
            icon: <Wrench className="w-5 h-5" />,
            label: 'Service Boy',
            i18nKey: 'sidebar.serviceBoy',
            isActive: currentPath?.startsWith('/bookings/manage/service-boys') || currentPath?.startsWith('/users&staff/manage/serviceBoy'),
            subItems: [
                {
                    icon: null,
                    label: 'Manage Service Boy',
                    i18nKey: 'sidebar.manageServiceBoy',
                    path: '/users&staff/manage/serviceBoy',
                    permissionId: PRIVILEGES.MANAGE_SERVICE_BOY,
                },
                {
                    icon: null,
                    label: 'Service Boys With Bookings',
                    i18nKey: 'sidebar.serviceBoysWithBookings',
                    path: '/bookings/manage/service-boys',
                    permissionId: PRIVILEGES.MANAGE_BOOKING,
                },
            ],
        },
        {
            icon: <CarFront className="w-5 h-5" />,
            label: 'Vehicles',
            i18nKey: 'sidebar.vehicles',
            isActive: currentPath?.startsWith('/vehicles'),
            subItems: [
                {
                    icon: null,
                    label: 'Add Vehicle',
                    i18nKey: 'sidebar.addVehicle',
                    path: '/vehicles/add',
                    permissionId: PRIVILEGES.CREATE_VEHICLE,
                },
                {
                    icon: null,
                    label: 'Manage Vehicle',
                    i18nKey: 'sidebar.manageVehicle',
                    path: '/vehicles/manage',
                    permissionId: PRIVILEGES.MANAGE_CAR_OPTIONS,
                }
            ],
        },
        {
            icon: <Users className="w-5 h-5" />,
            label: 'Users & Staff',
            i18nKey: 'sidebar.usersAndStaff',
            isActive: currentPath?.startsWith('/users&staff/manage'),
            subItems: [
                {
                    icon: null,
                    label: 'Manage Users',
                    i18nKey: 'sidebar.manageUsers',
                    path: '/users&staff/manage/users',
                    permissionId: PRIVILEGES.MANAGE_USERS,
                },
                {
                    icon: null,
                    label: 'Advanced User Filter',
                    i18nKey: 'sidebar.advancedUserFilter',
                    path: '/users&staff/manage/users/advanced-filter',
                    permissionId: PRIVILEGES.MANAGE_USERS,
                },
                {
                    icon: null,
                    label: 'Manage Sub Admin',
                    i18nKey: 'sidebar.manageSubAdmin',
                    path: '/users&staff/manage/subAdmin',
                    permissionId: PRIVILEGES.MANAGE_SUB_ADMIN,
                },
                {
                    icon: null,
                    label: 'Manage Users Wallet',
                    i18nKey: 'sidebar.manageUsersWallet',
                    path: '/users&staff/manage/usersWallet',
                    permissionId: PRIVILEGES.MANAGE_USER_WALLET,
                }
            ],
        },
         {
            icon: <Map className="w-5 h-5" />,
            label: 'Geography & Regions',
            i18nKey: 'sidebar.geographyAndRegions',
            isActive: currentPath?.startsWith('/geography&regions/manage'),
            subItems: [
                {
                    icon: null,
                    label: 'Manage Area',
                    i18nKey: 'sidebar.manageArea',
                    path: '/geography&regions/manage/area',
                    permissionId: PRIVILEGES.MANAGE_AREA,
                }
            ]
        }, {
            icon: <Settings className="w-5 h-5" />,
            label: 'Services & Extra',
            i18nKey: 'sidebar.servicesAndExtra',
            isActive: currentPath?.startsWith('/services&extra/manage'),
            subItems: [
                {
                    icon: null,
                    label: 'Manage Service',
                    i18nKey: 'sidebar.manageService',
                    path: '/services&extra/manage/Service',
                    permissionId: PRIVILEGES.MANAGE_SERVICE,
                },
                {
                    icon: null,
                    label: 'Reorder Services',
                    i18nKey: 'sidebar.reorderServices',
                    path: '/services&extra/manage/Service/reorder',
                    permissionId: PRIVILEGES.MANAGE_SERVICE,
                },
                {
                    icon: null,
                    label: 'Manage Extra Service',
                    i18nKey: 'sidebar.manageExtraService',
                    path: '/services&extra/manage/ExtreService',
                    permissionId: PRIVILEGES.MANAGE_EXTRA_SERVICE,
                },
                {
                    icon: null,
                    label: 'Manage Special Service',
                    i18nKey: 'sidebar.manageSpecialService',
                    path: '/services&extra/manage/SpecialService',
                    permissionId: PRIVILEGES.MANAGE_SPECIAL_SERVICE,
                },
                {
                    icon: null,
                    label: 'Manage Coupon',
                    i18nKey: 'sidebar.manageCoupon',
                    path: '/services&extra/manage/Coupon',
                    permissionId: PRIVILEGES.MANAGE_COUPON,
                },
                {
                    icon: null,
                    label: 'Manage Package',
                    i18nKey: 'sidebar.managePackage',
                    path: '/services&extra/manage/Package',
                    permissionId: PRIVILEGES.MANAGE_PACKAGES,
                },
                {
                    icon: null,
                    label: 'Manage Subscriptions',
                    i18nKey: 'sidebar.manageSubscriptions',
                    path: '/services&extra/manage/Package/manageSubscriptions',
                    permissionId: PRIVILEGES.PACKAGES_SUBSCRIPTION,
                }
            ],
        },
        {
            icon: <Map className="w-5 h-5" />,
            label: 'Compounds System',
            i18nKey: 'sidebar.compoundsSystem',
            isActive: currentPath?.startsWith('/compounds'),
            subItems: [
                {
                    icon: null,
                    label: 'Manage Compounds',
                    i18nKey: 'sidebar.manageCompounds',
                    path: '/compounds/manage',
                    permissionId: PRIVILEGES.MANAGE_COMPOUNDS,
                },
                {
                    icon: null,
                    label: 'Manage Packages',
                    i18nKey: 'sidebar.managePackages',
                    path: '/compounds/packages',
                    permissionId: PRIVILEGES.MANAGE_COMPOUND_PACKAGES,
                },
                {
                    icon: null,
                    label: 'Manage Subscriptions',
                    i18nKey: 'sidebar.manageSubscriptions',
                    path: '/compounds/subscriptions',
                    permissionId: PRIVILEGES.MANAGE_COMPOUND_SUBSCRIPTIONS,
                },
                {
                    icon: null,
                    label: 'Manage Bookings',
                    i18nKey: 'sidebar.manageBookings',
                    path: '/compounds/bookings',
                    permissionId: PRIVILEGES.MANAGE_COMPOUND_BOOKINGS,
                },
                {
                    icon: null,
                    label: 'Today Summary',
                    i18nKey: 'sidebar.todaySummary',
                    path: '/compounds/today-summary',
                    permissionId: PRIVILEGES.MANAGE_COMPOUND_BOOKINGS,
                },
            ],
        },
        {
            icon: <Box className="w-5 h-5" />,
            label: 'Products & Orders',
            i18nKey: 'sidebar.productsAndOrders',
            isActive: currentPath?.startsWith('/products&orders/manage'),
            subItems: [
                {
                    icon: null,
                    label: 'Manage Products',
                    i18nKey: 'sidebar.manageProducts',
                    path: '/products&orders/manage/Products'
                },
                {
                    icon: null,
                    label: 'Manage Orders',
                    i18nKey: 'sidebar.manageOrders',
                    path: '/products&orders/manage/Orders'
                }
            ],
        },
        {
            icon: <HandCoins className="w-5 h-5" />,
            label: 'Financial & Points',
            i18nKey: 'sidebar.financialAndPoints',
            isActive: currentPath?.startsWith('/financial&points/manage'),
            subItems: [
                {
                    icon: null,
                    label: 'Manage VAT',
                    i18nKey: 'sidebar.manageVAT',
                    path: '/financial&points/manage/Vat',
                    permissionId: PRIVILEGES.MANAGE_VAT,
                },
                {
                    icon: null,
                    label: 'Manage Driver Commission',
                    i18nKey: 'sidebar.manageDriverCommission',
                    path: '/financial&points/manage/driverCommission',
                    permissionId: PRIVILEGES.DRIVER_COMMISSION,
                },
                {
                    icon: null,
                    label: 'Bonus Point',
                    i18nKey: 'sidebar.bonusPoint',
                    path: '/financial&points/manage/bonusPoint',
                    permissionId: PRIVILEGES.MANAGE_BONUS_POINT,
                },
            ],
        },
        {
            icon: <Headphones className="w-5 h-5" />,
            label: 'Technical Support',
            i18nKey: 'sidebar.technicalSupport',
            isActive: currentPath?.startsWith('/technicalSupport'),
            subItems: [
                {
                    icon: null,
                    label: 'Contact Us',
                    i18nKey: 'sidebar.contactUs',
                    path: '/technicalSupport/contactUs',
                    permissionId: PRIVILEGES.CONTACT_US,
                },
                {
                    icon: null,
                    label: 'Manage Companies',
                    i18nKey: 'sidebar.manageCompanies',
                    path: '/technicalSupport/manage/companies',
                    permissionId: PRIVILEGES.MANAGE_COMPANIES,
                },
                {
                    icon: null,
                    label: 'Broadcast',
                    i18nKey: 'sidebar.broadcast',
                    path: '/technicalSupport/broadcast',
                    permissionId: PRIVILEGES.BROADCAST,
                },
                {
                    icon: null,
                    label: 'Manage FAQS',
                    i18nKey: 'sidebar.manageFAQS',
                    path: '/technicalSupport/manage/faqs',
                    permissionId: PRIVILEGES.MANAGE_FAQS,
                },
                {
                    icon: null,
                    label: 'Manage Order Questions',
                    i18nKey: 'sidebar.manageOrderQuestions',
                    path: '/technicalSupport/manage/orderQuestions',
                    permissionId: PRIVILEGES.MANAGE_ORDER_QUESTION,
                }
            ],
        },
    ];

    // Filter menu items based on user permissions
    const menuItems: MenuItem[] = allMenuItems
        .map((item) => {
            // Top-level item with no sub-items
            if (!item.subItems) {
                if (item.permissionId && !hasPermission(item.permissionId)) return null;
                return item;
            }

            // Filter sub-items by permission
            const filteredSubs = item.subItems.filter(
                (sub) => !sub.permissionId || hasPermission(sub.permissionId)
            );

            // Hide parent if no sub-items are permitted
            if (filteredSubs.length === 0) return null;

            return { ...item, subItems: filteredSubs };
        })
        .filter(Boolean) as MenuItem[];

    const toggleSubmenu = (label: string) => {
        if (isCollapsed) return;
        setExpandedMenu(expandedMenu === label ? null : label);
    };

    const handleMenuClick = (item: MenuItem) => {
        if (item.subItems) {
            toggleSubmenu(item.label);
        } else if (item.path) {
            window.location.href = item.path;
            if (item.label === 'Bookings') {
                setExpandedMenu('Bookings');
            } else if (item.label === 'Vehicles') {
                setExpandedMenu('Vehicles');
            } else {
                setExpandedMenu(null);
            }
        }
    };

    return (
        <>
            <aside
                className={cn(
                    "fixed ltr:left-0 rtl:right-0 top-0 bg-[#1a1a1a] text-white transition-all duration-300 ease-in-out z-30 ",
                    isCollapsed ? 'w-20' : 'w-72'
                )}
            >
                <div className='flex flex-col h-screen'>
                    {/* Logo */}
                    <div className="sticky top-0 bg-[#1a1a1a] z-50 flex items-center justify-center h-20 border-b border-secondary-800/50 px-4">
                        <div className="flex items-center gap-2 overflow-hidden">
                            {<img src={logo} alt="Logo" />}
                        </div>
                    </div>

                    {/* Menu Items */}
                    <nav className="flex-1 overflow-y-auto scrollbar-hide mt-6 px-3 space-y-2">
                        {menuItems.map((item) => {
                            const isMenuActive = item.path ? currentPath === item.path : item.isActive;

                            return (
                                <div key={item.label} className="relative">
                                    {item.path && !item.subItems ? (
                                        <Link
                                            to={item.path}
                                            className={cn(
                                                "w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 relative",
                                                isMenuActive
                                                    ? 'bg-primary text-[#1a1a1a] font-semibold shadow-lg'
                                                    : 'text-gray-300 hover:bg-secondary-800/50 hover:text-white'
                                            )}
                                        >
                                            <div className="flex items-center gap-4">
                                                {item.icon}
                                                {!isCollapsed && (
                                                    <span className="text-base font-medium whitespace-nowrap">
                                                        {t(item.i18nKey || item.label)}
                                                    </span>
                                                )}
                                            </div>
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => handleMenuClick(item)}
                                            className={cn(
                                                "w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 relative",
                                                isMenuActive
                                                    ? 'bg-primary text-[#1a1a1a] font-semibold shadow-lg'
                                                    : 'text-gray-300 hover:bg-secondary-800/50 hover:text-white'
                                            )}
                                        >
                                            <div className="flex items-center gap-4">
                                                {item.icon}
                                                {!isCollapsed && (
                                                    <span className="text-base font-medium whitespace-nowrap">
                                                        {t(item.i18nKey || item.label)}
                                                    </span>
                                                )}
                                            </div>
                                            {!isCollapsed && item.subItems && (
                                                <IoChevronDown
                                                    className={cn(
                                                        "w-5 h-5 transition-transform duration-300",
                                                        expandedMenu === item.label && "rotate-180"
                                                    )}
                                                />
                                            )}
                                        </button>
                                    )}

                                    {/* Submenu with curved connectors */}
                                    {!isCollapsed && item.subItems && (
                                        <div
                                            className={cn(
                                                "overflow-hidden transition-all duration-300 ease-in-out",
                                                expandedMenu === item.label
                                                    ? "max-h-[400px] opacity-100 mt-3"
                                                    : "max-h-0 opacity-0"
                                            )}
                                        >
                                            <div className="relative ltr:pl-6 rtl:pr-6 space-y-2">
                                                {/* Vertical Line */}
                                                <div className={`absolute ltr:left-6 rtl:right-6 -top-8 bottom-0 w-0.5 bg-gray-600 h-full`} />

                                                {item.subItems.map((subItem, index) => {
                                                    const isActive = currentPath === subItem.path;

                                                    return (
                                                                <div key={index} className="relative">
                                                            {/* Curved connector line */}
                                                            <svg
                                                                className="absolute ltr:left-0 rtl:right-0 top-1/2 -translate-y-1/2"
                                                                width="24"
                                                                height="40"
                                                                viewBox="0 0 24 40"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    d="M 0 0 Q 0 20 20 20"
                                                                    stroke="#4B5563"
                                                                    strokeWidth="2"
                                                                    fill="none"
                                                                />
                                                            </svg>

                                                            <Link
                                                                to={subItem.path}
                                                                className={cn(
                                                                    "flex items-center gap-3 ltr:pl-8 rtl:pr-8 ltr:pr-4 rtl:pl-4 py-3 text-sm rounded-xl transition-all duration-200 group relative",
                                                                    isActive
                                                                        ? "text-primary font-medium"
                                                                        : "text-gray-400 hover:text-white hover:bg-secondary-800/30"
                                                                )}
                                                            >
                                                                <img
                                                                    src={isActive ? activeCalendar : calendar}
                                                                    alt=""
                                                                    className="w-5 h-5 transition-all duration-200"
                                                                />
                                                                <span className="whitespace-nowrap">{t(subItem.i18nKey || subItem.label)}</span>
                                                            </Link>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    {/* Logout */}
                    <div className="px-3 py-4 border-t border-gray-700/50 bg-[#1a1a1a] z-40">
                        <button
                            onClick={() => {
                                dispatch(logout());
                                navigate("/login");
                            }}
                            className={cn(
                                "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 text-gray-300 hover:bg-red-500/10 hover:text-red-400"
                            )}
                        >
                            <LogOut className="w-5 h-5" />
                            {!isCollapsed && (
                                <span className="text-base font-medium whitespace-nowrap">{t('sidebar.logout')}</span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Toggle Button */}
                <button
                    onClick={onToggle}
                    className="absolute ltr:-right-3 rtl:-left-3 top-14 bg-primary text-[#1a1a1a] rounded-full p-2 shadow-xl hover:scale-110 transition-all duration-200 hover:shadow-2xl z-50"
                    aria-label={t(isCollapsed ? 'sidebar.expandSidebar' : 'sidebar.collapseSidebar')}
                >
                    <IoChevronForward
                        className={cn(
                            "w-4 h-4 transition-transform duration-300 font-bold",
                            !isCollapsed && "rotate-180"
                        )}
                    />
                </button>
            </aside>
        </>
    );
};

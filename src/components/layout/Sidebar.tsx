import { useState, useEffect } from 'react';
import { MdDashboard } from 'react-icons/md';
import { BsCalendarEvent } from 'react-icons/bs';
import { IoChevronDown, IoChevronForward } from 'react-icons/io5';
import { cn } from '../../utils/utils';
import calendar from '../../assets/icons/calendar.svg';
import activeCalendar from '../../assets/icons/activeCalendar.svg';
import type { MenuItem, SidebarProps } from '../../types/layout';
import logo from '../../assets/logo.svg';
import { CarFront, Users } from 'lucide-react';

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle, currentPath = '/bookings/create' }) => {
    const [expandedMenu, setExpandedMenu] = useState<string | null>('Bookings');

    useEffect(() => {
        if (currentPath.startsWith('/vehicles')) {
            setExpandedMenu('Vehicles');
        } else if (currentPath.startsWith('/bookings')) {
            setExpandedMenu('Bookings');
        } else if (currentPath.startsWith('/users&staff/manage')) {
            setExpandedMenu('Users & Staff');
        }
    }, [currentPath]);

    const menuItems: MenuItem[] = [
        {
            icon: <MdDashboard className="w-5 h-5" />,
            label: 'Dashboard',
            path: '/',
        },
        {
            icon: <BsCalendarEvent className="w-5 h-5" />,
            label: 'Bookings',
            isActive: currentPath?.startsWith('/bookings'),
            subItems: [
                {
                    icon: null,
                    label: 'Create Booking',
                    path: '/bookings/create'
                },
                {
                    icon: null,
                    label: 'Manage Bookings',
                    path: '/bookings/manage'
                },
                {
                    icon: null,
                    label: 'Manage Slot',
                    path: '/bookings/slot'
                },
            ],
        },
        {
            icon: <CarFront className="w-5 h-5" />,
            label: 'Vehicles',
            isActive: currentPath?.startsWith('/vehicles'),
            subItems: [
                {
                    icon: null,
                    label: 'Add Vehicle',
                    path: '/vehicles/add'
                },
                {
                    icon: null,
                    label: 'Manage Vehicle',
                    path: '/vehicles/manage'
                }
            ],
        },
        {
            icon: <Users className="w-5 h-5" />,
            label: 'Users & Staff',
            isActive: currentPath?.startsWith('/users&staff/manage'),
            subItems: [
                {
                    icon: null,
                    label: 'Manage Users',
                    path: '/users&staff/manage/users'
                },
                {
                    icon: null,
                    label: 'Manage Sub Admin',
                    path: '/users&staff/manage/subAdmin'
                },
                {
                    icon: null,
                    label: 'Manage Service Boy',
                    path: '/users&staff/manage/serviceBoy'
                },
                {
                    icon: null,
                    label: 'Manage Vehicle',
                    path: '/users&staff/manage/usersWallet'
                }
            ],
        },
    ];

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
                    "fixed left-0 top-0 h-screen bg-[#1a1a1a] text-white transition-all duration-300 ease-in-out z-30",
                    isCollapsed ? 'w-20' : 'w-72'
                )}
            >
                {/* Logo */}
                <div className="flex items-center justify-center h-20 border-b border-secondary-800/50 px-4">
                    <div className="flex items-center gap-2 overflow-hidden">
                        {<img src={logo} alt="Logo" />}
                    </div>
                </div>

                {/* Menu Items */}
                <nav className="mt-6 px-3 space-y-2">
                    {menuItems.map((item) => {
                        const isMenuActive = item.path ? currentPath === item.path : item.isActive;

                        return (
                            <div key={item.label} className="relative">
                                {item.path && !item.subItems ? (
                                    <a
                                        href={item.path}
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
                                                    {item.label}
                                                </span>
                                            )}
                                        </div>
                                    </a>
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
                                                    {item.label}
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
                                        <div className="relative pl-6 space-y-2">
                                            {/* Vertical Line */}
                                            <div className={`absolute left-6 top-0 bottom-0 w-0.5 bg-gray-600 ${item.subItems.length === 2 ? 'h-[60%]' : 'h-[79%]'}`} />

                                            {item.subItems.map((subItem, index) => {
                                                const isActive = currentPath === subItem.path;

                                                return (
                                                    <div key={index} className="relative">
                                                        {/* Curved connector line */}
                                                        <svg
                                                            className="absolute left-0 top-1/2 -translate-y-1/2"
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

                                                        <a
                                                            href={subItem.path}
                                                            className={cn(
                                                                "flex items-center gap-3 pl-8 pr-4 py-3 text-sm rounded-xl transition-all duration-200 group relative",
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
                                                            <span className="whitespace-nowrap">{subItem.label}</span>
                                                        </a>
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

                {/* Toggle Button */}
                <button
                    onClick={onToggle}
                    className="absolute -right-3 top-14 bg-primary text-[#1a1a1a] rounded-full p-2 shadow-xl hover:scale-110 transition-all duration-200 hover:shadow-2xl z-50"
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
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

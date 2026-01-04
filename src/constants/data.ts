import type { DetailRowProps, Vehicle } from "../types/bookings";
import car from '../assets/car.svg';
import cash from '../assets/icons/cash.svg';
import credit from '../assets/icons/credit.svg';
import free from '../assets/icons/free.svg';
import type { MenuType } from "../types/common";
import { Eye } from "lucide-react";
import carImage from "../assets/car.svg";
import EGYPT from "@/assets/images/flags/EGYPT.png";
import KSA from "@/assets/images/flags/KSA.png";
import KWU from "@/assets/images/flags/KWU.png";
import UAE from "@/assets/images/flags/UAE.png";
import customer from "@/assets/images/a2d5b399907e9638f3692bc625edb48bf22a9919.jpg";

export const routeConfig: Record<string, { title: string; breadcrumbs: string[]; }> = {
    '/dashboard': {
        title: 'Dashboard',
        breadcrumbs: ['Dashboard']
    },
    '/bookings/create': {
        title: 'Bookings',
        breadcrumbs: ['Bookings', 'Create Booking', 'Services Booking']
    },
    '/bookings/manage': {
        title: 'Bookings',
        breadcrumbs: ['Bookings', 'Manage Bookings']
    },
    '/bookings/manage/id': {
        title: 'Bookings',
        breadcrumbs: ['Bookings', 'Manage Bookings' , 'Manage Booking By Id']
    },
    '/bookings/slot': {
        title: 'Bookings',
        breadcrumbs: ['Bookings', 'Manage Slot']
    },
    '/vehicles/add': {
        title: 'Vehicles',
        breadcrumbs: ['Vehicles', 'Add']
    },
    '/vehicles/manageVehicles': {
        title: 'Vehicles',
        breadcrumbs: ['Vehicles', 'Manage Vehicles']
    },
    '/users&staff/manage/users': {
        title: 'Users & Stuff',
        breadcrumbs: ['Users & Stuff', 'Manage Users']
    },
    '/users&staff/manage/users/manageGroup': {
        title: 'Users & Stuff',
        breadcrumbs: ['Users & Stuff', 'Manage Users' , 'Manage Group']
    },
    '/users&staff/manage/subAdmin': {
        title: 'Users & Stuff',
        breadcrumbs: ['Users & Stuff', 'Manage', 'Sub Admin']
    },
    '/users&staff/manage/serviceBoy': {
        title: 'Users & Stuff',
        breadcrumbs: ['Users & Stuff', 'Manage', 'Service Boy']
    },
    '/users&staff/manage/usersWallet': {
        title: 'Users & Stuff',
        breadcrumbs: ['Users & Stuff', 'Manage', 'Users Wallet']
    },
    '/users&staff/manage/subAdmin/addSubAdmin': {
        title: 'Users & Stuff',
        breadcrumbs: ['Users & Stuff', 'Manage', 'Sub Admin', 'Add']
    },
    '/users&staff/manageServiceBoy/:id': {
        title: 'Users & Stuff',
        breadcrumbs: ['Users & Stuff', 'Manage Service Boy', 'Service Boy Details']
    },
    '/users&staff/manage/serviceBoy/addServiceBoy': {
        title: 'Users & Stuff',
        breadcrumbs: ['Users & Stuff', 'Manage Service Boy', 'Add Service Boy']
    },
    '/geography&regions/manage/countries': {
        title: 'Geography & Regions',
        breadcrumbs: ['Geography & Regions', 'Manage Countries']
    },
    '/geography&regions/manage/regions': {
        title: 'Geography & Regions',
        breadcrumbs: ['Geography & Regions', 'Manage Regions']
    },
    '/geography&regions/manage/area': {
        title: 'Geography & Regions',
        breadcrumbs: ['Geography & Regions', 'Manage Area']
    },
    '/geography&regions/manage/area/add/mainArea': {
        title: 'Geography & Regions',
        breadcrumbs: ['Geography & Regions', 'Manage Area' , 'Add Main Area']
    },
    '/geography&regions/manage/area/add/subArea': {
        title: 'Geography & Regions',
        breadcrumbs: ['Geography & Regions', 'Manage Area' , 'Add Sub Area']
    },
    '/services&extra/manage/Service': {
        title: 'Services & Extra',
        breadcrumbs: ['Services & Extra', 'Manage Service']
    },
    '/services&extra/manage/Service/addService': {
        title: 'Services & Extra',
        breadcrumbs: ['Services & Extra', 'Manage Service', 'Add Service']
    },
    '/services&extra/manage/ExtreService': {
        title: 'Services & Extra',
        breadcrumbs: ['Services & Extra', 'Manage Extra Service']
    },
    '/services&extra/manage/extreService/addExtraService': {
        title: 'Services & Extra',
        breadcrumbs: ['Services & Extra', 'Manage Extra Service', 'Add Extra Service']
    },
    '/services&extra/manage/Coupon': {
        title: 'Services & Extra',
        breadcrumbs: ['Services & Extra', 'Manage Coupon']
    },
    '/services&extra/manage/coupon/addCoupon': {
        title: 'Services & Extra',
        breadcrumbs: ['Services & Extra', 'Manage Coupon', 'Add Coupon']
    },
    '/services&extra/manage/Package': {
        title: 'Services & Extra',
        breadcrumbs: ['Services & Extra', 'Manage Package']
    },
    '/services&extra/manage/Package/addPackage': {
        title: 'Services & Extra',
        breadcrumbs: ['Services & Extra', 'Manage Package', 'Add Package']
    },
    '/products&orders/manage/Products': {
        title: 'Products & Orders',
        breadcrumbs: ['Products & Orders', 'Manage Products']
    },
    '/products&orders/manage/Products/addProduct': {
        title: 'Products & Orders',
        breadcrumbs: ['Products & Orders', 'Manage Products', 'Add Products']
    },
    '/products&orders/manage/Products/addGategory': {
        title: 'Products & Orders',
        breadcrumbs: ['Products & Orders', 'Manage Products', 'Add Gategory']
    },
    '/products&orders/manage/Orders': {
        title: 'Products & Orders',
        breadcrumbs: ['Products & Orders', 'Manage Orders']
    },
    '/financial&points/manage/Vat': {
        title: 'Financial & Points',
        breadcrumbs: ['Financial & Points', 'Manage Vat']
    },
    '/financial&points/manage/driverCommission': {
        title: 'Financial & Points',
        breadcrumbs: ['Financial & Points', 'Manage Driver Commission']
    },
    '/financial&points/manage/bonusPoint': {
        title: 'Financial & Points',
        breadcrumbs: ['Financial & Points', 'Manage Bonus Point']
    },
    '/financial&points/manage/adminEarning': {
        title: 'Financial & Points',
        breadcrumbs: ['Financial & Points', 'Manage Admin Earning']
    },
    '/technicalSupport/contactUs': {
        title: 'Technical Support',
        breadcrumbs: ['Technical Support', 'Contact Us']
    },
    '/technicalSupport/manage/companies': {
        title: 'Technical Support',
        breadcrumbs: ['Technical Support', 'Manage Companies']
    },
    '/technicalSupport/broadcast': {
        title: 'Technical Support',
        breadcrumbs: ['Technical Support', 'Broadcast']
    },
    '/technicalSupport/broadcast/SendBroadcast': {
        title: 'Technical Support',
        breadcrumbs: ['Technical Support', 'Broadcast' , 'Send Broadcast']
    },
    '/technicalSupport/manage/faqs': {
        title: 'Technical Support',
        breadcrumbs: ['Technical Support', 'Manage FAQs']
    },
    '/technicalSupport/manage/faqs/addFqs': {
        title: 'Technical Support',
        breadcrumbs: ['Technical Support', 'Manage FAQs' , 'Add Fqs']
    },
    '/technicalSupport/manage/orderQuestions': {
        title: 'Technical Support',
        breadcrumbs: ['Technical Support', 'Manage Order Questions']
    },
    '/technicalSupport/manage/orderQuestions/addOrdersQuestions': {
        title: 'Technical Support',
        breadcrumbs: ['Technical Support', 'Manage Order Questions' , 'Add Orders Questions']
    }
};



// Sidebar menu configuration
export const sidebarMenuItems = [
    {
        iconName: 'LayoutDashboard',
        label: 'Dashboard',
        path: '/',
    },
    {
        iconName: 'Calendar',
        label: 'Bookings',
        pathPrefix: '/bookings',
        subItems: [
            {
                label: 'Create Booking',
                path: '/bookings/create'
            },
            {
                label: 'Manage Bookings',
                path: '/bookings/manage'
            },
            {
                label: 'Manage Slot',
                path: '/bookings/slot'
            },
        ],
    },
    {
        iconName: 'CarFront',
        label: 'Vehicles',
        pathPrefix: '/vehicles',
        subItems: [
            {
                label: 'Add Vehicle',
                path: '/vehicles/add'
            },
            {
                label: 'Manage Vehicle',
                path: '/vehicles/manageVehicles'
            }
        ],
    },
    {
        iconName: 'Users',
        label: 'Users & Staff',
        pathPrefix: '/users&staff',
        subItems: [
            {
                label: 'Manage Users',
                path: '/users&staff/manageUsers'
            },
            {
                label: 'Manage Sub Admin',
                path: '/users&staff/manageSubAdmin'
            },
            {
                label: 'Manage Service Boy',
                path: '/users&staff/manageServiceBoy'
            },
            {
                label: 'Manage Users Wallet',
                path: '/users&staff/manageUsersWallet'
            }
        ],
    },
    {
        iconName: 'Map',
        label: 'Geography & Regions',
        pathPrefix: '/geography&regions',
        subItems: [
            {
                label: 'Manage Countries',
                path: '/geography&regions/manageCountries'
            },
            {
                label: 'Manage Regions',
                path: '/geography&regions/manageRegions'
            },
            {
                label: 'Manage Area',
                path: '/geography&regions/manageAreas'
            }
        ],
    },
];

export const createBookingTabs = [
    { id: 'services', label: 'Services Booking' },
    { id: 'package', label: 'Package Booking' },
];

export const manageAreaTabs = [
    { id: 'mainArea', label: 'Manage Main Area' },
    { id: 'subArea', label: 'Manage Sub Area' },
];
export const sendBroadcast = [
    { id: 'sendUser', label: 'Send User' },
    { id: 'sendServiceBoy', label: 'Send Service Boy' },
    { id: 'sendGroup', label: 'Send Group' },
];

export const exportTypes = ['CSV', 'Excel', 'PDF'];
export const types = ['type one', 'type two', 'type three'];
export const status = ['Open', 'Closed'];


export const createBookingSteps = [
    {
        title: 'Step One',
        description: 'Enter customer data',
    },
    {
        title: 'Step Two',
        description: 'Enter service data',
    },
    {
        title: 'Step Three',
        description: 'Payment Method',
    },
    {
        title: 'Step Four',
        description: 'Write notes',
    },
];

export const createBackageBookingSteps = [
    {
        title: 'Step One',
        description: 'Enter customer data',
    },
    {
        title: 'Step Two',
        description: 'Enter service data',
    },
    {
        title: 'Step Three',
        description: 'Write notes',
    },
];

export const dummyDataVehicles: Vehicle[] = [
    {
        id: '1',
        name: 'Porsche 718 Cayman S',
        type: 'Coupe',
        image: car,
        make: undefined,
        model: undefined,
        colorHex: undefined
    },
    {
        id: '2',
        name: 'Porsche 718 Cayman S',
        type: 'Coupe',
        image: car,
        make: undefined,
        model: undefined,
        colorHex: undefined
    },
    {
        id: '3',
        name: 'Porsche 718 Cayman S',
        type: 'Coupe',
        image: car,
        make: undefined,
        model: undefined,
        colorHex: undefined
    },
    {
        id: '4',
        name: 'Porsche 718 Cayman S',
        type: 'Coupe',
        image: car,
        make: undefined,
        model: undefined,
        colorHex: undefined
    },
    {
        id: '5',
        name: 'Porsche 718 Cayman S',
        type: 'Coupe',
        image: car,
        make: undefined,
        model: undefined,
        colorHex: undefined
    },
    {
        id: '6',
        name: 'Porsche 718 Cayman S',
        type: 'Coupe',
        image: car,
        make: undefined,
        model: undefined,
        colorHex: undefined
    },
    {
        id: '7',
        name: 'Porsche 718 Cayman S',
        type: 'Coupe',
        image: car,
        make: undefined,
        model: undefined,
        colorHex: undefined
    },
];

export const paymentMethods = [
    {
        id: 'cash',
        label: 'Cash',
        icon: cash,
    },
    {
        id: 'credit',
        label: 'Credit',
        icon: credit,
    },
    {
        id: 'free',
        label: 'Free',
        icon: free,
    },
];

export const availableExtraServices = [
    { id: '1', name: 'SHINEFY Deep Cleaning' },
    { id: '2', name: 'test service' },
];

// Example for booking table data
export const dummyTableData: any[] = [
    {
        bookingNumber: "BK001",
        customerName: "Mahmoud",
        serviceBoyName: "Ahmed",
        serviceName: "SHINEFY VIP",
        paymentMethod: "Cash",
        totalAmount: "500",
    },
    {
        bookingNumber: "BK002",
        customerName: "Mahmoud",
        serviceBoyName: "Ali",
        serviceName: "SHINEFY VIP",
        paymentMethod: "Cash",
        totalAmount: "600",
    },
    {
        bookingNumber: "BK003",
        customerName: "Mahmoud",
        serviceBoyName: "Hassan",
        serviceName: "SHINEFY VIP",
        paymentMethod: "Cash",
        totalAmount: "450",
    },
    {
        bookingNumber: "BK004",
        customerName: "Mahmoud",
        serviceBoyName: "Omar",
        serviceName: "SHINEFY VIP",
        paymentMethod: "Cash",
        totalAmount: "700",
    },
];

// Example for booking Slots table data
export const dummySlotTableData: any[] = [
    {
        slotDate: '02-06-2025',
        createDateAndTim: '31-May-23 08:23 PM',
        type: 'Other',
        startTime: '02:00 AM',
        endTime: '02:00 AM',
        status: 'Open',
    },
    {
        slotDate: '02-06-2025',
        createDateAndTim: '31-May-23 08:23 PM',
        type: 'Other',
        startTime: '02:00 AM',
        endTime: '02:00 AM',
        status: 'Close',
    },
    {
        slotDate: '02-06-2025',
        createDateAndTim: '31-May-23 08:23 PM',
        type: 'Other',
        startTime: '02:00 AM',
        endTime: '02:00 AM',
        status: 'Open',
    },
    {
        slotDate: '02-06-2025',
        createDateAndTim: '31-May-23 08:23 PM',
        type: 'Other',
        startTime: '02:00 AM',
        endTime: '02:00 AM',
        status: 'Close',
    },
    {
        slotDate: '02-06-2025',
        createDateAndTim: '31-May-23 08:23 PM',
        type: 'Other',
        startTime: '02:00 AM',
        endTime: '02:00 AM',
        status: 'Open',
    },
    {
        slotDate: '02-06-2025',
        createDateAndTim: '31-May-23 08:23 PM',
        type: 'Other',
        startTime: '02:00 AM',
        endTime: '02:00 AM',
        status: 'Close',
    },
    {
        slotDate: '02-06-2025',
        createDateAndTim: '31-May-23 08:23 PM',
        type: 'Other',
        startTime: '02:00 AM',
        endTime: '02:00 AM',
        status: 'Open',
    },
    {
        slotDate: '02-06-2025',
        createDateAndTim: '31-May-23 08:23 PM',
        type: 'Other',
        startTime: '02:00 AM',
        endTime: '02:00 AM',
        status: 'Close',
    },
    {
        slotDate: '02-06-2025',
        createDateAndTim: '31-May-23 08:23 PM',
        type: 'Other',
        startTime: '02:00 AM',
        endTime: '02:00 AM',
        status: 'Open',
    },
    {
        slotDate: '02-06-2025',
        createDateAndTim: '31-May-23 08:23 PM',
        type: 'Other',
        startTime: '02:00 AM',
        endTime: '02:00 AM',
        status: 'Close',
    },
];

// Example for manage sub admins table data
export const dummyManageSubAdmins: any[] = [
    {
        image: '',
        name: 'eid fathy',
        email: 'other',
        phoneNumber: '+201004894245',
        registrationOn: '21-Nov-22 12:10 PM',
        status: 'Activated',
    },
    {
        image: '',
        name: 'eid fathy',
        email: 'other',
        phoneNumber: '+201004894245',
        registrationOn: '21-Nov-22 12:10 PM',
        status: 'Deactivated',
    },
    {
        image: '',
        name: 'eid fathy',
        email: 'other',
        phoneNumber: '+201004894245',
        registrationOn: '21-Nov-22 12:10 PM',
        status: 'Activated',
    },
    {
        image: '',
        name: 'eid fathy',
        email: 'other',
        phoneNumber: '+201004894245',
        registrationOn: '21-Nov-22 12:10 PM',
        status: 'Deactivated',
    },
    {
        image: '',
        name: 'eid fathy',
        email: 'other',
        phoneNumber: '+201004894245',
        registrationOn: '21-Nov-22 12:10 PM',
        status: 'Activated',
    },
    {
        image: '',
        name: 'eid fathy',
        email: 'other',
        phoneNumber: '+201004894245',
        registrationOn: '21-Nov-22 12:10 PM',
        status: 'Deactivated',
    },
    {
        image: '',
        name: 'eid fathy',
        email: 'other',
        phoneNumber: '+201004894245',
        registrationOn: '21-Nov-22 12:10 PM',
        status: 'Activated',
    },
    {
        image: '',
        name: 'eid fathy',
        email: 'other',
        phoneNumber: '+201004894245',
        registrationOn: '21-Nov-22 12:10 PM',
        status: 'Deactivated',
    },
    {
        image: '',
        name: 'eid fathy',
        email: 'other',
        phoneNumber: '+201004894245',
        registrationOn: '21-Nov-22 12:10 PM',
        status: 'Activated',
    },
    {
        image: '',
        name: 'eid fathy',
        email: 'other',
        phoneNumber: '+201004894245',
        registrationOn: '21-Nov-22 12:10 PM',
        status: 'Deactivated',
    },
];
// Example for manage sub admins table data
export const dummyUserWallets: any[] = [
    {
        userName: 'Youssif El Helaly',
        mobileNumber: '+201101255511',
        amountType: 'Credit',
        type: '7.50',
        reason: 'Cashback',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        userName: 'Youssif El Helaly',
        mobileNumber: '+201101255511',
        amountType: 'Credit',
        type: '7.50',
        reason: 'Cashback',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        userName: 'Youssif El Helaly',
        mobileNumber: '+201101255511',
        amountType: 'Credit',
        type: '7.50',
        reason: 'Cashback',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        userName: 'Youssif El Helaly',
        mobileNumber: '+201101255511',
        amountType: 'Credit',
        type: '7.50',
        reason: 'Cashback',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        userName: 'Youssif El Helaly',
        mobileNumber: '+201101255511',
        amountType: 'Credit',
        type: '7.50',
        reason: 'Cashback',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        userName: 'Youssif El Helaly',
        mobileNumber: '+201101255511',
        amountType: 'Credit',
        type: '7.50',
        reason: 'Cashback',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        userName: 'Youssif El Helaly',
        mobileNumber: '+201101255511',
        amountType: 'Credit',
        type: '7.50',
        reason: 'Cashback',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        userName: 'Youssif El Helaly',
        mobileNumber: '+201101255511',
        amountType: 'Credit',
        type: '7.50',
        reason: 'Cashback',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        userName: 'Youssif El Helaly',
        mobileNumber: '+201101255511',
        amountType: 'Credit',
        type: '7.50',
        reason: 'Cashback',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        userName: 'Youssif El Helaly',
        mobileNumber: '+201101255511',
        amountType: 'Credit',
        type: '7.50',
        reason: 'Cashback',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        userName: 'Youssif El Helaly',
        mobileNumber: '+201101255511',
        amountType: 'Credit',
        type: '7.50',
        reason: 'Cashback',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
];

// Example for manage countries

export const dummyCountries: any[] = [
    {
        flag: EGYPT,
        name: 'Egypt',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        flag: UAE,
        name: 'United Arab Emirates',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        flag: KWU,
        name: 'Kuwait',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        flag: KSA,
        name: 'Saudi Arabia',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
];

// Example for manage countries

export const dummyExtraService: any[] = [
    {
        image: '',
        extraServiceEnglishName: 'SHINEFY Deep Cleaning',
        extraServiceArabicName: 'شاين-فاي تنظيف عميق',
        extraServicePrice: 'Extra Service Price',
        extraServiceTime: 'Extra Service Time (minutes)',
    },
    {
        image: '',
        extraServiceEnglishName: 'SHINEFY Deep Cleaning',
        extraServiceArabicName: 'شاين-فاي تنظيف عميق',
        extraServicePrice: 'Extra Service Price',
        extraServiceTime: 'Extra Service Time (minutes)',
    },
    {
        image: '',
        extraServiceEnglishName: 'SHINEFY Deep Cleaning',
        extraServiceArabicName: 'شاين-فاي تنظيف عميق',
        extraServicePrice: 'Extra Service Price',
        extraServiceTime: 'Extra Service Time (minutes)',
    },
    {
        image: '',
        extraServiceEnglishName: 'SHINEFY Deep Cleaning',
        extraServiceArabicName: 'شاين-فاي تنظيف عميق',
        extraServicePrice: 'Extra Service Price',
        extraServiceTime: 'Extra Service Time (minutes)',
    },
    {
        image: '',
        extraServiceEnglishName: 'SHINEFY Deep Cleaning',
        extraServiceArabicName: 'شاين-فاي تنظيف عميق',
        extraServicePrice: 'Extra Service Price',
        extraServiceTime: 'Extra Service Time (minutes)',
    },
    {
        image: '',
        extraServiceEnglishName: 'SHINEFY Deep Cleaning',
        extraServiceArabicName: 'شاين-فاي تنظيف عميق',
        extraServicePrice: 'Extra Service Price',
        extraServiceTime: 'Extra Service Time (minutes)',
    },
    {
        image: '',
        extraServiceEnglishName: 'SHINEFY Deep Cleaning',
        extraServiceArabicName: 'شاين-فاي تنظيف عميق',
        extraServicePrice: 'Extra Service Price',
        extraServiceTime: 'Extra Service Time (minutes)',
    },
    {
        image: '',
        extraServiceEnglishName: 'SHINEFY Deep Cleaning',
        extraServiceArabicName: 'شاين-فاي تنظيف عميق',
        extraServicePrice: 'Extra Service Price',
        extraServiceTime: 'Extra Service Time (minutes)',
    },
    {
        image: '',
        extraServiceEnglishName: 'SHINEFY Deep Cleaning',
        extraServiceArabicName: 'شاين-فاي تنظيف عميق',
        extraServicePrice: 'Extra Service Price',
        extraServiceTime: 'Extra Service Time (minutes)',
    },
];

// Example for manage regions
export const dummyRegions: any[] = [
    {
        countries: {
            flag: EGYPT,
            title: 'Egypt'
        },
        regions: 'Cairo',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        countries: {
            flag: EGYPT,
            title: 'Egypt'
        },
        regions: 'New Cairo',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        countries: {
            flag: KSA,
            title: 'Saudi Arabia'
        },
        regions: 'Riyadh',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
];

// Example for manage package name
export const dummyManagePackageName: any[] = [
    {
        packageName : 'Premium VIP Package',
        price : '4410',
        totalUsed : '1',
        totalDays : '365',
        type : 'pre_schedule',
        interval : 'daily',
        createDateAndTime : '21-Nov-22 12:10 PM',
    },
    {
        packageName : 'Premium VIP Package',
        price : '4410',
        totalUsed : '1',
        totalDays : '365',
        type : 'pre_schedule',
        interval : 'daily',
        createDateAndTime : '21-Nov-22 12:10 PM',
    },
    {
        packageName : 'Premium VIP Package',
        price : '4410',
        totalUsed : '1',
        totalDays : '365',
        type : 'pre_schedule',
        interval : 'daily',
        createDateAndTime : '21-Nov-22 12:10 PM',
    },
    {
        packageName : 'Premium VIP Package',
        price : '4410',
        totalUsed : '1',
        totalDays : '365',
        type : 'pre_schedule',
        interval : 'daily',
        createDateAndTime : '21-Nov-22 12:10 PM',
    },
    {
        packageName : 'Premium VIP Package',
        price : '4410',
        totalUsed : '1',
        totalDays : '365',
        type : 'pre_schedule',
        interval : 'daily',
        createDateAndTime : '21-Nov-22 12:10 PM',
    },
    {
        packageName : 'Premium VIP Package',
        price : '4410',
        totalUsed : '1',
        totalDays : '365',
        type : 'pre_schedule',
        interval : 'daily',
        createDateAndTime : '21-Nov-22 12:10 PM',
    },
    {
        packageName : 'Premium VIP Package',
        price : '4410',
        totalUsed : '1',
        totalDays : '365',
        type : 'pre_schedule',
        interval : 'daily',
        createDateAndTime : '21-Nov-22 12:10 PM',
    },
    {
        packageName : 'Premium VIP Package',
        price : '4410',
        totalUsed : '1',
        totalDays : '365',
        type : 'pre_schedule',
        interval : 'daily',
        createDateAndTime : '21-Nov-22 12:10 PM',
    },
    {
        packageName : 'Premium VIP Package',
        price : '4410',
        totalUsed : '1',
        totalDays : '365',
        type : 'pre_schedule',
        interval : 'daily',
        createDateAndTime : '21-Nov-22 12:10 PM',
    },
    {
        packageName : 'Premium VIP Package',
        price : '4410',
        totalUsed : '1',
        totalDays : '365',
        type : 'pre_schedule',
        interval : 'daily',
        createDateAndTime : '21-Nov-22 12:10 PM',
    },
];

// Example for manage package subscription
export const dummyManagePackageSubscription: any[] = [
    {
        packageName : 'Premium VIP Package',
        userName : 'Youssif El Helaly',
        status : 'active',
        price : '510',
        availableFrom : '2025-08-20',
        availableeTo : '2025-09-19',
        createDateAndTime : '21-Nov-22 12:10 PM',
    },
    {
        packageName : 'Premium VIP Package',
        userName : 'Youssif El Helaly',
        status : 'active',
        price : '510',
        availableFrom : '2025-08-20',
        availableeTo : '2025-09-19',
        createDateAndTime : '21-Nov-22 12:10 PM',
    },
    {
        packageName : 'Premium VIP Package',
        userName : 'Youssif El Helaly',
        status : 'active',
        price : '510',
        availableFrom : '2025-08-20',
        availableeTo : '2025-09-19',
        createDateAndTime : '21-Nov-22 12:10 PM',
    },
    {
        packageName : 'Premium VIP Package',
        userName : 'Youssif El Helaly',
        status : 'active',
        price : '510',
        availableFrom : '2025-08-20',
        availableeTo : '2025-09-19',
        createDateAndTime : '21-Nov-22 12:10 PM',
    },
    {
        packageName : 'Premium VIP Package',
        userName : 'Youssif El Helaly',
        status : 'active',
        price : '510',
        availableFrom : '2025-08-20',
        availableeTo : '2025-09-19',
        createDateAndTime : '21-Nov-22 12:10 PM',
    },
    {
        packageName : 'Premium VIP Package',
        userName : 'Youssif El Helaly',
        status : 'active',
        price : '510',
        availableFrom : '2025-08-20',
        availableeTo : '2025-09-19',
        createDateAndTime : '21-Nov-22 12:10 PM',
    },
    {
        packageName : 'Premium VIP Package',
        userName : 'Youssif El Helaly',
        status : 'active',
        price : '510',
        availableFrom : '2025-08-20',
        availableeTo : '2025-09-19',
        createDateAndTime : '21-Nov-22 12:10 PM',
    },
    {
        packageName : 'Premium VIP Package',
        userName : 'Youssif El Helaly',
        status : 'active',
        price : '510',
        availableFrom : '2025-08-20',
        availableeTo : '2025-09-19',
        createDateAndTime : '21-Nov-22 12:10 PM',
    },
    {
        packageName : 'Premium VIP Package',
        userName : 'Youssif El Helaly',
        status : 'active',
        price : '510',
        availableFrom : '2025-08-20',
        availableeTo : '2025-09-19',
        createDateAndTime : '21-Nov-22 12:10 PM',
    },
    {
        packageName : 'Premium VIP Package',
        userName : 'Youssif El Helaly',
        status : 'active',
        price : '510',
        availableFrom : '2025-08-20',
        availableeTo : '2025-09-19',
        createDateAndTime : '21-Nov-22 12:10 PM',
    },
]


// Example for manage Main Area
export const dummyMainArea: any[] = [
    {
        countries: {
            flag: EGYPT,
            title: 'Egypt'
        },
        regions: 'Cairo',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        countries: {
            flag: EGYPT,
            title: 'Egypt'
        },
        regions: 'El Shrouk',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        countries: {
            flag: EGYPT,
            title: 'Egypt'
        },
        regions: 'New Cairo',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        countries: {
            flag: KSA,
            title: 'Saudi Arabia'
        },
        regions: 'Riyadh',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
];

// Example for manage Sub Area
export const dummySubArea: any[] = [
    {
        mainAreaName: {
            flag: EGYPT,
            title: 'El Shrouk'
        },
        areaName: 'Future City',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        mainAreaName: {
            flag: EGYPT,
            title: 'El Shekh Zayed'
        },
        areaName: 'El Shekh Zayed',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
];

// Example for manage Service
export const dummyService: any[] = [
    {
        image: '',
        serviceEnglishName: 'SHINEFY Internal',
        serviceArabicName: 'SHINEFY الداخلي',
        servicePrice: '150.00',
        serviceTime: '45',
        extraService: 'true',
    },
    {
        image: '',
        serviceEnglishName: 'SHINEFY Internal',
        serviceArabicName: 'SHINEFY الداخلي',
        servicePrice: '150.00',
        serviceTime: '45',
        extraService: 'false',
    },
    {
        image: '',
        serviceEnglishName: 'SHINEFY Internal',
        serviceArabicName: 'SHINEFY الداخلي',
        servicePrice: '150.00',
        serviceTime: '45',
        extraService: 'true',
    },
    {
        image: '',
        serviceEnglishName: 'SHINEFY Internal',
        serviceArabicName: 'SHINEFY الداخلي',
        servicePrice: '150.00',
        serviceTime: '45',
        extraService: 'false',
    },
    {
        image: '',
        serviceEnglishName: 'SHINEFY Internal',
        serviceArabicName: 'SHINEFY الداخلي',
        servicePrice: '150.00',
        serviceTime: '45',
        extraService: 'true',
    },
    {
        image: '',
        serviceEnglishName: 'SHINEFY Internal',
        serviceArabicName: 'SHINEFY الداخلي',
        servicePrice: '150.00',
        serviceTime: '45',
        extraService: 'false',
    },
    {
        image: '',
        serviceEnglishName: 'SHINEFY Internal',
        serviceArabicName: 'SHINEFY الداخلي',
        servicePrice: '150.00',
        serviceTime: '45',
        extraService: 'true',
    },
    {
        image: '',
        serviceEnglishName: 'SHINEFY Internal',
        serviceArabicName: 'SHINEFY الداخلي',
        servicePrice: '150.00',
        serviceTime: '45',
        extraService: 'false',
    },
    {
        image: '',
        serviceEnglishName: 'SHINEFY Internal',
        serviceArabicName: 'SHINEFY الداخلي',
        servicePrice: '150.00',
        serviceTime: '45',
        extraService: 'true',
    },
    {
        image: '',
        serviceEnglishName: 'SHINEFY Internal',
        serviceArabicName: 'SHINEFY الداخلي',
        servicePrice: '150.00',
        serviceTime: '45',
        extraService: 'false',
    },
];

// Example for manage group
export const dummyManageGroup: any[] = [
    {
        groupName: 'SHINEFY',
        users: [
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
        ],
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        groupName: 'SHINEFY',
        users: [
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
        ],
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        groupName: 'SHINEFY',
        users: [
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
        ],
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        groupName: 'SHINEFY',
        users: [
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
        ],
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        groupName: 'SHINEFY',
        users: [
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
        ],
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        groupName: 'SHINEFY',
        users: [
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
        ],
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        groupName: 'SHINEFY',
        users: [
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
        ],
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        groupName: 'SHINEFY',
        users: [
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
        ],
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        groupName: 'SHINEFY',
        users: [
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
        ],
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        groupName: 'SHINEFY',
        users: [
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
        ],
        createDateAndTime: '21-Nov-22 12:10 PM',
    },

];

// Example for manage users
export const dummyUsers: any[] = [
    {
        image: '',
        name: 'eid fathy',
        email: 'Other',
        phoneNumber: '201004894245',
        registrationOn: '21-Nov-22 12:10 PM',
        status: 'Activated',
        groupName: '21-Nov-22 ',
    },
    {
        image: '',
        name: 'eid fathy',
        email: 'Other',
        phoneNumber: '201004894245',
        registrationOn: '21-Nov-22 12:10 PM',
        status: 'Activated',
        groupName: '21-Nov-22 ',
    },
    {
        image: '',
        name: 'eid fathy',
        email: 'Other',
        phoneNumber: '201004894245',
        registrationOn: '21-Nov-22 12:10 PM',
        status: 'Activated',
        groupName: '21-Nov-22 ',
    },
    {
        image: '',
        name: 'eid fathy',
        email: 'Other',
        phoneNumber: '201004894245',
        registrationOn: '21-Nov-22 12:10 PM',
        status: 'Activated',
        groupName: '21-Nov-22 ',
    },
    {
        image: '',
        name: 'eid fathy',
        email: 'Other',
        phoneNumber: '201004894245',
        registrationOn: '21-Nov-22 12:10 PM',
        status: 'Activated',
        groupName: '21-Nov-22 ',
    },
    {
        image: '',
        name: 'eid fathy',
        email: 'Other',
        phoneNumber: '201004894245',
        registrationOn: '21-Nov-22 12:10 PM',
        status: 'Activated',
        groupName: '21-Nov-22 ',
    },
    {
        image: '',
        name: 'eid fathy',
        email: 'Other',
        phoneNumber: '201004894245',
        registrationOn: '21-Nov-22 12:10 PM',
        status: 'Activated',
        groupName: '21-Nov-22 ',
    },
    {
        image: '',
        name: 'eid fathy',
        email: 'Other',
        phoneNumber: '201004894245',
        registrationOn: '21-Nov-22 12:10 PM',
        status: 'Activated',
        groupName: '21-Nov-22 ',
    },
    {
        image: '',
        name: 'eid fathy',
        email: 'Other',
        phoneNumber: '201004894245',
        registrationOn: '21-Nov-22 12:10 PM',
        status: 'Activated',
        groupName: '21-Nov-22 ',
    },
    {
        image: '',
        name: 'eid fathy',
        email: 'Other',
        phoneNumber: '201004894245',
        registrationOn: '21-Nov-22 12:10 PM',
        status: 'Activated',
        groupName: '21-Nov-22 ',
    },
]
// Example for Manage Orders Questions
export const dummyManageOrdersQuestions: any[] = [
    {
        orderQuestionInEnglish: 'What are the materials used for the service?',
        orderQuestionInArabic: 'ماهي المواد المستخدمة في الغسيل؟',
        createDateAndTime: '31-Aug-22 03:05 PM',
    },
    
    {
        orderQuestionInEnglish: 'What are the materials used for the service?',
        orderQuestionInArabic: 'ماهي المواد المستخدمة في الغسيل؟',
        createDateAndTime: '31-Aug-22 03:05 PM',
    },
    
    {
        orderQuestionInEnglish: 'What are the materials used for the service?',
        orderQuestionInArabic: 'ماهي المواد المستخدمة في الغسيل؟',
        createDateAndTime: '31-Aug-22 03:05 PM',
    },
    
    {
        orderQuestionInEnglish: 'What are the materials used for the service?',
        orderQuestionInArabic: 'ماهي المواد المستخدمة في الغسيل؟',
        createDateAndTime: '31-Aug-22 03:05 PM',
    },
    
    {
        orderQuestionInEnglish: 'What are the materials used for the service?',
        orderQuestionInArabic: 'ماهي المواد المستخدمة في الغسيل؟',
        createDateAndTime: '31-Aug-22 03:05 PM',
    },
    
    {
        orderQuestionInEnglish: 'What are the materials used for the service?',
        orderQuestionInArabic: 'ماهي المواد المستخدمة في الغسيل؟',
        createDateAndTime: '31-Aug-22 03:05 PM',
    },
    
    {
        orderQuestionInEnglish: 'What are the materials used for the service?',
        orderQuestionInArabic: 'ماهي المواد المستخدمة في الغسيل؟',
        createDateAndTime: '31-Aug-22 03:05 PM',
    },
    
    {
        orderQuestionInEnglish: 'What are the materials used for the service?',
        orderQuestionInArabic: 'ماهي المواد المستخدمة في الغسيل؟',
        createDateAndTime: '31-Aug-22 03:05 PM',
    },
    
    {
        orderQuestionInEnglish: 'What are the materials used for the service?',
        orderQuestionInArabic: 'ماهي المواد المستخدمة في الغسيل؟',
        createDateAndTime: '31-Aug-22 03:05 PM',
    },
    
    {
        orderQuestionInEnglish: 'What are the materials used for the service?',
        orderQuestionInArabic: 'ماهي المواد المستخدمة في الغسيل؟',
        createDateAndTime: '31-Aug-22 03:05 PM',
    },
    
    {
        orderQuestionInEnglish: 'What are the materials used for the service?',
        orderQuestionInArabic: 'ماهي المواد المستخدمة في الغسيل؟',
        createDateAndTime: '31-Aug-22 03:05 PM',
    },
    
];

// Example for manage products
export const dummyProducts: any[] = [
    {
        hash: '1',
        englishName: 'Shinefy',
        arabicName: 'شينيفاي',
        category: 'Sport',
        price: '25000',
        status: 'Active',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        englishName: 'Shinefy',
        arabicName: 'شينيفاي',
        category: 'Sport',
        price: '25000',
        status: 'Active',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        englishName: 'Shinefy',
        arabicName: 'شينيفاي',
        category: 'Sport',
        price: '25000',
        status: 'Active',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        englishName: 'Shinefy',
        arabicName: 'شينيفاي',
        category: 'Sport',
        price: '25000',
        status: 'Active',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        englishName: 'Shinefy',
        arabicName: 'شينيفاي',
        category: 'Sport',
        price: '25000',
        status: 'Active',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        englishName: 'Shinefy',
        arabicName: 'شينيفاي',
        category: 'Sport',
        price: '25000',
        status: 'Active',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        englishName: 'Shinefy',
        arabicName: 'شينيفاي',
        category: 'Sport',
        price: '25000',
        status: 'Active',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        englishName: 'Shinefy',
        arabicName: 'شينيفاي',
        category: 'Sport',
        price: '25000',
        status: 'Active',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        englishName: 'Shinefy',
        arabicName: 'شينيفاي',
        category: 'Sport',
        price: '25000',
        status: 'Active',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        englishName: 'Shinefy',
        arabicName: 'شينيفاي',
        category: 'Sport',
        price: '25000',
        status: 'Active',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
];

// Example for manage products category table
export const dummyCategory: any[] = [
    {
        hash: '1',
        categoryEnglishName: 'Sport',
        categoryArabicName: 'العاب',
        status: 'Active',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        categoryEnglishName: 'Sport',
        categoryArabicName: 'العاب',
        status: 'Active',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        categoryEnglishName: 'Sport',
        categoryArabicName: 'العاب',
        status: 'Active',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        categoryEnglishName: 'Sport',
        categoryArabicName: 'العاب',
        status: 'Active',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        categoryEnglishName: 'Sport',
        categoryArabicName: 'العاب',
        status: 'Active',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        categoryEnglishName: 'Sport',
        categoryArabicName: 'العاب',
        status: 'Active',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        categoryEnglishName: 'Sport',
        categoryArabicName: 'العاب',
        status: 'Active',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        categoryEnglishName: 'Sport',
        categoryArabicName: 'العاب',
        status: 'Active',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        categoryEnglishName: 'Sport',
        categoryArabicName: 'العاب',
        status: 'Active',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        categoryEnglishName: 'Sport',
        categoryArabicName: 'العاب',
        status: 'Active',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
];
// Example for manage orders
export const dummyOrders: any[] = [
    {
        hash: '1',
        orderId: '584208',
        items: '1',
        total: '690.00',
        status: 'Pending',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        orderId: '584208',
        items: '1',
        total: '690.00',
        status: 'Pending',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        orderId: '584208',
        items: '1',
        total: '690.00',
        status: 'Pending',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        orderId: '584208',
        items: '1',
        total: '690.00',
        status: 'Pending',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        orderId: '584208',
        items: '1',
        total: '690.00',
        status: 'Pending',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        orderId: '584208',
        items: '1',
        total: '690.00',
        status: 'Pending',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        orderId: '584208',
        items: '1',
        total: '690.00',
        status: 'Pending',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        orderId: '584208',
        items: '1',
        total: '690.00',
        status: 'Pending',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        orderId: '584208',
        items: '1',
        total: '690.00',
        status: 'Pending',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
    {
        hash: '1',
        orderId: '584208',
        items: '1',
        total: '690.00',
        status: 'Pending',
        createDateAndTime: '21-Nov-22 12:10 PM',
    },
];

// Example for manage admin earning
export const dummyAdminEarning: any[] = [
    {
        status : 'Completed',
        bookingNumber : '7926287137',
        customer: {
            name: 'eidfathy' ,
            image: customer ,
        },
        serviceBoyName : 'Khalil abdelmagid',
        serviceName : 'SHINEFY Plus',
        totalAmount : '150.00',
        serviceDateAndTime : '21-Nov-22 12:10 PM',
        create : '28-May-23 10:51 AM',
    },
    {
        status : 'Completed',
        bookingNumber : '7926287137',
        customer: {
            name: 'eidfathy' ,
            image: customer ,
        },
        serviceBoyName : 'Khalil abdelmagid',
        serviceName : 'SHINEFY Plus',
        totalAmount : '150.00',
        serviceDateAndTime : '21-Nov-22 12:10 PM',
        create : '28-May-23 10:51 AM',
    },
    {
        status : 'Completed',
        bookingNumber : '7926287137',
        customer: {
            name: 'eidfathy' ,
            image: customer ,
        },
        serviceBoyName : 'Khalil abdelmagid',
        serviceName : 'SHINEFY Plus',
        totalAmount : '150.00',
        serviceDateAndTime : '21-Nov-22 12:10 PM',
        create : '28-May-23 10:51 AM',
    },
    {
        status : 'Completed',
        bookingNumber : '7926287137',
        customer: {
            name: 'eidfathy' ,
            image: customer ,
        },
        serviceBoyName : 'Khalil abdelmagid',
        serviceName : 'SHINEFY Plus',
        totalAmount : '150.00',
        serviceDateAndTime : '21-Nov-22 12:10 PM',
        create : '28-May-23 10:51 AM',
    },
    {
        status : 'Completed',
        bookingNumber : '7926287137',
        customer: {
            name: 'eidfathy' ,
            image: customer ,
        },
        serviceBoyName : 'Khalil abdelmagid',
        serviceName : 'SHINEFY Plus',
        totalAmount : '150.00',
        serviceDateAndTime : '21-Nov-22 12:10 PM',
        create : '28-May-23 10:51 AM',
    },
    {
        status : 'Completed',
        bookingNumber : '7926287137',
        customer: {
            name: 'eidfathy' ,
            image: customer ,
        },
        serviceBoyName : 'Khalil abdelmagid',
        serviceName : 'SHINEFY Plus',
        totalAmount : '150.00',
        serviceDateAndTime : '21-Nov-22 12:10 PM',
        create : '28-May-23 10:51 AM',
    },
    {
        status : 'Completed',
        bookingNumber : '7926287137',
        customer: {
            name: 'eidfathy' ,
            image: customer ,
        },
        serviceBoyName : 'Khalil abdelmagid',
        serviceName : 'SHINEFY Plus',
        totalAmount : '150.00',
        serviceDateAndTime : '21-Nov-22 12:10 PM',
        create : '28-May-23 10:51 AM',
    },
    {
        status : 'Completed',
        bookingNumber : '7926287137',
        customer: {
            name: 'eidfathy' ,
            image: customer ,
        },
        serviceBoyName : 'Khalil abdelmagid',
        serviceName : 'SHINEFY Plus',
        totalAmount : '150.00',
        serviceDateAndTime : '21-Nov-22 12:10 PM',
        create : '28-May-23 10:51 AM',
    },
    {
        status : 'Completed',
        bookingNumber : '7926287137',
        customer: {
            name: 'eidfathy' ,
            image: customer ,
        },
        serviceBoyName : 'Khalil abdelmagid',
        serviceName : 'SHINEFY Plus',
        totalAmount : '150.00',
        serviceDateAndTime : '21-Nov-22 12:10 PM',
        create : '28-May-23 10:51 AM',
    },
    {
        status : 'Completed',
        bookingNumber : '7926287137',
        customer: {
            name: 'eidfathy' ,
            image: customer ,
        },
        serviceBoyName : 'Khalil abdelmagid',
        serviceName : 'SHINEFY Plus',
        totalAmount : '150.00',
        serviceDateAndTime : '21-Nov-22 12:10 PM',
        create : '28-May-23 10:51 AM',
    }
];

// Example for manage manage company
export const dummyManageCopany: any[] = [
    {
        name : 'Elhlaly',
        email : 'elhlaly@gmail.com',
        code : '1',
        numOfUsers : '6545316',
        percentage : 'Pending',
        startDate : '21-Nov-22  PM',
        endDate : '21-Nov-22  PM',
        createDateAndTime : '21-Nov-22  PM',
    },
];


// Example for manage Broadcast
export const dummyBroadcast: any[] = [
    {
        message : 'test',
        type : 'User',
        customers : 'All',
        broadcastDate : '31-Aug-22 03:05 PM',
    },
    {
        message : 'test',
        type : 'Service Boy',
        customers : 'All',
        broadcastDate : '31-Aug-22 03:05 PM',
    },
    {
        message : 'test',
        type : 'Group',
        customers : 'All',
        broadcastDate : '31-Aug-22 03:05 PM',
    },
    {
        message : 'test',
        type : 'User',
        customers : [
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
        ],
        broadcastDate : '31-Aug-22 03:05 PM',
    },
    {
        message : 'test',
        type : 'Service Boy',
        customers : [
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
        ],
        broadcastDate : '31-Aug-22 03:05 PM',
    },
    {
        message : 'test',
        type : 'Group',
        customers : [
            'Group',
            'Group',
            'Group',
            'Group',
            'Group',
        ],
        broadcastDate : '31-Aug-22 03:05 PM',
    },
    {
        message : 'test',
        type : 'User',
        customers : 'All',
        broadcastDate : '31-Aug-22 03:05 PM',
    },
    {
        message : 'test',
        type : 'Service Boy',
        customers : 'All',
        broadcastDate : '31-Aug-22 03:05 PM',
    },
    {
        message : 'test',
        type : 'Group',
        customers : 'All',
        broadcastDate : '31-Aug-22 03:05 PM',
    },
    {
        message : 'test',
        type : 'User',
        customers : [
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
        ],
        broadcastDate : '31-Aug-22 03:05 PM',
    },
    {
        message : 'test',
        type : 'Service Boy',
        customers : [
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
            'Eid Fathy',
        ],
        broadcastDate : '31-Aug-22 03:05 PM',
    },
    {
        message : 'test',
        type : 'Group',
        customers : [
            'Group',
            'Group',
            'Group',
            'Group',
            'Group',
        ],
        broadcastDate : '31-Aug-22 03:05 PM',
    },
    {
        message : 'test',
        type : 'User',
        customers : 'All',
        broadcastDate : '31-Aug-22 03:05 PM',
    },
    {
        message : 'test',
        type : 'Service Boy',
        customers : 'All',
        broadcastDate : '31-Aug-22 03:05 PM',
    },
    {
        message : 'test',
        type : 'Group',
        customers : 'All',
        broadcastDate : '31-Aug-22 03:05 PM',
    },
];

//drop down with multi selections and options

export const menus: MenuType[] = [
    {
        Key: 1,
        title: "Dashboard",
        options: ["Dashboard"],
    },
    {
        Key: 2,
        title: "Services & Extras",
        options: [
            "Services one",
            "Services two",
            "Services three",
            "Services four",
            "Services five",
        ],
    },
    {
        Key: 3,
        title: "Products & Orders",
        options: ["Order one", "Order two", "Order three"],
    },
    {
        Key: 4,
        title: "Bookings",
        options: ["Bookings one", "Bookings two", "Bookings three"],
    },
    {
        Key: 5,
        title: "Products & Orders",
        options: ["Order one", "Order two", "Order three"],
    },
    {
        Key: 6,
        title: "Products & Orders",
        options: ["Order one", "Order two", "Order three"],
    },
    {
        Key: 7,
        title: "Vehicles",
        options: ["Vehicle one", "Vehicle two", "Vehicle three"],
    },
    {
        Key: 8,
        title: "Products & Orders",
        options: ["Order one", "Order two", "Order three"],
    },
    {
        Key: 9,
        title: "Reports",
        options: ["Report A", "Report B", "Report C"],
    },
    {
        Key: 10,
        title: "Users & Staff",
        options: ["Permission A", "Permission B", "Permission C"],
    },
    {
        Key: 11,
        title: "Financial & Points",
        options: ["Finance A", "Finance B", "Finance C"],
    },
    {
        Key: 12,
        title: "Settings & Content",
        options: ["Setting 1", "Setting 2", "Setting 3"],
    },
    {
        Key: 13,
        title: "Geography and Regions",
        options: ["Region 1", "Region 2", "Region 3"],
    },
    {
        Key: 14,
        title: "Communication & Support",
        options: ["Support 1", "Support 2", "Support 3"],
    },
    {
        Key: 15,
        title: "Franchise",
        options: ["Franchise 1", "Franchise 2", "Franchise 3"],
    }
];

export const dummyDays = [
    "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu",
    "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu",
    "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"
];
export const dummyYears = ["2023", "2024", "2025"];
export const dummyMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export const financeRows = [
    { label: "Coupon Applied", value: "% 0" },
    { label: "Coupon Code", value: "NA" },
    { label: "Coupon Amount", value: "NA" },
    { label: "Sub Total", value: "EGP 1500.00", type: "badge", badgeColor: "green" },
    { isDivider: true },
    { label: "Wallet Amount", value: "EGP 0.00" },
    { isDivider: true },
    { label: "Grand Total", value: "EGP 1500.00", type: "badge", badgeColor: "green" },
];

export const dummyServiceBoyData: any[] = [
    {
        id: "SB001",
        image: carImage,
        name: 'Ahmed Ali',
        phoneNumber: '+201001234567',
        registrationOn: '21-Nov-22 12:10 PM',
        status: 'Activated',
    },
    {
        id: "SB002",
        image: carImage,
        name: 'Mohamed Hassan',
        phoneNumber: '+201109876543',
        registrationOn: '15-Oct-22 09:30 AM',
        status: 'Deactivated',
    },
    {
        id: "SB003",
        image: carImage,
        name: 'Youssef Ibrahim',
        phoneNumber: '+201205555555',
        registrationOn: '01-Jan-23 03:45 PM',
        status: 'Activated',
    },
    {
        id: "SB004",
        image: carImage,
        name: 'Omar Khaled',
        phoneNumber: '+201501112222',
        registrationOn: '10-Dec-22 11:20 AM',
        status: 'Activated',
    },
    {
        id: "SB005",
        image: carImage,
        name: 'Khaled Said',
        phoneNumber: '+201004443333',
        registrationOn: '05-Sep-22 08:15 AM',
        status: 'Deactivated',
    },
];

export const dummyMakeData: any[] = [
    {
        logo: carImage,
        englishName: 'Porsche',
        arabicName: 'بورش',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        logo: carImage,
        englishName: 'BMW',
        arabicName: 'بورش',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        logo: carImage,
        englishName: 'Mercedes',
        arabicName: 'بورش',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        logo: carImage,
        englishName: 'Audi',
        arabicName: 'بورش',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
];

export const dummyMakeOptions = [
    "Porsche",
    "BMW",
    "Mercedes",
    "Audi"
];

export const dummyModelData: any[] = [
    {
        makeName: 'Audi',
        englishModelName: 'Audi',
        arabicModelName: 'بورش',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        makeName: 'Audi',
        englishModelName: 'Audi',
        arabicModelName: 'بورش',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        makeName: 'Audi',
        englishModelName: 'Audi',
        arabicModelName: 'بورش',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
];

export const dummyColorData: any[] = [
    {
        colorCode: '#FF0000',
        englishColorName: 'Red',
        arabicColorName: 'Red',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        colorCode: '#0000FF',
        englishColorName: 'Blue',
        arabicColorName: 'Blue',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        colorCode: '#00FF00',
        englishColorName: 'Green',
        arabicColorName: 'Green',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
];

export const dummyCarCategoryData: any[] = [
    {
        carCategoryImage: carImage,
        englishCarCategoryName: 'SUV',
        arabicCarCategoryName: 'SUV',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        carCategoryImage: carImage,
        englishCarCategoryName: 'Sedan',
        arabicCarCategoryName: 'Sedan',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        carCategoryImage: carImage,
        englishCarCategoryName: 'Coupe',
        arabicCarCategoryName: 'Coupe',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
];


// Example for manage fqs
export const dummyManageFqs: any[] = [
    {
        questionEnglish: 'What are the materials used for the service?',
        answerEnglish: '- Water is used to remove dust and dirt - A Class Exported Chemicals is',
        questionArabic: 'ماهي المواد المستخدمة في الغسيل؟',
        answerArabic: '- يتم استخدام الماء لأزاله الغبار والأوساخ - يتم استخدام أفضل المواد المستوردة',
    },
    {
        questionEnglish: 'What are the materials used for the service?',
        answerEnglish: '- Water is used to remove dust and dirt - A Class Exported Chemicals is',
        questionArabic: 'ماهي المواد المستخدمة في الغسيل؟',
        answerArabic: '- يتم استخدام الماء لأزاله الغبار والأوساخ - يتم استخدام أفضل المواد المستوردة',
    },
    {
        questionEnglish: 'What are the materials used for the service?',
        answerEnglish: '- Water is used to remove dust and dirt - A Class Exported Chemicals is',
        questionArabic: 'ماهي المواد المستخدمة في الغسيل؟',
        answerArabic: '- يتم استخدام الماء لأزاله الغبار والأوساخ - يتم استخدام أفضل المواد المستوردة',
    },
    {
        questionEnglish: 'What are the materials used for the service?',
        answerEnglish: '- Water is used to remove dust and dirt - A Class Exported Chemicals is',
        questionArabic: 'ماهي المواد المستخدمة في الغسيل؟',
        answerArabic: '- يتم استخدام الماء لأزاله الغبار والأوساخ - يتم استخدام أفضل المواد المستوردة',
    },
    {
        questionEnglish: 'What are the materials used for the service?',
        answerEnglish: '- Water is used to remove dust and dirt - A Class Exported Chemicals is',
        questionArabic: 'ماهي المواد المستخدمة في الغسيل؟',
        answerArabic: '- يتم استخدام الماء لأزاله الغبار والأوساخ - يتم استخدام أفضل المواد المستوردة',
    },
    {
        questionEnglish: 'What are the materials used for the service?',
        answerEnglish: '- Water is used to remove dust and dirt - A Class Exported Chemicals is',
        questionArabic: 'ماهي المواد المستخدمة في الغسيل؟',
        answerArabic: '- يتم استخدام الماء لأزاله الغبار والأوساخ - يتم استخدام أفضل المواد المستوردة',
    },
    {
        questionEnglish: 'What are the materials used for the service?',
        answerEnglish: '- Water is used to remove dust and dirt - A Class Exported Chemicals is',
        questionArabic: 'ماهي المواد المستخدمة في الغسيل؟',
        answerArabic: '- يتم استخدام الماء لأزاله الغبار والأوساخ - يتم استخدام أفضل المواد المستوردة',
    },
    {
        questionEnglish: 'What are the materials used for the service?',
        answerEnglish: '- Water is used to remove dust and dirt - A Class Exported Chemicals is',
        questionArabic: 'ماهي المواد المستخدمة في الغسيل؟',
        answerArabic: '- يتم استخدام الماء لأزاله الغبار والأوساخ - يتم استخدام أفضل المواد المستوردة',
    },
    {
        questionEnglish: 'What are the materials used for the service?',
        answerEnglish: '- Water is used to remove dust and dirt - A Class Exported Chemicals is',
        questionArabic: 'ماهي المواد المستخدمة في الغسيل؟',
        answerArabic: '- يتم استخدام الماء لأزاله الغبار والأوساخ - يتم استخدام أفضل المواد المستوردة',
    },
    {
        questionEnglish: 'What are the materials used for the service?',
        answerEnglish: '- Water is used to remove dust and dirt - A Class Exported Chemicals is',
        questionArabic: 'ماهي المواد المستخدمة في الغسيل؟',
        answerArabic: '- يتم استخدام الماء لأزاله الغبار والأوساخ - يتم استخدام أفضل المواد المستوردة',
    },
];

export const mainDetails: DetailRowProps[] = [
    {
        label: "ID", value: "9388546579",
        type: "badge"
    },
    {
        label: "Customer Name",
        value: "Eid Fathy",
        actionButton: {
            text: "View",
            icon: Eye,
            onClick: () => console.log("View customer")
        },
        type: "badge"
    },
    { label: "Type", value: "Normal", type: "badge", badgeColor: "yellow" },
    {
        label: "Booking Date", value: "2025-10-18",
        type: "badge"
    },
    {
        label: "Booking Time", value: "05:30 PM",
        type: "badge"
    },
    { label: "Address Type", value: "Home", type: "badge", badgeColor: "blue" },
    {
        label: "Address",
        value: "cairo,",
        actionButton: {
            text: "View",
            icon: Eye,
            onClick: () => console.log("View address")
        },
        type: "badge"
    },
];

export const statusDetails: DetailRowProps[] = [
    { label: "Status", value: "Pending", type: "badge", badgeColor: "yellow" },
    { label: "Note", value: "NA", type: "badge", badgeColor: "red" },
    { label: "Payment Option", value: "Cash", type: "badge", badgeColor: "blue" },
    { label: "Collect Money Status", value: "Not Collected", type: "badge", badgeColor: "yellow" },
    { label: "Grand Total", value: "EGP 1500.00", type: "badge", badgeColor: "green" }
];


export const dummyVehicles: any[] = [
    {
        id: "1",
        image: carImage,
        make: "Audi",
        model: "Q5 2025",
        plateNumber: "ي م ك - 128",
        color: "Red",
        colorHex: "#DC2626",
    },
    {
        id: "2",
        image: carImage,
        make: "Audi",
        model: "Q5 2025",
        plateNumber: "ي م ك - 128",
        color: "Red",
        colorHex: "#DC2626",
    },
];


export const manageSlotsTabs = [
    { id: 'manageDailySlot', label: 'Manage Daily Slot' },
    { id: 'manageFreeBooking', label: 'Manage Free Booking' },
];

export const franchise = ['Franchise one', 'Franchise two', 'Franchise three'];

export const manageVehiclesTabs = [
    { id: 'manageMake', label: 'Manage Make' },
    { id: 'manageModel', label: 'Manage Model' },
    { id: 'manageColor', label: 'Manage Color' },
    { id: 'manageCarCategory', label: 'Manage Car Category' },
];



//example names
export const exNames = [
  "Oliver",
  "Amelia",
  "Liam",
  "Sophia",
  "Noah",
  "Isabella",
  "Elijah",
  "Mia",
  "James",
  "Charlotte",
  "Benjamin",
  "Ava",
  "Lucas",
  "Emily",
  "Henry",
  "Harper",
  "Alexander",
  "Evelyn",
  "William",
  "Ella",
];

//example regions
export const egyptRegions = [
  "Cairo",
  "Alexandria",
  "Giza",
  "Luxor",
  "Aswan",
  "Suez",
  "Port Said",
  "Ismailia",
  "Sharm El-Sheikh",
  "Hurghada",
  "Tanta",
  "Mansoura",
  "Zagazig",
  "Sohag",
  "Assiut",
  "Damanhur",
  "Beni Suef",
  "Faiyum",
  "Minya",
  "El Mahalla El Kubra"
];

// example device type
export const carWashMachines = [
  "High Pressure Washer",
  "Foam Cannon",
  "Automatic Car Wash System",
  "Touchless Car Wash Machine",
  "Roller Brush Car Wash",
  "Underbody Wash System",
  "Steam Cleaner",
  "Vacuum Cleaner",
  "Water Recycling System",
  "Wheel Cleaner",
  "Foam Brush Machine",
  "Self-Service Car Wash Kiosk",
  "Car Dryer Blower",
  "Car Shampoo Dispenser",
  "Car Polishing Machine",
  "Car Waxing Machine",
  "Foam Gun",
  "Pressure Foam Washer",
  "Mobile Car Wash Unit",
  "Handheld Pressure Washer"
];
// examble for contact us messages from technical support section

export const dummyContactUsMessages: any[] = [
    {
        id: '1',
        avatar : 'KN',
        name : 'Khaled Nabil',
        email : 'kevinnicholassyahputra@mail.com',
        time : '18:30 PM ' ,
        status : 'new',
        shortDiscussion : 'Sometimes I wish. That I could still call you mine. Still call you mine~',
        msgDetails : {
            date: 'Dec 11, 2025, 7:34 PM (2 days ago)',
            head: 'Hey Hainley Collective',
            body: 'La saeta, al final, del tiempo clava, un alma enamorada. Una que empieza en blanco, y que no se rinde, un alma que se enfrenta al futuro. Una que alza su esperanza, que empieza, un alma enamorada, un alma enamorada. Hala Madrid, hala Madrid, noble y bélico adalid, caballero del honor. Hala Madrid, hala Madrid, a triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid.Enemigo en la contienda, cuando pierde da la mano, sin envidias ni rencores, como bueno y fiel hermano. Los domingos por la tarde, caminando a Chamartín, las mocitas madrileñas van alegres y risueñas porque hoy juega su Madrid. Hala Madrid, hala Madrid, noble y bélico adalid, caballero del honor.A triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid.Noble y bélico adalid, caballero del honor. Hala Madrid, hala Madrid, a triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid'
        }
    },
    {
        id: '2',
        avatar : 'KN',
        name : 'Khaled Nabil',
        email : 'kevinnicholassyahputra@mail.com',
        time : '18:30 PM ' ,
        status : 'opened',
        shortDiscussion : 'Sometimes I wish. That I could still call you mine. Still call you mine~',
        msgDetails : {
            date: 'Dec 11, 2025, 7:34 PM (2 days ago)',
            head: 'Hey Hainley Collective',
            body: 'La saeta, al final, del tiempo clava, un alma enamorada. Una que empieza en blanco, y que no se rinde, un alma que se enfrenta al futuro. Una que alza su esperanza, que empieza, un alma enamorada, un alma enamorada. Hala Madrid, hala Madrid, noble y bélico adalid, caballero del honor. Hala Madrid, hala Madrid, a triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid.Enemigo en la contienda, cuando pierde da la mano, sin envidias ni rencores, como bueno y fiel hermano. Los domingos por la tarde, caminando a Chamartín, las mocitas madrileñas van alegres y risueñas porque hoy juega su Madrid. Hala Madrid, hala Madrid, noble y bélico adalid, caballero del honor.A triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid.Noble y bélico adalid, caballero del honor. Hala Madrid, hala Madrid, a triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid'
        }
    },
    {
        id: '3',
        avatar : 'KN',
        name : 'Khaled Nabil',
        email : 'kevinnicholassyahputra@mail.com',
        time : '18:30 PM ' ,
        status : 'new',
        shortDiscussion : 'Sometimes I wish. That I could still call you mine. Still call you mine~',
        msgDetails : {
            date: 'Dec 11, 2025, 7:34 PM (2 days ago)',
            head: 'Hey Hainley Collective',
            body: 'La saeta, al final, del tiempo clava, un alma enamorada. Una que empieza en blanco, y que no se rinde, un alma que se enfrenta al futuro. Una que alza su esperanza, que empieza, un alma enamorada, un alma enamorada. Hala Madrid, hala Madrid, noble y bélico adalid, caballero del honor. Hala Madrid, hala Madrid, a triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid.Enemigo en la contienda, cuando pierde da la mano, sin envidias ni rencores, como bueno y fiel hermano. Los domingos por la tarde, caminando a Chamartín, las mocitas madrileñas van alegres y risueñas porque hoy juega su Madrid. Hala Madrid, hala Madrid, noble y bélico adalid, caballero del honor.A triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid.Noble y bélico adalid, caballero del honor. Hala Madrid, hala Madrid, a triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid'
        }
    },
    {
        id: '4',
        avatar : 'KN',
        name : 'Khaled Nabil',
        email : 'kevinnicholassyahputra@mail.com',
        time : '18:30 PM ' ,
        status : 'opened',
        shortDiscussion : 'Sometimes I wish. That I could still call you mine. Still call you mine~',
        msgDetails : {
            date: 'Dec 11, 2025, 7:34 PM (2 days ago)',
            head: 'Hey Hainley Collective',
            body: 'La saeta, al final, del tiempo clava, un alma enamorada. Una que empieza en blanco, y que no se rinde, un alma que se enfrenta al futuro. Una que alza su esperanza, que empieza, un alma enamorada, un alma enamorada. Hala Madrid, hala Madrid, noble y bélico adalid, caballero del honor. Hala Madrid, hala Madrid, a triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid.Enemigo en la contienda, cuando pierde da la mano, sin envidias ni rencores, como bueno y fiel hermano. Los domingos por la tarde, caminando a Chamartín, las mocitas madrileñas van alegres y risueñas porque hoy juega su Madrid. Hala Madrid, hala Madrid, noble y bélico adalid, caballero del honor.A triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid.Noble y bélico adalid, caballero del honor. Hala Madrid, hala Madrid, a triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid'
        }
    },
    {
        id: '5',
        avatar : 'KN',
        name : 'Khaled Nabil',
        email : 'kevinnicholassyahputra@mail.com',
        time : '18:30 PM ' ,
        status : 'new',
        shortDiscussion : 'Sometimes I wish. That I could still call you mine. Still call you mine~',
        msgDetails : {
            date: 'Dec 11, 2025, 7:34 PM (2 days ago)',
            head: 'Hey Hainley Collective',
            body: 'La saeta, al final, del tiempo clava, un alma enamorada. Una que empieza en blanco, y que no se rinde, un alma que se enfrenta al futuro. Una que alza su esperanza, que empieza, un alma enamorada, un alma enamorada. Hala Madrid, hala Madrid, noble y bélico adalid, caballero del honor. Hala Madrid, hala Madrid, a triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid.Enemigo en la contienda, cuando pierde da la mano, sin envidias ni rencores, como bueno y fiel hermano. Los domingos por la tarde, caminando a Chamartín, las mocitas madrileñas van alegres y risueñas porque hoy juega su Madrid. Hala Madrid, hala Madrid, noble y bélico adalid, caballero del honor.A triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid.Noble y bélico adalid, caballero del honor. Hala Madrid, hala Madrid, a triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid'
        }
    },
    {
        id: '6',
        avatar : 'KN',
        name : 'Khaled Nabil',
        email : 'kevinnicholassyahputra@mail.com',
        time : '18:30 PM ' ,
        status : 'opened',
        shortDiscussion : 'Sometimes I wish. That I could still call you mine. Still call you mine~',
        msgDetails : {
            date: 'Dec 11, 2025, 7:34 PM (2 days ago)',
            head: 'Hey Hainley Collective',
            body: 'La saeta, al final, del tiempo clava, un alma enamorada. Una que empieza en blanco, y que no se rinde, un alma que se enfrenta al futuro. Una que alza su esperanza, que empieza, un alma enamorada, un alma enamorada. Hala Madrid, hala Madrid, noble y bélico adalid, caballero del honor. Hala Madrid, hala Madrid, a triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid.Enemigo en la contienda, cuando pierde da la mano, sin envidias ni rencores, como bueno y fiel hermano. Los domingos por la tarde, caminando a Chamartín, las mocitas madrileñas van alegres y risueñas porque hoy juega su Madrid. Hala Madrid, hala Madrid, noble y bélico adalid, caballero del honor.A triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid.Noble y bélico adalid, caballero del honor. Hala Madrid, hala Madrid, a triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid'
        }
    },
    {
        id: '7',
        avatar : 'KN',
        name : 'Khaled Nabil',
        email : 'kevinnicholassyahputra@mail.com',
        time : '18:30 PM ' ,
        status : 'new',
        shortDiscussion : 'Sometimes I wish. That I could still call you mine. Still call you mine~',
        msgDetails : {
            date: 'Dec 11, 2025, 7:34 PM (2 days ago)',
            head: 'Hey Hainley Collective',
            body: 'La saeta, al final, del tiempo clava, un alma enamorada. Una que empieza en blanco, y que no se rinde, un alma que se enfrenta al futuro. Una que alza su esperanza, que empieza, un alma enamorada, un alma enamorada. Hala Madrid, hala Madrid, noble y bélico adalid, caballero del honor. Hala Madrid, hala Madrid, a triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid.Enemigo en la contienda, cuando pierde da la mano, sin envidias ni rencores, como bueno y fiel hermano. Los domingos por la tarde, caminando a Chamartín, las mocitas madrileñas van alegres y risueñas porque hoy juega su Madrid. Hala Madrid, hala Madrid, noble y bélico adalid, caballero del honor.A triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid.Noble y bélico adalid, caballero del honor. Hala Madrid, hala Madrid, a triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid'
        }
    },
    {
        id: '8',
        avatar : 'KN',
        name : 'Khaled Nabil',
        email : 'kevinnicholassyahputra@mail.com',
        time : '18:30 PM ' ,
        status : 'opened',
        shortDiscussion : 'Sometimes I wish. That I could still call you mine. Still call you mine~',
        msgDetails : {
            date: 'Dec 11, 2025, 7:34 PM (2 days ago)',
            head: 'Hey Hainley Collective',
            body: 'La saeta, al final, del tiempo clava, un alma enamorada. Una que empieza en blanco, y que no se rinde, un alma que se enfrenta al futuro. Una que alza su esperanza, que empieza, un alma enamorada, un alma enamorada. Hala Madrid, hala Madrid, noble y bélico adalid, caballero del honor. Hala Madrid, hala Madrid, a triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid.Enemigo en la contienda, cuando pierde da la mano, sin envidias ni rencores, como bueno y fiel hermano. Los domingos por la tarde, caminando a Chamartín, las mocitas madrileñas van alegres y risueñas porque hoy juega su Madrid. Hala Madrid, hala Madrid, noble y bélico adalid, caballero del honor.A triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid.Noble y bélico adalid, caballero del honor. Hala Madrid, hala Madrid, a triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid'
        }
    },
    {
        id: '9',
        avatar : 'KN',
        name : 'Khaled Nabil',
        email : 'kevinnicholassyahputra@mail.com',
        time : '18:30 PM ' ,
        status : 'new',
        shortDiscussion : 'Sometimes I wish. That I could still call you mine. Still call you mine~',
        msgDetails : {
            date: 'Dec 11, 2025, 7:34 PM (2 days ago)',
            head: 'Hey Hainley Collective',
            body: 'La saeta, al final, del tiempo clava, un alma enamorada. Una que empieza en blanco, y que no se rinde, un alma que se enfrenta al futuro. Una que alza su esperanza, que empieza, un alma enamorada, un alma enamorada. Hala Madrid, hala Madrid, noble y bélico adalid, caballero del honor. Hala Madrid, hala Madrid, a triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid.Enemigo en la contienda, cuando pierde da la mano, sin envidias ni rencores, como bueno y fiel hermano. Los domingos por la tarde, caminando a Chamartín, las mocitas madrileñas van alegres y risueñas porque hoy juega su Madrid. Hala Madrid, hala Madrid, noble y bélico adalid, caballero del honor.A triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid.Noble y bélico adalid, caballero del honor. Hala Madrid, hala Madrid, a triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid'
        }
    },
    {
        id: '10',
        avatar : 'KN',
        name : 'Khaled Nabil',
        email : 'kevinnicholassyahputra@mail.com',
        time : '18:30 PM ' ,
        status : 'opened',
        shortDiscussion : 'Sometimes I wish. That I could still call you mine. Still call you mine~',
        msgDetails : {
            date: 'Dec 11, 2025, 7:34 PM (2 days ago)',
            head: 'Hey Hainley Collective',
            body: 'La saeta, al final, del tiempo clava, un alma enamorada. Una que empieza en blanco, y que no se rinde, un alma que se enfrenta al futuro. Una que alza su esperanza, que empieza, un alma enamorada, un alma enamorada. Hala Madrid, hala Madrid, noble y bélico adalid, caballero del honor. Hala Madrid, hala Madrid, a triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid.Enemigo en la contienda, cuando pierde da la mano, sin envidias ni rencores, como bueno y fiel hermano. Los domingos por la tarde, caminando a Chamartín, las mocitas madrileñas van alegres y risueñas porque hoy juega su Madrid. Hala Madrid, hala Madrid, noble y bélico adalid, caballero del honor.A triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid.Noble y bélico adalid, caballero del honor. Hala Madrid, hala Madrid, a triunfar en buena lid, defendiendo tu color. Hala Madrid, hala Madrid'
        }
    },
]

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
    '/bookings/slot': {
        title: 'Bookings',
        breadcrumbs: ['Bookings', 'Manage Slot']
    },
    '/vehicles/add': {
        title: 'Vehicles',
        breadcrumbs: ['Vehicles', 'Add']
    },
    '/vehicles/manage': {
        title: 'Vehicles',
        breadcrumbs: ['Vehicles', 'Manage']
    },
    '/users&staff/manage/users': {
        title: 'Users & Stuff',
        breadcrumbs: ['Users & Stuff', 'Manage', 'Users']
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
    '/services&extras/manage/Service': {
        title: 'Services & Extras',
        breadcrumbs: ['Services & Extras', 'Manage Service']
    },
    '/services&extras/manage/ExtreService': {
        title: 'Services & Extras',
        breadcrumbs: ['Services & Extras', 'Manage Extra Service']
    },
    '/services&extras/manage/Coupon': {
        title: 'Services & Extras',
        breadcrumbs: ['Services & Extras', 'Manage Coupon']
    },
    '/services&extras/manage/Package': {
        title: 'Services & Extras',
        breadcrumbs: ['Services & Extras', 'Manage Package']
    },
    '/services&extras/manage/Service/addService': {
        title: 'Services & Extras',
        breadcrumbs: ['Services & Extras', 'Manage Service' , 'Add Service']
    },
    '/services&extras/manage/Service/addExtraService': {
        title: 'Services & Extras',
        breadcrumbs: ['Services & Extras', 'Manage Service' , 'Add Extra Service']
    },
};

export const createBookingTabs = [
    { id: 'services', label: 'Services Booking' },
    { id: 'package', label: 'Package Booking' },
];

export const manageAreaTabs = [
    { id: 'mainArea', label: 'Manage Main Area' },
    { id: 'subArea', label: 'Manage Sub Area' },
];

export const exportTypes = ['CSV', 'Excel', 'PDF'];


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
        flag: EGYPT ,
        name: 'Egypt',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        flag: UAE ,
        name: 'United Arab Emirates',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        flag: KWU ,
        name: 'Kuwait',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        flag: KSA ,
        name: 'Saudi Arabia',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
];

// Example for manage countries

export const dummyExtraService: any[] = [
    {
        image: '' ,
        extraServiceEnglishName: 'SHINEFY Deep Cleaning',
        extraServiceArabicName: 'شاين-فاي تنظيف عميق',
        extraServicePrice: 'Extra Service Price',
        extraServiceTime: 'Extra Service Time (minutes)',
    },
    {
        image: '' ,
        extraServiceEnglishName: 'SHINEFY Deep Cleaning',
        extraServiceArabicName: 'شاين-فاي تنظيف عميق',
        extraServicePrice: 'Extra Service Price',
        extraServiceTime: 'Extra Service Time (minutes)',
    },
    {
        image: '' ,
        extraServiceEnglishName: 'SHINEFY Deep Cleaning',
        extraServiceArabicName: 'شاين-فاي تنظيف عميق',
        extraServicePrice: 'Extra Service Price',
        extraServiceTime: 'Extra Service Time (minutes)',
    },
    {
        image: '' ,
        extraServiceEnglishName: 'SHINEFY Deep Cleaning',
        extraServiceArabicName: 'شاين-فاي تنظيف عميق',
        extraServicePrice: 'Extra Service Price',
        extraServiceTime: 'Extra Service Time (minutes)',
    },
    {
        image: '' ,
        extraServiceEnglishName: 'SHINEFY Deep Cleaning',
        extraServiceArabicName: 'شاين-فاي تنظيف عميق',
        extraServicePrice: 'Extra Service Price',
        extraServiceTime: 'Extra Service Time (minutes)',
    },
    {
        image: '' ,
        extraServiceEnglishName: 'SHINEFY Deep Cleaning',
        extraServiceArabicName: 'شاين-فاي تنظيف عميق',
        extraServicePrice: 'Extra Service Price',
        extraServiceTime: 'Extra Service Time (minutes)',
    },
    {
        image: '' ,
        extraServiceEnglishName: 'SHINEFY Deep Cleaning',
        extraServiceArabicName: 'شاين-فاي تنظيف عميق',
        extraServicePrice: 'Extra Service Price',
        extraServiceTime: 'Extra Service Time (minutes)',
    },
    {
        image: '' ,
        extraServiceEnglishName: 'SHINEFY Deep Cleaning',
        extraServiceArabicName: 'شاين-فاي تنظيف عميق',
        extraServicePrice: 'Extra Service Price',
        extraServiceTime: 'Extra Service Time (minutes)',
    },
    {
        image: '' ,
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
            flag : EGYPT ,
            title : 'Egypt'
        } ,
        regions: 'Cairo',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        countries: {
            flag : EGYPT ,
            title : 'Egypt'
        } ,
        regions: 'New Cairo',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        countries: {
            flag : KSA ,
            title : 'Saudi Arabia'
        } ,
        regions: 'Riyadh',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
];


// Example for manage Main Area
export const dummyMainArea: any[] = [
    {
        countries: {
            flag : EGYPT ,
            title : 'Egypt'
        } ,
        regions: 'Cairo',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        countries: {
            flag : EGYPT ,
            title : 'Egypt'
        } ,
        regions: 'El Shrouk',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        countries: {
            flag : EGYPT ,
            title : 'Egypt'
        } ,
        regions: 'New Cairo',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        countries: {
            flag : KSA ,
            title : 'Saudi Arabia'
        } ,
        regions: 'Riyadh',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
];

// Example for manage Sub Area
export const dummySubArea: any[] = [
    {
        mainAreaName: {
            flag : EGYPT ,
            title : 'El Shrouk'
        } ,
        areaName: 'Future City',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
    {
        mainAreaName: {
            flag : EGYPT ,
            title : 'El Shekh Zayed'
        } ,
        areaName: 'El Shekh Zayed',
        createDateAndTime: '21-Nov-25 07:09 PM',
    },
];

// Example for manage Service
export const dummyService: any[] = [
    {
        image: '' ,
        serviceEnglishName: 'SHINEFY Internal' ,
        serviceArabicName: 'SHINEFY الداخلي' ,
        servicePrice: '150.00' ,
        serviceTime: '45',
        extraService: 'true',
    },
    {
        image: '' ,
        serviceEnglishName: 'SHINEFY Internal' ,
        serviceArabicName: 'SHINEFY الداخلي' ,
        servicePrice: '150.00' ,
        serviceTime: '45',
        extraService: 'false',
    },
    {
        image: '' ,
        serviceEnglishName: 'SHINEFY Internal' ,
        serviceArabicName: 'SHINEFY الداخلي' ,
        servicePrice: '150.00' ,
        serviceTime: '45',
        extraService: 'true',
    },
    {
        image: '' ,
        serviceEnglishName: 'SHINEFY Internal' ,
        serviceArabicName: 'SHINEFY الداخلي' ,
        servicePrice: '150.00' ,
        serviceTime: '45',
        extraService: 'false',
    },
    {
        image: '' ,
        serviceEnglishName: 'SHINEFY Internal' ,
        serviceArabicName: 'SHINEFY الداخلي' ,
        servicePrice: '150.00' ,
        serviceTime: '45',
        extraService: 'true',
    },
    {
        image: '' ,
        serviceEnglishName: 'SHINEFY Internal' ,
        serviceArabicName: 'SHINEFY الداخلي' ,
        servicePrice: '150.00' ,
        serviceTime: '45',
        extraService: 'false',
    },
    {
        image: '' ,
        serviceEnglishName: 'SHINEFY Internal' ,
        serviceArabicName: 'SHINEFY الداخلي' ,
        servicePrice: '150.00' ,
        serviceTime: '45',
        extraService: 'true',
    },
    {
        image: '' ,
        serviceEnglishName: 'SHINEFY Internal' ,
        serviceArabicName: 'SHINEFY الداخلي' ,
        servicePrice: '150.00' ,
        serviceTime: '45',
        extraService: 'false',
    },
    {
        image: '' ,
        serviceEnglishName: 'SHINEFY Internal' ,
        serviceArabicName: 'SHINEFY الداخلي' ,
        servicePrice: '150.00' ,
        serviceTime: '45',
        extraService: 'true',
    },
    {
        image: '' ,
        serviceEnglishName: 'SHINEFY Internal' ,
        serviceArabicName: 'SHINEFY الداخلي' ,
        servicePrice: '150.00' ,
        serviceTime: '45',
        extraService: 'false',
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
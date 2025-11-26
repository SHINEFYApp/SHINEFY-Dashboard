import type { Vehicle } from "../types/bookings";
import car from '../assets/car.svg';
import cash from '../assets/icons/cash.svg';
import credit from '../assets/icons/credit.svg';
import free from '../assets/icons/free.svg';
import type { MenuType } from "../types/common";

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
        breadcrumbs: ['Vehicles' , 'Add']
    },
    '/vehicles/manage': {
        title: 'Vehicles',
        breadcrumbs: ['Vehicles' , 'Manage']
    },
    '/users&staff/manage/users': {
        title: 'Users & Stuff',
        breadcrumbs: ['Users & Stuff' , 'Manage' , 'Users']
    },
    '/users&staff/manage/subAdmin': {
        title: 'Users & Stuff',
        breadcrumbs: ['Users & Stuff' , 'Manage' , 'Sub Admin']
    },
    '/users&staff/manage/serviceBoy': {
        title: 'Users & Stuff',
        breadcrumbs: ['Users & Stuff' , 'Manage' , 'Service Boy']
    },
    '/users&staff/manage/usersWallet': {
        title: 'Users & Stuff',
        breadcrumbs: ['Users & Stuff' , 'Manage' , 'Users Wallet']
    },
    '/users&staff/manage/subAdmin/addSubAdmin': {
        title: 'Users & Stuff',
        breadcrumbs: ['Users & Stuff' , 'Manage' , 'Sub Admin' , 'Add']
    },
};

export const createBookingTabs = [
    { id: 'services', label: 'Services Booking' },
    { id: 'package', label: 'Package Booking' },
];

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
    },
    {
        id: '2',
        name: 'Porsche 718 Cayman S',
        type: 'Coupe',
        image: car,
    },
    {
        id: '3',
        name: 'Porsche 718 Cayman S',
        type: 'Coupe',
        image: car,
    },
    {
        id: '4',
        name: 'Porsche 718 Cayman S',
        type: 'Coupe',
        image: car,
    },
    {
        id: '5',
        name: 'Porsche 718 Cayman S',
        type: 'Coupe',
        image: car,
    },
    {
        id: '6',
        name: 'Porsche 718 Cayman S',
        type: 'Coupe',
        image: car,
    },
    {
        id: '7',
        name: 'Porsche 718 Cayman S',
        type: 'Coupe',
        image: car,
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
        slotDate : '02-06-2025',
        createDateAndTim : '31-May-23 08:23 PM',
        type : 'Other',
        startTime : '02:00 AM',
        endTime : '02:00 AM',
        status : 'Open',
    },
    {
        slotDate : '02-06-2025',
        createDateAndTim : '31-May-23 08:23 PM',
        type : 'Other',
        startTime : '02:00 AM',
        endTime : '02:00 AM',
        status : 'Close',
    },
    {
        slotDate : '02-06-2025',
        createDateAndTim : '31-May-23 08:23 PM',
        type : 'Other',
        startTime : '02:00 AM',
        endTime : '02:00 AM',
        status : 'Open',
    },
    {
        slotDate : '02-06-2025',
        createDateAndTim : '31-May-23 08:23 PM',
        type : 'Other',
        startTime : '02:00 AM',
        endTime : '02:00 AM',
        status : 'Close',
    },
    {
        slotDate : '02-06-2025',
        createDateAndTim : '31-May-23 08:23 PM',
        type : 'Other',
        startTime : '02:00 AM',
        endTime : '02:00 AM',
        status : 'Open',
    },
    {
        slotDate : '02-06-2025',
        createDateAndTim : '31-May-23 08:23 PM',
        type : 'Other',
        startTime : '02:00 AM',
        endTime : '02:00 AM',
        status : 'Close',
    },
    {
        slotDate : '02-06-2025',
        createDateAndTim : '31-May-23 08:23 PM',
        type : 'Other',
        startTime : '02:00 AM',
        endTime : '02:00 AM',
        status : 'Open',
    },
    {
        slotDate : '02-06-2025',
        createDateAndTim : '31-May-23 08:23 PM',
        type : 'Other',
        startTime : '02:00 AM',
        endTime : '02:00 AM',
        status : 'Close',
    },
    {
        slotDate : '02-06-2025',
        createDateAndTim : '31-May-23 08:23 PM',
        type : 'Other',
        startTime : '02:00 AM',
        endTime : '02:00 AM',
        status : 'Open',
    },
    {
        slotDate : '02-06-2025',
        createDateAndTim : '31-May-23 08:23 PM',
        type : 'Other',
        startTime : '02:00 AM',
        endTime : '02:00 AM',
        status : 'Close',
    },
];

// Example for manage sub admins table data
export const dummyManageSubAdmins: any[] = [
    {
        image : '',
        name : 'eid fathy',
        email : 'other',
        phoneNumber : '+201004894245',
        registrationOn : '21-Nov-22 12:10 PM',
        status : 'Activated',
    },
    {
        image : '',
        name : 'eid fathy',
        email : 'other',
        phoneNumber : '+201004894245',
        registrationOn : '21-Nov-22 12:10 PM',
        status : 'Deactivated',
    },
    {
        image : '',
        name : 'eid fathy',
        email : 'other',
        phoneNumber : '+201004894245',
        registrationOn : '21-Nov-22 12:10 PM',
        status : 'Activated',
    },
    {
        image : '',
        name : 'eid fathy',
        email : 'other',
        phoneNumber : '+201004894245',
        registrationOn : '21-Nov-22 12:10 PM',
        status : 'Deactivated',
    },
    {
        image : '',
        name : 'eid fathy',
        email : 'other',
        phoneNumber : '+201004894245',
        registrationOn : '21-Nov-22 12:10 PM',
        status : 'Activated',
    },
    {
        image : '',
        name : 'eid fathy',
        email : 'other',
        phoneNumber : '+201004894245',
        registrationOn : '21-Nov-22 12:10 PM',
        status : 'Deactivated',
    },
    {
        image : '',
        name : 'eid fathy',
        email : 'other',
        phoneNumber : '+201004894245',
        registrationOn : '21-Nov-22 12:10 PM',
        status : 'Activated',
    },
    {
        image : '',
        name : 'eid fathy',
        email : 'other',
        phoneNumber : '+201004894245',
        registrationOn : '21-Nov-22 12:10 PM',
        status : 'Deactivated',
    },
    {
        image : '',
        name : 'eid fathy',
        email : 'other',
        phoneNumber : '+201004894245',
        registrationOn : '21-Nov-22 12:10 PM',
        status : 'Activated',
    },
    {
        image : '',
        name : 'eid fathy',
        email : 'other',
        phoneNumber : '+201004894245',
        registrationOn : '21-Nov-22 12:10 PM',
        status : 'Deactivated',
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


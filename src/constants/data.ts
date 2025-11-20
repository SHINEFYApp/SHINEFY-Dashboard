import type { Vehicle } from "../types/bookings";
import car from '../assets/car.svg';
import cash from '../assets/icons/cash.svg';
import credit from '../assets/icons/credit.svg';
import free from '../assets/icons/free.svg';

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


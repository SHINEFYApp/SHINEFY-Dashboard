import type { ReportFilters } from "../types/bookings";

export const manageSlotInitialValues = {
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    city: '',
    area: '',
    slotStatus: '',
    slotType: '',
};

export const servicesStep1InitialValues = {
    phoneNumber: '',
    address: '',
    vehicles: [],
    bookingDate: '',
    bookingTime: '',
};

export const servicesStep2InitialValues = {
    mainService: '',
    mainPackage: '',
    serviceBoy: '',
    extraServices: [],
};

export const servicesStep3InitialValues = {
    coupon: '',
    paymentMethod: '',
    walletAmount: '',
};

export const servicesStep4InitialValues = {
    userNote: '',
    adminNotes: '',
};

export const userWalletInitialValues = {
    user: '',
    amount: '',
};

export const addSubAdminInitialValues = {
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
};

export const addVehicleInitialValues = {
    user: '',
    category: '',
    make: '',
    model: '',
    color: '',
};

export const CompletedBookingChartInitialValues: ReportFilters = {
    status: "",
    startDate: "",
    endDate: "",
};

export const RatedReportsChartInitialValues: ReportFilters = {
    status: "",
    startDate: "",
    endDate: "",
};

export const manageSlotsSearchInitialValues = { type: "", status: "", date: "" };

export const manageBookingSearchInitialValues = { search: "", date: "" };

export const manageSubAdminSearchInitialValues = { search: '', franchise: '' };
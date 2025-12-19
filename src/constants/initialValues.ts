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

export const addCountry = {
    flag: null,
    name: '',
};

export const araeForms = {
    country: '',
    area: [],
    regions: '',
    areaName: '',
    subAreaName: '',
};

export const addRegions = {
    country: '',
    name: '',
    description: ''
};

export const mangeServiceInitialValues = {
    serviceNameEnglish: "",
    serviceLabelEnglish: "",
    serviceNameArabic: "",
    serviceLabelArabic: "",
    servicePrice: "",
    serviceTime: "",
    serviceDiscount: "",
    engishServiceDescription: "",
    arabicServiceDescription: "",
    Date: null,
    Time: null,
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

export const manageServiceBoySearchInitialValues = { search: '', franchise: '', status: '', export: '' };


export const bookingFilterInitialValues = {
    status: '',
    service_boy: '',
    address: '',
    bookingNumber: '',
    customerName: '',
    serviceBoyName: '',
    paymentMethod: '',
    date: '',
    time: '',
    dateFrom: '',
    dateTo: '',
};

export const addServiceBoyInitialValues = {
    name: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    availableDays: [],
    startHour: '',
    endHour: '',
    drivingLicense: null,
    licenseExpiredDate: '',
    idCardImage: null,
};

export const addExtraServiceInitialValues = {
    extraServiceNameEnglish: "",
    extarServicePrice: "",
    serviceNameArabic: "",
    extraServiceDiscount: "",
    extarServiceTime: "",
    englishServiceDescription: "",
    extraArabicServiceDescription: "",
    Date: "",
    Time: "",
}

export const addCouponInitialValues = {
    user: "",
    couponAnount: "",
    couponCode: "",
    discount: "",
    services: "",
    startDate: "",
    startTime: "",
    useCount: "",
    endDate: "",
    endTime: ""
};

export const addProductInitialValues = {
    category: "",
    englishName: "",
    arabicName: "",
    englishDescription: "",
    arabicDescription: "",
    price: "",
};
export const addCategoryInitialValues = {
    englishName: "",
    arabicName: "",
    price: "",
};
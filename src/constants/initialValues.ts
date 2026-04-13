import type { BookingFormData, ReportFilters } from "../types/bookings";

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

//form data to booking service & package
export const formDataInitialValues: BookingFormData = {
    userDetails:{
        user_id : 0,
        name: '' 
    },
    phoneNumber: '',
    address: {
        createtime : '',
        latitude : '',
        location : '',
        longitude : '',
    },
    vehicle: '',
    vehicles: [],
    bookingDate: '',
    bookingTime: '',
    mainPackage : {
        id: 0,
        user_id: 0,
        package_id: 0,
        status: '',
        payment_method: '',
        wallet_amount: 0,
        total_used: null,
        total_price: 0,
        remind_used: null,
        available_from: '',
        available_to: '',
        delete_flag: '',
        vehicle_id: null,
        created_at: '',
        updated_at: '',
        package: {
            delete_flag : '' ,
            description : '' ,
            description_ar : '' ,
            extra_services_count : 0 ,
            id : 0 ,
            main_services_count : 0 ,
            name : '' ,
            name_ar : '' ,
            package_img : '' ,
            price : 0 ,
            schedule_interval : '' ,
            schedule_type : '' ,
            total_days : 0 ,
            total_used : 0 ,
        },
        all_main_services: [],
        all_extra_services: [],
    } ,
    userPackages: [],
    mainService: '' ,
    extraServices: [] ,
    serviceBoy: {
        user_id : 0 ,
        name : '' ,
    } ,
    userNote: '' ,
    adminNotes: '' ,
    coupon: {
        id: 0,
        code: '',
        amount: 0 ,
        discount_percent: 0,
        audience_type: 'all_users',
        max_users: 0,
        max_uses_per_user: 0 ,
        total_booking: 0,
        limit_to_hours: true ,
        services_mode: "all",
        services_text: '',
        start_at: '',
        end_at: '',
        start_hour: null,
        end_hour: null,
        created_at: '' ,
        created_at_formatted: '',
        group_ids: [],
        groups_names: null,
        user_ids: [],
        users_names: null,
        service_ids: [],
    } ,
    paymentMethod: '',
    walletAmount: '',
}

export const servicesStep1InitialValues = {
    phoneNumber: '',
    address: {
        createtime : '',
        latitude : '',
        location : '',
        longitude : '',
    },
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
    phoneNumber: '',
    category: '',
    make: '',
    model: '',
    color: '',
    plateNumber: '',
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

export const SendBroadcastInitialValues = {
  user: '',
  title: '',
  message: '',
  dateScheduleNotification: null,
  timeScheduleNotification: null,
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

export interface managePackageAddPackageFormValues {
    packageNameEnglish?: string;
    packageNameArabic?: string;
    packagePrice?: string;
    packageTotalDays?: string;
    [key: string]: any; 
}

export const manageUsersInitioalValue = {
    groupName : '',
    companyName : '',
    areaName : '',
    deviceType : '',
    registrationStart : '',
    registrationEnd : '',
}

export interface LoginFormInitialValues {
  email: string;
  password: string;
  remember : boolean
}
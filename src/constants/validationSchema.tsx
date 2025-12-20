import * as Yup from 'yup';

export const manageSlotSchema = Yup.object({
    startDate: Yup.string().required('Start date is required'),
    startTime: Yup.string().required('Start time is required'),
    endDate: Yup.string().required('End date is required'),
    endTime: Yup.string().required('End time is required'),
    city: Yup.string().required('City is required'),
    area: Yup.string().required('Area is required'),
    slotStatus: Yup.string().required('Slot status is required'),
    slotType: Yup.string().required('Slot type is required'),
});

export const servicesStep1Schema = Yup.object({
    phoneNumber: Yup.string()
        .matches(/^[0-9]{10,15}$/, 'Phone number must be 10-15 digits')
        .required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    vehicles: Yup.array().min(1, 'Please select at least one vehicle'),
    bookingDate: Yup.string().required('Booking date is required'),
    bookingTime: Yup.string().required('Booking time is required'),
});

export const servicesBookingSchema = Yup.object({
    mainService: Yup.string().required('Please select a service'),
    serviceBoy: Yup.string().required('Please select a service boy'),
});

export const packageBookingSchema = Yup.object({
    mainService: Yup.string().required('Please select a service'),
    mainPackage: Yup.string().required('Please select a package'),
    serviceBoy: Yup.string().required('Please select a service boy'),
});

export const servicesStep3Schema = Yup.object({
    paymentMethod: Yup.string().required('Please select a payment method'),
});

export const servicesStep4Schema = Yup.object({
    userNote: Yup.string(),
    adminNotes: Yup.string(),
});

export const userWalletSchema = Yup.object({
    user: Yup.string().required('the user is required'),
    amount: Yup.string().required('the amount is required'),
});

export const addCountrySchema = Yup.object({
    flag: Yup.mixed()
        .required("Flag is required")
        .test(
            "fileType",
            "Only .jpg, .png, .svg, .zip files are allowed",
            (value: any) => {
                if (!value) return false;

                const allowedTypes = [
                    "image/jpeg",
                    "image/png",
                    "image/svg+xml",
                    "application/zip",
                ];

                return allowedTypes.includes(value.type);
            }
        )
        .test(
            "fileSize",
            "File size must be less than 10MB",
            (value: any) => {
                if (!value) return false;
                return value.size <= 10 * 1024 * 1024;
            }
        ),

    name: Yup.string().required("The name is required"),
});

export const areaValidationSchema = (whoTap: string | undefined) =>
    Yup.object({
        country: Yup.string()
            .required("Country is required"),

        regions: Yup.string()
            .required("Regions is required"),

        area: Yup.array()
            .min(1, "Please draw an area on the map")
            .required("Area is required"),

        areaName: Yup.string()
            .required("Area name is required"),

        subAreaName: whoTap === "subArea"
            ? Yup.string().required("Sub area name is required")
            : Yup.string().notRequired(),
    }
    );


export const addRegionsSchema = Yup.object().shape({
    country: Yup.string()
        .required('Country is required')
        .min(2, 'Country must be at least 2 characters'),

    name: Yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters'),

    description: Yup.string()
        .required('Description is required')
        .min(5, 'Description must be at least 5 characters')
});


export const manageServiceValidationSchema = Yup.object({
    serviceNameEnglish: Yup.string()
        .required("Service Name (English) is required")
        .min(3, "Must be at least 3 characters"),

    serviceLabelEnglish: Yup.string()
        .required("Service Label (English) is required"),

    serviceNameArabic: Yup.string()
        .required("Service Name (Arabic) is required"),

    serviceLabelArabic: Yup.string()
        .required("Service Label (Arabic) is required"),

    servicePrice: Yup.number()
        .typeError("Price must be a number")
        .required("Service price is required")
        .min(1, "Price must be greater than 0"),

    serviceTime: Yup.number()
        .typeError("Time must be a number")
        .required("Service time is required")
        .min(1, "Time must be greater than 0"),

    serviceDiscount: Yup.number()
        .typeError("Discount must be a number")
        .min(0, "Minimum discount is 0")
        .max(100, "Maximum discount is 100")
        .required("Service discount is required"),

    engishServiceDescription: Yup.string()
        .required("English description is required")
        .min(10, "Description must be at least 10 characters"),

    arabicServiceDescription: Yup.string()
        .required("Arabic description is required")
        .min(10, "Description must be at least 10 characters"),

    Date: Yup.date()
        .required("Date is required"),

    Time: Yup.string()
        .required("Time is required"),
});


export const addExtraServiceValidationSchema = Yup.object({
    extraServiceNameEnglish: Yup.string()
        .required("Extra service name (English) is required")
        .min(3, "Minimum 3 characters"),

    extarServicePrice: Yup.number()
        .typeError("Price must be a number")
        .required("Price is required")
        .min(1, "Price must be greater than 0"),

    serviceNameArabic: Yup.string()
        .required("Extra service name (Arabic) is required")
        .min(3, "Minimum 3 characters"),

    extraServiceDiscount: Yup.number()
        .typeError("Discount must be a number")
        .min(0, "Minimum discount is 0")
        .max(100, "Maximum discount is 100")
        .required("Service discount is required"),

    extarServiceTime: Yup.number()
        .typeError("Time must be a number")
        .required("Extra service time is required")
        .min(1, "Time must be greater than 0"),

    englishServiceDescription: Yup.string()
        .required("English description is required")
        .min(10, "Minimum 10 characters"),

    extraArabicServiceDescription: Yup.string()
        .required("Arabic description is required")
        .min(10, "Minimum 10 characters"),

    Date: Yup.date()
        .required("Date is required"),

    Time: Yup.string()
        .required("Time is required"),
});

export const addSubAdminSchema = Yup.object({
    name: Yup.string().required('the name is required'),
    phoneNumber: Yup.string().matches(/^[0-9]{10,15}$/, 'Phone number must be 10-15 digits').required('Phone number is required'),
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email address'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[@$!%*?&]/, 'Password must contain at least one special character'),
    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password')], 'Passwords must match')
});

export const addVehicleSchema = Yup.object({
    user: Yup.string().required('the user is required'),
    category: Yup.string().required('the category is required'),
    make: Yup.string().required('the make is required'),
    model: Yup.string().required('the model is required'),
    color: Yup.string().required('the color is required'),
});

export const addServiceBoySchema = Yup.object({
    name: Yup.string().required('Name is required'),
    phoneNumber: Yup.string().matches(/^[0-9]{10,15}$/, 'Phone number must be 10-15 digits').required('Phone number is required'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    availableDays: Yup.array().min(1, 'Select at least one day').required('Available days are required'),
    startHour: Yup.string().required('Start hour is required'),
    endHour: Yup.string().required('End hour is required'),
    drivingLicense: Yup.mixed().required('Driving license is required'),
    licenseExpiredDate: Yup.string().required('License expired date is required'),
    idCardImage: Yup.mixed().nullable(),
});

export const addCouponValidationSchema = Yup.object({
    user: Yup.string().required("User is required"),

    couponAnount: Yup.number()
        .typeError("Amount must be a number")
        .positive("Amount must be positive")
        .required("Coupon amount is required"),

    couponCode: Yup.string()
        .min(3, "Coupon code must be at least 3 characters")
        .required("Coupon code is required"),

    discount: Yup.number()
        .typeError("Discount must be a number")
        .min(1, "Minimum discount is 1%")
        .max(100, "Maximum discount is 100%")
        .required("Discount is required"),

    services: Yup.string().required("Service is required"),

    startDate: Yup.date()
        .typeError("Start date is invalid")
        .required("Start date is required"),

    startTime: Yup.string()
        .required("Start time is required"),

    useCount: Yup.number()
        .typeError("Use count must be a number")
        .integer("Use count must be an integer")
        .min(1, "Minimum is 1")
        .required("Use count is required"),

    endDate: Yup.date()
        .typeError("End date is invalid")
        .min(
            Yup.ref("startDate"),
            "End date cannot be before start date"
        )
        .required("End date is required"),

    endTime: Yup.string()
        .required("End time is required"),
});


export const addProductValidationSchema = Yup.object({
    category: Yup.string()
        .required("Category is required"),

    englishName: Yup.string()
        .min(2, "English name must be at least 2 characters")
        .required("English name is required"),

    arabicName: Yup.string()
        .min(2, "Arabic name must be at least 2 characters")
        .required("Arabic name is required"),

    englishDescription: Yup.string()
        .min(5, "Description is too short")
        .required("English description is required"),

    arabicDescription: Yup.string()
        .min(5, "Description is too short")
        .required("Arabic description is required"),

    price: Yup.number()
        .typeError("Price must be a number")
        .positive("Price must be a positive number")
        .required("Price is required"),
});

export const addCategoryValidationSchema = Yup.object({
    englishName: Yup.string()
        .min(2, "English name must be at least 2 characters")
        .required("English name is required"),

    arabicName: Yup.string()
        .min(2, "Arabic name must be at least 2 characters")
        .required("Arabic name is required"),
});


// Schema to add new package with dynamic services
export const addPackageSchema = Yup.object().shape({
  packageNameEnglish: Yup.string().required("Package name in English is required"),
  packageNameArabic: Yup.string().required("Package name in Arabic is required"),
  packagePrice: Yup.number()
    .typeError("Package price must be a number")
    .required("Package price is required"),
  packageTotalDays: Yup.number()
    .typeError("Total days must be a number")
    .required("Package total days is required"),
  type: Yup.string().required("Type is required"),
  interval: Yup.string().required("Interval is required"),
  englishPackageDescription: Yup.string().required("English description is required"),
  arabicPackageDescription: Yup.string().required("Arabic description is required"),
});

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

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

    address: Yup.object().nullable().required('Address is required'),

    vehicles: Yup.array()
        .min(1, 'Please select at least one vehicle')
        .required(),

    bookingDate: Yup.string()
        .required('Booking date is required')
        .matches(
            /^\d{4}-\d{2}-\d{2}$/,
            'Date must be in yyyy-mm-dd format'
        )
        .test(
            'not-in-past',
            'Booking date cannot be earlier than today',
            (value) => {
                if (!value) return false;

                const selectedDate = new Date(value);
                const today = new Date();

                today.setHours(0, 0, 0, 0);
                selectedDate.setHours(0, 0, 0, 0);

                return selectedDate >= today;
            }
        ),

});


export const servicesBookingSchema = Yup.object({
    mainService: Yup.mixed().required('Please select a service'),
    serviceBoy: Yup.object().required('Please select a service boy'),
    bookingTime: Yup.string()
        .required('Please select a booking time')
        .matches(/^\d{2}:\d{2}:\d{2}$/, 'Time must be in HH:mm:ss format'),
});

export const packageBookingSchema = Yup.object({
    mainService: Yup.mixed().required('Please select a service'),
    mainPackage: Yup.object().required('Please select a package'),
    serviceBoy: Yup.object().required('Please select a service boy'),
    bookingTime: Yup.string()
        .required('Please select a booking time')
        .matches(/^\d{2}:\d{2}:\d{2}$/, 'Time must be in HH:mm:ss format'),
});

export const servicesStep3Schema = Yup.object({
    paymentMethod: Yup.string().required('Please select a payment method'),
});

export const servicesStep4Schema = Yup.object({
    userNote: Yup.string(),
    adminNotes: Yup.string(),
});

export const userWalletSchema = Yup.object({
    phone: Yup.string().required('Please enter phone number'),
    amount: Yup.string().required('Please enter amount'),
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
        .min(2, "Must be at least 2 characters")
        .max(50, "Must be at most 50 characters"),

    serviceLabelEnglish: Yup.string()
        .required("Service Label (English) is required")
        .min(6, "Must be at least 6 characters")
        .max(16, "Must be at most 16 characters"),

    serviceNameArabic: Yup.string()
        .required("Service Name (Arabic) is required")
        .min(2, "Must be at least 2 characters")
        .max(50, "Must be at most 50 characters"),

    serviceLabelArabic: Yup.string()
        .required("Service Label (Arabic) is required")
        .min(6, "Must be at least 6 characters")
        .max(16, "Must be at most 16 characters"),

    servicePrice: Yup.number()
        .typeError("Price must be a number")
        .required("Service price is required")
        .min(1, "Price must be greater than 0"),

    serviceTime: Yup.string()
        .required("Service time is required"),

    serviceDiscount: Yup.number()
        .typeError("Discount must be a number")
        .min(0, "Minimum discount is 0"),

    engishServiceDescription: Yup.string()
        .required("English description is required")
        .min(10, "Description must be at least 10 characters")
        .max(250, "Description must be at most 250 characters"),

    arabicServiceDescription: Yup.string()
        .required("Arabic description is required")
        .min(10, "Description must be at least 10 characters")
        .max(250, "Description must be at most 250 characters"),
});


export const addExtraServiceValidationSchema = Yup.object({
    extraServiceNameEnglish: Yup.string()
        .required("Extra service name (English) is required")
        .min(2, "Must be at least 2 characters")
        .max(50, "Must be at most 50 characters"),

    extarServicePrice: Yup.number()
        .typeError("Price must be a number")
        .required("Price is required")
        .min(0, "Price must be 0 or more"),

    serviceNameArabic: Yup.string()
        .required("Extra service name (Arabic) is required")
        .min(2, "Must be at least 2 characters")
        .max(50, "Must be at most 50 characters"),

    extraServiceDiscount: Yup.number()
        .typeError("Discount must be a number")
        .min(0, "Minimum discount is 0"),

    extarServiceTime: Yup.string()
        .required("Extra service time is required"),

    englishServiceDescription: Yup.string()
        .required("English description is required")
        .min(10, "Minimum 10 characters")
        .max(250, "Maximum 250 characters"),

    extraArabicServiceDescription: Yup.string()
        .required("Arabic description is required")
        .min(10, "Minimum 10 characters")
        .max(250, "Maximum 250 characters"),
});

export const addSubAdminSchema = Yup.object({
    name: Yup.string().required('the name is required'),
    phoneNumber: Yup.string().matches(/^[0-9]{10,15}$/, 'Phone number must be 10-15 digits').required('Phone number is required'),
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email address'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    image: Yup.mixed().nullable().notRequired()
});

export const editSubAdminSchema = Yup.object({
    name: Yup.string().required('the name is required'),
    phoneNumber: Yup.string().matches(/^[0-9]{10,15}$/, 'Phone number must be 10-15 digits').required('Phone number is required'),
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email address'),
    password: Yup.string()
        .notRequired()
        .default('')
        .test(
            'password-strength',
            'Password must be at least 8 characters with uppercase, lowercase, number, and special character (@$!%*?&)',
            (value) => {
                if (!value || value === '') return true;
                return value.length >= 8
                    && /[A-Z]/.test(value)
                    && /[a-z]/.test(value)
                    && /[0-9]/.test(value)
                    && /[@$!%*?&]/.test(value);
            }
        ),
    confirmPassword: Yup.string()
        .notRequired()
        .default('')
        .when('password', {
            is: (val: string) => val && val.length > 0,
            then: (schema) => schema
                .required('Confirm password is required when changing password')
                .oneOf([Yup.ref('password')], 'Passwords must match'),
        }),
    image: Yup.mixed().nullable().notRequired()
});

export const addVehicleSchema = Yup.object({
    phoneNumber: Yup.string()
        .matches(/^[0-9]{10,15}$/, 'Phone number must be 10-15 digits')
        .required('Phone number is required'),
    category: Yup.string().required('Category is required'),
    make: Yup.string().required('Make is required'),
    model: Yup.string().required('Model is required'),
    color: Yup.string().required('Color is required'),
    plateNumber: Yup.string().required('Plate number is required'),
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

export const editServiceBoySchema = Yup.object({
    name: Yup.string().required('Name is required'),
    phoneNumber: Yup.string().matches(/^[0-9]{10,15}$/, 'Phone number must be 10-15 digits').required('Phone number is required'),
    password: Yup.string()
        .nullable()
        .notRequired()
        .transform((value) => (value === '' ? null : value))
        .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
        .nullable()
        .notRequired()
        .transform((value) => (value === '' ? null : value))
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    availableDays: Yup.array().min(1, 'Select at least one day').required('Available days are required'),
    startHour: Yup.string().required('Start hour is required'),
    endHour: Yup.string().required('End hour is required'),
    drivingLicense: Yup.mixed().nullable().notRequired(),
    licenseExpiredDate: Yup.string().required('License expired date is required'),
    idCardImage: Yup.mixed().nullable(),
});

export const addSpecialServiceValidationSchema = Yup.object({
    nameEnglish: Yup.string()
        .required("Name (English) is required")
        .min(2, "Must be at least 2 characters")
        .max(255, "Must be at most 255 characters"),

    nameArabic: Yup.string()
        .required("Name (Arabic) is required")
        .min(2, "Must be at least 2 characters")
        .max(255, "Must be at most 255 characters"),

    price: Yup.number()
        .typeError("Price must be a number")
        .required("Price is required")
        .min(0, "Price must be 0 or more"),

    label: Yup.string()
        .max(100, "Must be at most 100 characters"),

    descriptionEnglish: Yup.string(),

    descriptionArabic: Yup.string(),
})

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
export const manageVatSchema = Yup.object({
    vat: Yup.number()
        .typeError("Vat must be a number")
        .min(1, "Minimum Vat is 1%")
        .max(100, "Maximum Vat is 100%")
        .required("Vat is required"),
});

export const manageDriverCommissionSchema = Yup.object({
    service: Yup.number()
    .typeError("service must be a number")
    .min(1, "Minimum service is 1%")
    .max(100, "Maximum service is 100%")
    .required("service is required"),
    
    extraService : Yup.number()
    .typeError("Extra Service must be a number")
    .min(1, "Minimum Extra Service is 1%")
    .max(100, "Maximum Extra Service is 100%")
    .required("Extra Service is required"),
});

export const manageBounusPointsSchema = Yup.object({
    bounusPoints: Yup.string()
        .required("Bonus point status is required"),
    bonusPercentage : Yup.number()
        .typeError("Vat must be a number")
        .min(1, "Minimum Vat is 1%")
        .max(100, "Maximum Vat is 100%")
        .required("Vat is required"),
});


export const validationMessageSchema = Yup.object({
  to: Yup.array()
    .of(
      Yup.string()
        .required("Recipient is required")
        .matches(/^@/, "Recipient must start with @")
    )
    .min(1, "At least one recipient is required"),

  subject: Yup.string()
    .trim()
    .required("Subject is required"),

  message: Yup.string()
    .trim()
    .required("Message is required"),

  images: Yup.array(),
});


export const SendBroadcastValidationSchema = Yup.object({
  user: Yup.string()
    .required('User is required'),

  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters'),

  message: Yup.string()
    .required('Message is required')
    .min(5, 'Message must be at least 5 characters'),

  dateScheduleNotification: Yup.date()
    .required('Date is required'),

  timeScheduleNotification: Yup.string()
    .required('Time is required'),
});

export const BroadcastAllUsersValidationSchema = Yup.object({
  all_user_title: Yup.string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters')
    .max(50, 'Title must be at most 50 characters'),
  all_user_message: Yup.string()
    .required('Message is required')
    .min(2, 'Message must be at least 2 characters')
    .max(250, 'Message must be at most 250 characters'),
  welcome_message: Yup.string(),
});

export const BroadcastSelectUsersValidationSchema = Yup.object({
  user_title: Yup.string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters')
    .max(50, 'Title must be at most 50 characters'),
  user_message: Yup.string()
    .required('Message is required')
    .min(2, 'Message must be at least 2 characters')
    .max(250, 'Message must be at most 250 characters'),
  search_user: Yup.array()
    .min(1, 'Select at least one user')
    .required('Users are required'),
});

export const BroadcastAllTemplesValidationSchema = Yup.object({
  all_temple_title: Yup.string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters')
    .max(50, 'Title must be at most 50 characters'),
  all_temple_message: Yup.string()
    .required('Message is required')
    .min(2, 'Message must be at least 2 characters')
    .max(250, 'Message must be at most 250 characters'),
});

export const BroadcastSelectTemplesValidationSchema = Yup.object({
  temple_title: Yup.string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters')
    .max(50, 'Title must be at most 50 characters'),
  temple_message: Yup.string()
    .required('Message is required')
    .min(2, 'Message must be at least 2 characters')
    .max(250, 'Message must be at most 250 characters'),
  search_temple: Yup.array()
    .min(1, 'Select at least one service boy')
    .required('Service boys are required'),
});

export const BroadcastGroupValidationSchema = Yup.object({
  temple_title: Yup.string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters')
    .max(50, 'Title must be at most 50 characters'),
  temple_message: Yup.string()
    .required('Message is required')
    .min(2, 'Message must be at least 2 characters')
    .max(250, 'Message must be at most 250 characters'),
  search_group: Yup.string()
    .required('Group is required'),
});

export const AddFqsValidationSchema = Yup.object({
  englishQuestion: Yup.string()
    .trim()
    .required("English question is required")
    .min(5, "English question must be at least 5 characters")
    .max(500, "English question must not exceed 500 characters"),

  englishAnswar: Yup.string()
    .trim()
    .required("English answer is required")
    .min(5, "English answer must be at least 5 characters")
    .max(1000, "English answer must not exceed 1000 characters"),

  arabicQuestion: Yup.string()
    .trim()
    .required("السؤال بالعربية مطلوب")
    .min(5, "السؤال بالعربية يجب ألا يقل عن 5 حروف")
    .max(500, "السؤال بالعربية يجب ألا يزيد عن 500 حرف"),

  arabicAnswar: Yup.string()
    .trim()
    .required("الإجابة بالعربية مطلوبة")
    .min(5, "الإجابة بالعربية يجب ألا تقل عن 5 حروف")
    .max(1000, "الإجابة بالعربية يجب ألا تزيد عن 1000 حرف"),
});

export const AddOrdersQuestionsSchema = Yup.object({
  questionEnglish: Yup.string()
    .trim()
    .required("English question is required")
    .min(5, "English question must be at least 5 characters")
    .max(500, "English question must not exceed 500 characters"),

  questionArabic: Yup.string()
    .trim()
    .required("السؤال بالعربية مطلوب")
    .min(5, "السؤال بالعربية يجب ألا يقل عن 5 حروف")
    .max(500, "السؤال بالعربية يجب ألا يزيد عن 500 حرف"),
});


export const LoginFormValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export const addCompanyValidationSchema = Yup.object({
    name: Yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters")
        .max(150, "Name must not exceed 150 characters"),
    email_extension: Yup.string()
        .nullable()
        .min(3, "Email extension must be at least 3 characters")
        .max(150, "Email extension must not exceed 150 characters"),
    code: Yup.string()
        .required("Code is required")
        .min(3, "Code must be at least 3 characters")
        .max(150, "Code must not exceed 150 characters"),
    num_of_users: Yup.number()
        .typeError("Number of users must be a number")
        .required("Number of users is required")
        .min(1, "Minimum is 1")
        .max(100, "Maximum is 100"),
    percentage: Yup.number()
        .typeError("Percentage must be a number")
        .required("Percentage is required")
        .min(1, "Minimum is 1%")
        .max(100, "Maximum is 100%"),
    company_benefit_percentage: Yup.number()
        .typeError("Company benefit percentage must be a number")
        .required("Company benefit percentage is required")
        .min(1, "Minimum is 1%")
        .max(100, "Maximum is 100%"),
    apply_on_services: Yup.string().nullable(),
    apply_on_extra_services: Yup.string().nullable(),
    start_date: Yup.string()
        .required("Start date is required")
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in Y-m-d format"),
    end_date: Yup.string()
        .required("End date is required")
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in Y-m-d format"),
    services_ids: Yup.array().of(Yup.number()).nullable(),
    extra_services_ids: Yup.array().of(Yup.number()).nullable(),
});
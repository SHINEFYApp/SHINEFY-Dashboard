/**
 * Maps privilege IDs (from API /api/get/sub/admin/privileges) to route paths.
 * Used by Sidebar filtering and route PermissionGuard.
 */

// Privilege ID constants for readability
export const PRIVILEGES = {
    DASHBOARD: 1,
    MANAGE_USERS: 2,
    MANAGE_SUB_ADMIN: 3,
    MANAGE_SERVICE_BOY: 4,
    MANAGE_GROUP: 5,
    MANAGE_BOOKING: 6,
    MANAGE_WAITING_BOOKING: 7,
    MANAGE_CAR_OPTIONS: 8,
    MANAGE_VAT: 9,
    MANAGE_SERVICE: 10,
    MANAGE_EXTRA_SERVICE: 11,
    MANAGE_AREA: 12,
    MANAGE_COUPON: 13,
    MANAGE_FAQS: 14,
    CONTACT_US: 15,
    BROADCAST: 16,
    MANAGE_CONTENT: 17,
    TABULAR_REPORTS: 18,
    ANALYTICAL_REPORTS: 19,
    MANAGE_SLOT: 20,
    MANAGE_TODAY_BOOKING: 21,
    MANAGE_EARNING: 22,
    MANAGE_USER_WALLET: 23,
    DRIVER_COMMISSION: 24,
    MANAGE_BONUS_POINT: 25,
    MANAGE_ORDER_QUESTION: 26,
    MANAGE_CREATE_BOOKING: 27,
    EDIT_SETTING: 28,
    MANAGE_PACKAGES: 29,
    PACKAGES_SUBSCRIPTION: 30,
    AD_SECTION: 31,
    LOYAL_CLIENT_REPORTS: 32,
    CREATE_VEHICLE: 33,
    MANAGE_COUNTRIES: 34,
    MANAGE_REGIONS: 35,
    USERS_NEGATIVE_WALLETS: 36,
    MANAGE_COMPANIES: 37,
    MANAGE_CITY_AREA: 38,
} as const;

/**
 * Maps route path prefixes to required privilege IDs.
 * A route matches if the current path starts with the key.
 * More specific paths should come first.
 */
export const ROUTE_PERMISSIONS: Record<string, number> = {
    // Dashboard
    "/": PRIVILEGES.DASHBOARD,

    // Bookings
    "/bookings/create": PRIVILEGES.MANAGE_CREATE_BOOKING,
    "/bookings/manage": PRIVILEGES.MANAGE_BOOKING,
    "/bookings/slot": PRIVILEGES.MANAGE_SLOT,

    // Vehicles
    "/vehicles/add": PRIVILEGES.CREATE_VEHICLE,
    "/vehicles/manage": PRIVILEGES.MANAGE_CAR_OPTIONS,

    // Users & Staff
    "/users&staff/manage/users": PRIVILEGES.MANAGE_USERS,
    "/users&staff/manage/subAdmin": PRIVILEGES.MANAGE_SUB_ADMIN,
    "/users&staff/manage/serviceBoy": PRIVILEGES.MANAGE_SERVICE_BOY,
    "/users&staff/manage/usersWallet": PRIVILEGES.MANAGE_USER_WALLET,

    // Geography & Regions
    "/geography&regions/manage/countries": PRIVILEGES.MANAGE_COUNTRIES,
    "/geography&regions/manage/regions": PRIVILEGES.MANAGE_REGIONS,
    "/geography&regions/manage/area": PRIVILEGES.MANAGE_AREA,

    // Services & Extra
    "/services&extra/manage/Service": PRIVILEGES.MANAGE_SERVICE,
    "/services&extra/manage/ExtreService": PRIVILEGES.MANAGE_EXTRA_SERVICE,
    "/services&extra/manage/coupon": PRIVILEGES.MANAGE_COUPON,
    "/services&extra/manage/package": PRIVILEGES.MANAGE_PACKAGES,
    "/services&extra/manage/Package": PRIVILEGES.MANAGE_PACKAGES,

    // Products & Orders (no specific privilege in API - will be visible to all)
    // "/products&orders/manage/Products": ???,
    // "/products&orders/manage/Orders": ???,

    // Financial & Points
    "/financial&points/manage/Vat": PRIVILEGES.MANAGE_VAT,
    "/financial&points/manage/driverCommission": PRIVILEGES.DRIVER_COMMISSION,
    "/financial&points/manage/bonusPoint": PRIVILEGES.MANAGE_BONUS_POINT,
    "/financial&points/manage/adminEarning": PRIVILEGES.MANAGE_EARNING,

    // Technical Support
    "/technicalSupport/contactUs": PRIVILEGES.CONTACT_US,
    "/technicalSupport/manage/companies": PRIVILEGES.MANAGE_COMPANIES,
    "/technicalSupport/broadcast": PRIVILEGES.BROADCAST,
    "/technicalSupport/manage/faqs": PRIVILEGES.MANAGE_FAQS,
    "/technicalSupport/manage/orderQuestions": PRIVILEGES.MANAGE_ORDER_QUESTION,
};

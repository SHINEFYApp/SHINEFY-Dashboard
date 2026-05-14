import { getService, postService, putService, patchService, deleteService } from "../service/service-requests";

// ---- Interfaces ----
export interface CompoundItem {
    id: number;
    code: string;
    name_en: string;
    name_ar: string;
    city: string;
    address: string;
    area_vertices: { lat: number; lng: number }[];
    area_set: boolean;
    created_at: string;
}

export interface PackageItem {
    id: number;
    name_en: string;
    name_ar: string;
    price: number;
    period_days: number;
    description_en?: string;
    description_ar?: string;
    created_at: string;
    compounds?: { id: number; name: string }[];
    main_services_count?: number;
    extra_services_count?: number;
    special_services_count?: number;
}

export interface SubscriptionItem {
    id: number;
    user: { id: number; name: string; phone: string };
    compound: { id: number; name: string };
    package: { id: number; name: string };
    start_date: string;
    end_date: string;
    status: string;
    frequency: number;
    shift: string;
    main_remaining: number;
    extra_remaining: number;
    special_remaining: number;
    total_price: number;
    amount_paid: number;
    payment_method: number;
    created_at: string;
}

export interface BookingItem {
    id: number;
    subscription_id: number;
    user: { id: number; name: string };
    compound: { id: number; name: string };
    service_type: string;
    scheduled_date: string;
    period: string;
    status: string;
    service_boy?: { id: number; name: string };
    car_ids: number[];
    address: string;
}

export interface PaginationInfo {
    current_page: number;
    total_pages: number;
    total_items: number;
    per_page: number;
}

// ---- Compounds ----
export const getCompounds = async (params?: any) => {
    return await getService("/api/admin/compounds", params);
};

export const getCompound = async (id: number) => {
    return await getService(`/api/admin/compounds/${id}`);
};

export const createCompound = async (data: any) => {
    return await postService("/api/admin/compounds", data);
};

export const updateCompound = async (id: number, data: any) => {
    return await putService(`/api/admin/compounds/${id}`, data);
};

export const deleteCompound = async (id: number) => {
    return await deleteService(`/api/admin/compounds/${id}`);
};

// ---- Packages ----
export const getPackages = async (params?: any) => {
    return await getService("/api/admin/compounds/packages", params);
};

export const getPackage = async (id: number) => {
    return await getService(`/api/admin/compounds/packages/${id}`);
};

export const createPackage = async (data: any) => {
    return await postService("/api/admin/compounds/packages", data);
};

export const updatePackage = async (id: number, data: any) => {
    return await putService(`/api/admin/compounds/packages/${id}`, data);
};

export const deletePackage = async (id: number) => {
    return await deleteService(`/api/admin/compounds/packages/${id}`);
};

// ---- Subscriptions ----
export const getSubscriptions = async (params?: any) => {
    return await getService("/api/admin/compounds/subscriptions", params);
};

export const getSubscription = async (id: number) => {
    return await getService(`/api/admin/compounds/subscriptions/${id}`);
};

export const createSubscription = async (data: any) => {
    return await postService("/api/admin/compounds/subscriptions", data);
};

export const updateSubscriptionBalances = async (id: number, data: any) => {
    return await putService(`/api/admin/compounds/subscriptions/${id}/balances`, data);
};

export const updateSubscriptionStatus = async (id: number, data: any) => {
    return await patchService(`/api/admin/compounds/subscriptions/${id}/status`, data);
};

export const deleteSubscription = async (id: number) => {
    return await deleteService(`/api/admin/compounds/subscriptions/${id}`);
};

export const getSubscriptionBookings = async (id: number) => {
    return await getService(`/api/admin/compounds/subscriptions/${id}/bookings`);
};

// ---- Bookings ----
export const getBookings = async (params?: any) => {
    return await getService("/api/admin/compounds/bookings", params);
};

export const getBooking = async (id: number) => {
    return await getService(`/api/admin/compounds/bookings/${id}`);
};

export const updateBooking = async (id: number, data: any) => {
    return await putService(`/api/admin/compounds/bookings/${id}`, data);
};

export const bulkAssignServiceBoy = async (data: any) => {
    return await postService("/api/admin/compounds/bookings/bulk-assign", data);
};

// ---- Dashboard ----
export const getTodaySummary = async () => {
    return await getService("/api/admin/compounds/today-summary");
};

// ---- Ajax Lookups ----
export const getUserCars = async (userId: number) => {
    return await getService(`/api/admin/compounds/ajax/user-cars/${userId}`);
};

export const getUserLocations = async (userId: number) => {
    return await getService(`/api/admin/compounds/ajax/user-locations/${userId}`);
};

export const getCompoundPackages = async (compoundId: number) => {
    return await getService(`/api/admin/compounds/ajax/compound-packages/${compoundId}`);
};

// ---- Schedule Preview ----
export const previewSchedule = async (data: any) => {
    return await postService("/api/admin/compounds/preview-schedule", data);
};

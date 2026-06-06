// src/api/features/serviceBoys.ts
import type { AxiosResponse } from "axios";
import {
    getService,
    postService,
    putService,
    deleteService,
    patchService,
} from "../service/service-requests";

// Interfaces

export interface ServiceBoyItem {
    user_id: number;
    name: string;
    image_url: string;
    phone_number: string;
    phone_number_display: string;
    address?: string; // Not in list response, but maybe in details
    registered_at: string;
    status: string;
    active_flag: number;
    work_status: number;
    // Details might have more
    licence_expiery_date?: string;
    available_days?: string[];
    start_hour?: string;
    end_hour?: string;
    id_card_image?: string;
    driver_licence?: string;
}

export interface GetServiceBoysParams {
    limit?: number;
    start?: number;
    search?: string;
    active_flag?: 0 | 1;
    date_from?: string;
    date_to?: string;
}

export interface AddServiceBoyPayload {
    name: string;
    phone_number: string;
    address: string;
    licence_expiery_date: string;
    available_days: string[];
    start_hour: string;
    end_hour: string;
    latitude: string;
    longitude: string;
    password?: string;
}

export type UpdateServiceBoyPayload = Partial<AddServiceBoyPayload>;

export interface UpdateServiceBoyAreasPayload {
    service_boy_areas: number[];
}

export interface SetTemporaryOffPayload {
    date_from: string;
    date_to: string;
}

export interface UpdateStatusPayload {
    active_flag: number;
}

export interface ServiceBoyCoordinate {
    latitude: string;
    longitude: string;
    created_at: string;
}

export interface ServiceBoyTrackResponse {
    status: string;
    data: {
        user_id: number;
        name: string;
        phone_number: number;
        coordinates: ServiceBoyCoordinate[];
    }
}

export interface ServiceBoyAreasResponse {
    status: string;
    data: {
        user_id: number;
        areas: {
            area_id: number;
            area_name: string;
        }[];
    }
}

export interface ServiceBoyBookingsResponse {
    status: string;
    data: {
        data: {
            booking_id: number;
            booking_no: string;
            user_id: number;
            name: string;
            customer_name: string;
            service_name: string;
            total_price: string;
            booking_date: string;
            booking_time: string;
            createtime: string;
            status: number;
        }[];
        pagination: {
            page: number;
            per_page: number;
            total: number;
            last_page: number;
            from: number;
            to: number;
        }
    }
}

// Endpoints

// GET /service-boys
export const getServiceBoys = async (params: GetServiceBoysParams) => {
    return await getService("/api/service-boys", params);
};

// GET /service-boys/{id}
export const getServiceBoyDetails = async (id: number | string) => {
    return await getService(`/api/service-boys/${id}`);
};

// POST /service-boys (FormData - includes images)
export const addServiceBoy = async (formData: FormData) => {
    return await postService("/api/service-boys", formData);
};

// POST /service-boys/{id} (FormData - includes images)
// Note: Using POST + _method=PUT because PHP can't parse multipart/form-data with PUT method
export const updateServiceBoy = async (id: number | string, formData: FormData) => {
    formData.append('_method', 'PUT');
    return await postService(`/api/service-boys/${id}`, formData);
};

// DELETE /service-boys/{id}
export const deleteServiceBoy = async (id: number | string) => {
    return await deleteService(`/api/service-boys/${id}`);
};

// PATCH /service-boys/{id}/status
export const updateServiceBoyStatus = async (id: number | string, data: UpdateStatusPayload) => {
    return await patchService(`/api/service-boys/${id}/status`, data);
};


// GET /service-boys/{id}/areas
export const getServiceBoyAreas = async (id: number | string): Promise<AxiosResponse<ServiceBoyAreasResponse>> => {
    return await getService(`/api/service-boys/${id}/areas`);
};

// PUT /service-boys/{id}/areas
export const updateServiceBoyAreas = async (id: number | string, data: UpdateServiceBoyAreasPayload) => {
    return await putService(`/api/service-boys/${id}/areas`, data);
};

// POST /service-boys/{id}/temporary-off
export const setServiceBoyTemporaryOff = async (id: number | string, data: SetTemporaryOffPayload) => {
    return await postService(`/api/service-boys/${id}/temporary-off`, data);
};

// Export - using query params pattern as observed in Wallets
// GET /export/service-boys/csv
export const exportServiceBoysCsv = async (params: any) => {
    return await getService("/api/export/service-boys/csv", { params, responseType: "blob" });
};

// GET /export/service-boys/excel
export const exportServiceBoysExcel = async (params: any) => {
    return await getService("/api/export/service-boys/excel", { params, responseType: "blob" });
};

// GET /export/service-boys/pdf
export const exportServiceBoysPdf = async (params: any) => {
    return await getService("/api/export/service-boys/pdf", { params, responseType: "blob" });
};

// GET /service-boys/{id}/track
export const getServiceBoyTrack = async (id: number | string): Promise<AxiosResponse<ServiceBoyTrackResponse>> => {
    return await getService(`/api/service-boys/${id}/track`);
};

// GET /service-boys/{id}/bookings
export const getServiceBoyBookings = async (id: number | string, params?: any): Promise<AxiosResponse<ServiceBoyBookingsResponse>> => {
    return await getService(`/api/service-boys/${id}/bookings`, params);
};

/* ─── Daily Report ─── */

export interface DailyReportCommissionBooking {
    booking_id: number;
    position: number;
    commission: number;
    vehicle_count: number;
    "main_service_20%": number;
    "extra_service_20%": number;
    date?: string;
    note?: string;
}

export interface DailyReportCommission {
    total_commission: number;
    commissionable_bookings_count: number;
    bookings: DailyReportCommissionBooking[];
}

export interface DailyReportPaymentBreakdown {
    cash: { count: number; amount: number };
    credit: { count: number; amount: number };
    package: { count: number; amount: number };
}

export interface DailyReportData {
    service_boy_id: number;
    service_boy_name: string;
    date_from: string;
    date_to: string;
    completed_bookings_count: number;
    average_rating: number | null;
    available_slots: number;
    total_km: number;
    average_km: number;
    payment_breakdown: DailyReportPaymentBreakdown;
    commission: DailyReportCommission;
}

export interface ServiceBoyDailyReportResponse {
    status: string;
    data: DailyReportData;
}

// GET /service-boys/{id}/daily-report?date_from=YYYY-MM-DD&date_to=YYYY-MM-DD
export const getServiceBoyDailyReport = async (id: number | string, dateFrom?: string, dateTo?: string): Promise<AxiosResponse<ServiceBoyDailyReportResponse>> => {
    const params: any = {};
    if (dateFrom) params.date_from = dateFrom;
    if (dateTo) params.date_to = dateTo;
    return await getService(`/api/service-boys/${id}/daily-report`, params);
};

// GET /api/dashboard/service-boys-with-bookings
export interface TodayBooking {
    booking_id: number;
    booking_no: number;
    booking_date: string;
    booking_time: string;
    booking_type: number;
    status: number | string;
    total_price: string;
    customer_name: string;
    service_name: string;
    payment_option: string;
    subarea: string;
}

export interface ServiceBoyWithBookings {
    service_boy: {
        user_id: number;
        name: string;
        image_url: string;
        phone_number: string;
        status: string;
        active_flag: number;
    };
    today_bookings: TodayBooking[];
    total_bookings_today: number;
}

export interface ServiceBoysWithBookingsResponse {
    status: string;
    data: {
        service_boys: ServiceBoyWithBookings[];
        pagination: {
            current_page: number;
            total_pages: number;
            total_items: number;
            limit: number;
        };
    };
}

export interface GetServiceBoysWithBookingsParams {
    booking_date?: string;
    page?: number;
    limit?: number;
    search?: string;
    order?: 'asc' | 'desc';
}

export const getServiceBoysWithBookings = async (params: GetServiceBoysWithBookingsParams): Promise<AxiosResponse<ServiceBoysWithBookingsResponse>> => {
    return await getService("/api/dashboard/service-boys-with-bookings", params);
};

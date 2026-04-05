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
    page?: number;
    search?: string;
    work_status?: string;
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

export interface UpdateServiceBoyPayload extends Partial<AddServiceBoyPayload> { }

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

export interface ServiceBoyTrackResponse {
    status: string;
    data: {
        user_id: number;
        name: string;
        phone_number: number;
        latitude: string;
        longitude: string;
        created_at: string;
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
export const updateServiceBoy = async (id: number | string, formData: FormData) => {
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
    return await getService("/api/export/service-boys/csv", params);
};

// GET /export/service-boys/excel
export const exportServiceBoysExcel = async (params: any) => {
    return await getService("/api/export/service-boys/excel", params);
};

// GET /export/service-boys/pdf
export const exportServiceBoysPdf = async (params: any) => {
    return await getService("/api/export/service-boys/pdf", params);
};

// GET /service-boys/{id}/track
export const getServiceBoyTrack = async (id: number | string): Promise<AxiosResponse<ServiceBoyTrackResponse>> => {
    return await getService(`/api/service-boys/${id}/track`);
};

// GET /service-boys/{id}/bookings
export const getServiceBoyBookings = async (id: number | string, params?: any): Promise<AxiosResponse<ServiceBoyBookingsResponse>> => {
    return await getService(`/api/service-boys/${id}/bookings`, params);
};

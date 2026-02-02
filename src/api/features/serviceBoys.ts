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

// Endpoints

// GET /service-boys
export const getServiceBoys = async (params: GetServiceBoysParams) => {
    return await getService("/api/service-boys", params);
};

// GET /service-boys/{id}
export const getServiceBoyDetails = async (id: number | string) => {
    return await getService(`/api/service-boys/${id}`);
};

// POST /service-boys
export const addServiceBoy = async (data: AddServiceBoyPayload) => {
    return await postService("/api/service-boys", data);
};

// PUT /service-boys/{id}
export const updateServiceBoy = async (id: number | string, data: UpdateServiceBoyPayload) => {
    return await putService(`/api/service-boys/${id}`, data);
};

// DELETE /service-boys/{id}
export const deleteServiceBoy = async (id: number | string) => {
    return await deleteService(`/api/service-boys/${id}`);
};

// PATCH /service-boys/{id}/status
export const updateServiceBoyStatus = async (id: number | string, data: UpdateStatusPayload) => {
    return await patchService(`/api/service-boys/${id}/status`, data);
};

// POST /service-boys/{id}/images (FormData)
export const uploadServiceBoyImages = async (id: number | string, formData: FormData) => {
    // Helper typically handles JSON, for FormData we might need ensuring correct headers if not auto-detected
    // but usually axios handles FormData correctly if passed directly.
    return await postService(`/api/service-boys/${id}/images`, formData);
};

// GET /service-boys/{id}/areas
export const getServiceBoyAreas = async (id: number | string) => {
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

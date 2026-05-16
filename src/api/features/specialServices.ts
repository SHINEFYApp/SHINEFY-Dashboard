import type { AxiosResponse } from "axios";
import {
    getService,
    postService,
    deleteService,
} from "../service/service-requests";
import api from "../service/axios";

export interface AddSpecialServicePayload {
    name_en: string;
    name_ar: string;
    price: number;
    description_en?: string;
    description_ar?: string;
    label?: string;
    photo?: File | null;
}

export interface SpecialServiceItem {
    id: number;
    name_en: string;
    name_ar: string;
    price: string;
    description_en: string | null;
    description_ar: string | null;
    label: string | null;
    photo_url: string | null;
    created_at: string;
    updated_at: string;
}

export interface GetSpecialServicesPagination {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

export interface GetSpecialServicesResponse {
    status: string;
    data: {
        services: SpecialServiceItem[];
        pagination: GetSpecialServicesPagination;
    };
}

export interface GetSpecialServicesParams {
    per_page?: number;
    page?: number;
    search?: string;
}

export const getSpecialServices = async (params: GetSpecialServicesParams) => {
    const res: AxiosResponse = await getService("/api/services/special", params);
    return res.data;
};

export const getSpecialServiceDetails = async (id: number | string) => {
    const res: AxiosResponse = await getService(`/api/services/special/${id}`);
    return res.data;
};

export const addSpecialService = async (data: FormData) => {
    const res: AxiosResponse = await postService("/api/services/special", data);
    return res.data;
};

export const updateSpecialService = async (id: number | string, data: FormData) => {
    const res: AxiosResponse = await api.post(`/api/services/special/${id}`, data, {
        headers: { "X-HTTP-Method-Override": "PUT" },
    });
    return res.data;
};

export const deleteSpecialServiceItem = async (id: number | string) => {
    const res: AxiosResponse = await deleteService(`/api/services/special/${id}`);
    return res.data;
};

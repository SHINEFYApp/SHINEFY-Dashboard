import type { AxiosResponse } from "axios";
import {
    getService,
    postService,
    deleteService,
} from "../service/service-requests";
import api from "../service/axios";

export interface AddExtraServicePayload {
    servicename: string;
    servicedescription: string;
    servicenamearabic: string;
    servicedescriptionarabic: string;
    serviceprice: number;
    extra_service_discount?: number;
    servicetime: string;
    image?: File | null;
}

export interface EditExtraServicePayload extends AddExtraServicePayload {}

export interface ExtraServiceItem {
    extra_service_id: number;
    extra_service_name: string;
    extra_service_name_arabic: string;
    extra_service_description: string;
    extra_service_description_arabic: string;
    extra_service_price: string;
    extra_service_price_before_discount: number;
    extra_service_discount: number;
    extra_service_time: number;
    extra_service_image: string;
    created_at: string;
    updated_at: string;
}

export interface GetExtraServicesPagination {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

export interface GetExtraServicesResponse {
    status: string;
    data: {
        services: ExtraServiceItem[];
        pagination: GetExtraServicesPagination;
    };
}

export interface GetExtraServicesParams {
    start?: number;
    length?: number;
    search?: string;
}

export const getExtraServices = async (params: GetExtraServicesParams) => {
    const res: AxiosResponse = await getService("/api/services/extra", params);
    return res.data;
};

export const getExtraServiceDetails = async (id: number | string) => {
    const res: AxiosResponse = await getService(`/api/services/extra/${id}`);
    return res.data;
};

export const addExtraService = async (data: FormData) => {
    const res: AxiosResponse = await postService("/api/services/extra", data);
    return res.data;
};

export const updateExtraService = async (id: number | string, data: FormData) => {
    const res: AxiosResponse = await api.post(`/api/services/extra/${id}`, data, {
        headers: { "X-HTTP-Method-Override": "PUT" },
    });
    return res.data;
};

export const deleteExtraServiceItem = async (id: number | string) => {
    const res: AxiosResponse = await deleteService(`/api/services/extra/${id}`);
    return res.data;
};

export const reorderExtraServices = async (orders: { id: number; sort_order: number }[]) => {
    const res: AxiosResponse = await postService("/api/services/extra/reorder", { orders });
    return res.data;
};

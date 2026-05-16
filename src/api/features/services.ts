import type { AxiosResponse } from "axios";
import {
    getService,
    postService,
    deleteService,
} from "../service/service-requests";
import api from "../service/axios";

export interface AddServicePayload {
    servicename: string;
    servicelabel: string;
    servicedescription: string;
    servicenamearabic: string;
    servicelabelarabic: string;
    servicedescriptionarabic: string;
    serviceprice: number;
    service_discount?: number;
    servicetime: string;
    image?: File | null;
    apply_add_extra_service?: string;
}

export interface EditServicePayload extends AddServicePayload {}

export interface ServiceItem {
    service_id: number;
    service_name: string;
    service_name_arabic: string;
    service_label: string;
    service_label_arabic: string;
    service_description: string;
    service_description_arabic: string;
    service_price: string;
    service_price_before_discount: number;
    service_discount: number;
    service_time: number;
    service_image: string;
    apply_add_extra_service: boolean;
    created_at: string;
    updated_at: string;
}

export interface GetServicesPagination {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

export interface GetServicesResponse {
    status: string;
    data: {
        services: ServiceItem[];
        pagination: GetServicesPagination;
    };
}

export interface GetServicesParams {
    start?: number;
    length?: number;
    search?: string;
}

export const getServices = async (params: GetServicesParams) => {
    const res: AxiosResponse = await getService("/api/services/main", params);
    return res.data;
};

export const getServiceDetails = async (id: number | string) => {
    const res: AxiosResponse = await getService(`/api/services/main/${id}`);
    return res.data;
};

export const addService = async (data: FormData) => {
    const res: AxiosResponse = await postService("/api/services/main", data);
    return res.data;
};

export const updateService = async (id: number | string, data: FormData) => {
    const res: AxiosResponse = await api.post(`/api/services/main/${id}`, data, {
        headers: { "X-HTTP-Method-Override": "PUT" },
    });
    return res.data;
};

export const deleteServiceItem = async (id: number | string) => {
    const res: AxiosResponse = await deleteService(`/api/services/main/${id}`);
    return res.data;
};

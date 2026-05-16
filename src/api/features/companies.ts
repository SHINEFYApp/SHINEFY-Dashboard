import type { AxiosResponse } from "axios";
import { getService, postService, putService, deleteService } from "../service/service-requests";
import type {
    CompanyListResponse,
    CompanyDetailResponse,
    CompanyMutationResponse,
    CompanyChartResponse,
} from "../../types/companies";

export const getCompanies = async (params?: any) => {
    const res: AxiosResponse<CompanyListResponse> = await getService("/api/companies", params);
    return res.data;
};

export const getCompany = async (id: number, params?: any) => {
    const res: AxiosResponse<CompanyDetailResponse> = await getService(`/api/companies/${id}`, params);
    return res.data;
};

export const createCompany = async (data: any) => {
    const res: AxiosResponse<CompanyMutationResponse> = await postService("/api/companies", data);
    return res.data;
};

export const updateCompany = async (id: number, data: any) => {
    const res: AxiosResponse<CompanyMutationResponse> = await putService(`/api/companies/${id}`, data);
    return res.data;
};

export const deleteCompany = async (id: number) => {
    const res: AxiosResponse<CompanyMutationResponse> = await deleteService(`/api/companies/${id}`);
    return res.data;
};

export const getCompanyBookingsChart = async (id: number, params?: any) => {
    const res: AxiosResponse<CompanyChartResponse> = await getService(`/api/companies/${id}/bookings-chart`, params);
    return res.data;
};

export const getCompanyUsersChart = async (id: number, params?: any) => {
    const res: AxiosResponse<CompanyChartResponse> = await getService(`/api/companies/${id}/users-chart`, params);
    return res.data;
};

export const exportCompanies = async (type: "csv" | "excel" | "pdf", params?: any) => {
    const res: AxiosResponse = await getService(`/api/companies/export/${type}`, {
        params,
        responseType: "blob",
    });
    return res.data;
};

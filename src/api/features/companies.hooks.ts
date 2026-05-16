import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
    getCompanies,
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany,
    getCompanyBookingsChart,
    getCompanyUsersChart,
} from "./companies";
import type {
    CompanyListResponse,
    CompanyDetailResponse,
    CompanyMutationResponse,
    CompanyChartResponse,
} from "../../types/companies";

export const companiesKeys = {
    all: ["companies"] as const,
    list: (params?: any) => [...companiesKeys.all, "list", params] as const,
    detail: (id: number, params?: any) => [...companiesKeys.all, "detail", id, params] as const,
    bookingsChart: (id: number, params?: any) => [...companiesKeys.all, "bookings-chart", id, params] as const,
    usersChart: (id: number, params?: any) => [...companiesKeys.all, "users-chart", id, params] as const,
};

export const useGetCompanies = (params?: any, options?: any) => {
    return useQuery<CompanyListResponse, AxiosError>({
        queryKey: companiesKeys.list(params),
        queryFn: () => getCompanies(params),
        ...options,
    });
};

export const useGetCompany = (id: number, params?: any, options?: any) => {
    return useQuery<CompanyDetailResponse, AxiosError>({
        queryKey: companiesKeys.detail(id, params),
        queryFn: () => getCompany(id, params),
        enabled: !!id,
        ...options,
    });
};

export const useGetCompanyBookingsChart = (id: number, params?: any, options?: any) => {
    return useQuery<CompanyChartResponse, AxiosError>({
        queryKey: companiesKeys.bookingsChart(id, params),
        queryFn: () => getCompanyBookingsChart(id, params),
        enabled: !!id,
        ...options,
    });
};

export const useGetCompanyUsersChart = (id: number, params?: any, options?: any) => {
    return useQuery<CompanyChartResponse, AxiosError>({
        queryKey: companiesKeys.usersChart(id, params),
        queryFn: () => getCompanyUsersChart(id, params),
        enabled: !!id,
        ...options,
    });
};

export const useCreateCompany = (options?: any) => {
    return useMutation<CompanyMutationResponse, AxiosError, any>({
        mutationFn: (data) => createCompany(data),
        ...options,
    });
};

export const useUpdateCompany = (options?: any) => {
    return useMutation<CompanyMutationResponse, AxiosError, { id: number; data: any }>({
        mutationFn: ({ id, data }) => updateCompany(id, data),
        ...options,
    });
};

export const useDeleteCompany = (options?: any) => {
    return useMutation<CompanyMutationResponse, AxiosError, number>({
        mutationFn: (id) => deleteCompany(id),
        ...options,
    });
};

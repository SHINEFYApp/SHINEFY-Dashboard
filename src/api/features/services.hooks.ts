import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useGet } from "../useGetData";
import {
    getServices,
    getServiceDetails,
    addService,
    updateService,
    deleteServiceItem,
    reorderMainServices,
    type GetServicesParams,
} from "./services";

export const useGetServices = (params: GetServicesParams, options?: any) => {
    return useGet({
        queryFn: () => getServices(params),
        queryKey: ["services", params],
        options,
    });
};

export const useServiceDetails = (id: number | string, options?: any) => {
    return useGet({
        queryFn: () => getServiceDetails(id),
        queryKey: ["service-details", id],
        options,
    });
};

export const useAddService = (options?: any) => {
    return useMutation<any, AxiosError, FormData>({
        mutationFn: (data: FormData) => addService(data),
        ...options,
    });
};

export const useUpdateService = (options?: any) => {
    return useMutation<any, AxiosError, { id: number | string; data: FormData }>({
        mutationFn: ({ id, data }) => updateService(id, data),
        ...options,
    });
};

export const useDeleteService = (options?: any) => {
    return useMutation<any, AxiosError, number | string>({
        mutationFn: (id: number | string) => deleteServiceItem(id),
        ...options,
    });
};

export const useReorderMainServices = (options?: any) => {
    return useMutation<any, AxiosError, { id: number; sort_order: number }[]>({
        mutationFn: (orders) => reorderMainServices(orders),
        ...options,
    });
};

import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useGet } from "../useGetData";
import {
    getExtraServices,
    getExtraServiceDetails,
    addExtraService,
    updateExtraService,
    deleteExtraServiceItem,
    reorderExtraServices,
    type GetExtraServicesParams,
} from "./extraServices";

export const useGetExtraServices = (params: GetExtraServicesParams, options?: any) => {
    return useGet({
        queryFn: () => getExtraServices(params),
        queryKey: ["extra-services", params],
        options,
    });
};

export const useExtraServiceDetails = (id: number | string, options?: any) => {
    return useGet({
        queryFn: () => getExtraServiceDetails(id),
        queryKey: ["extra-service-details", id],
        options,
    });
};

export const useAddExtraService = (options?: any) => {
    return useMutation<any, AxiosError, FormData>({
        mutationFn: (data: FormData) => addExtraService(data),
        ...options,
    });
};

export const useUpdateExtraService = (options?: any) => {
    return useMutation<any, AxiosError, { id: number | string; data: FormData }>({
        mutationFn: ({ id, data }) => updateExtraService(id, data),
        ...options,
    });
};

export const useDeleteExtraService = (options?: any) => {
    return useMutation<any, AxiosError, number | string>({
        mutationFn: (id: number | string) => deleteExtraServiceItem(id),
        ...options,
    });
};

export const useReorderExtraServices = (options?: any) => {
    return useMutation<any, AxiosError, { id: number; sort_order: number }[]>({
        mutationFn: (orders) => reorderExtraServices(orders),
        ...options,
    });
};

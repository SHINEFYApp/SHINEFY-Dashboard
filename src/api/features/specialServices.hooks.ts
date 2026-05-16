import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useGet } from "../useGetData";
import {
    getSpecialServices,
    getSpecialServiceDetails,
    addSpecialService,
    updateSpecialService,
    deleteSpecialServiceItem,
    type GetSpecialServicesParams,
} from "./specialServices";

export const useGetSpecialServices = (params: GetSpecialServicesParams, options?: any) => {
    return useGet({
        queryFn: () => getSpecialServices(params),
        queryKey: ["special-services", params],
        options,
    });
};

export const useSpecialServiceDetails = (id: number | string, options?: any) => {
    return useGet({
        queryFn: () => getSpecialServiceDetails(id),
        queryKey: ["special-service-details", id],
        options,
    });
};

export const useAddSpecialService = (options?: any) => {
    return useMutation<any, AxiosError, FormData>({
        mutationFn: (data: FormData) => addSpecialService(data),
        ...options,
    });
};

export const useUpdateSpecialService = (options?: any) => {
    return useMutation<any, AxiosError, { id: number | string; data: FormData }>({
        mutationFn: ({ id, data }) => updateSpecialService(id, data),
        ...options,
    });
};

export const useDeleteSpecialService = (options?: any) => {
    return useMutation<any, AxiosError, number | string>({
        mutationFn: (id: number | string) => deleteSpecialServiceItem(id),
        ...options,
    });
};

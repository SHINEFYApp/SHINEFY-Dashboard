// src/api/features/serviceBoys.hooks.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useGet } from "../useGetData";
import {
    getServiceBoys,
    getServiceBoyDetails,
    addServiceBoy,
    updateServiceBoy,
    deleteServiceBoy,
    updateServiceBoyStatus,
    uploadServiceBoyImages,
    getServiceBoyAreas,
    updateServiceBoyAreas,
    setServiceBoyTemporaryOff,
    exportServiceBoysCsv,
    exportServiceBoysExcel,
    exportServiceBoysPdf,
    type GetServiceBoysParams,
    type AddServiceBoyPayload,
    type UpdateServiceBoyPayload,
    type UpdateStatusPayload,
    type UpdateServiceBoyAreasPayload,
    type SetTemporaryOffPayload,
} from "./serviceBoys";

export const useGetServiceBoys = (params: GetServiceBoysParams, options?: any) => {
    return useGet({
        queryFn: () => getServiceBoys(params),
        queryKey: ["service-boys", params],
        options,
    });
};

export const useGetServiceBoyDetails = (id: number | string, options?: any) => {
    return useGet({
        queryFn: () => getServiceBoyDetails(id),
        queryKey: ["service-boy-details", id],
        options: { enabled: !!id, ...options },
    });
};

export const useAddServiceBoy = (options?: any) => {
    return useMutation<any, AxiosError, AddServiceBoyPayload>({
        mutationFn: (data: AddServiceBoyPayload) => addServiceBoy(data),
        ...options,
    });
};

export const useUpdateServiceBoy = (options?: any) => {
    return useMutation<any, AxiosError, { id: string | number; data: UpdateServiceBoyPayload }>({
        mutationFn: ({ id, data }) => updateServiceBoy(id, data),
        ...options,
    });
};

export const useDeleteServiceBoy = (options?: any) => {
    return useMutation<any, AxiosError, string | number>({
        mutationFn: (id) => deleteServiceBoy(id),
        ...options,
    });
};

export const useUpdateServiceBoyStatus = (options?: any) => {
    return useMutation<any, AxiosError, { id: string | number; data: UpdateStatusPayload }>({
        mutationFn: ({ id, data }) => updateServiceBoyStatus(id, data),
        ...options,
    });
};

export const useUploadServiceBoyImages = (options?: any) => {
    return useMutation<any, AxiosError, { id: string | number; formData: FormData }>({
        mutationFn: ({ id, formData }) => uploadServiceBoyImages(id, formData),
        ...options,
    });
};

export const useGetServiceBoyAreas = (id: number | string, options?: any) => {
    return useGet({
        queryFn: () => getServiceBoyAreas(id),
        queryKey: ["service-boy-areas", id],
        options: { enabled: !!id, ...options },
    });
};

export const useUpdateServiceBoyAreas = (options?: any) => {
    return useMutation<any, AxiosError, { id: string | number; data: UpdateServiceBoyAreasPayload }>({
        mutationFn: ({ id, data }) => updateServiceBoyAreas(id, data),
        ...options,
    });
};

export const useSetServiceBoyTemporaryOff = (options?: any) => {
    return useMutation<any, AxiosError, { id: string | number; data: SetTemporaryOffPayload }>({
        mutationFn: ({ id, data }) => setServiceBoyTemporaryOff(id, data),
        ...options,
    });
};

export const useExportServiceBoys = (options?: any) => {
    return useMutation<any, AxiosError, { type: 'csv' | 'excel' | 'pdf', params: any }>({
        mutationFn: ({ type, params }) => {
            if (type === 'csv') return exportServiceBoysCsv(params);
            if (type === 'excel') return exportServiceBoysExcel(params);
            return exportServiceBoysPdf(params);
        },
        ...options,
    });
};

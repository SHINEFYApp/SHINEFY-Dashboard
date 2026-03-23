// src/api/features/subAdmins.hooks.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useGet } from "../useGetData";
import {
    getSubAdmins,
    getSubAdminDetails,
    addSubAdmin,
    updateSubAdmin,
    deleteSubAdmin,
    uploadSubAdminImage,
    exportSubAdminsCsv,
    exportSubAdminsExcel,
    exportSubAdminsPdf,
    type GetSubAdminsParams,
    type AddSubAdminPayload,
    type UpdateSubAdminPayload
} from "./subAdmins";

export const useGetSubAdmins = (params: GetSubAdminsParams, options?: any) => {
    return useGet({
        queryFn: () => getSubAdmins(params),
        queryKey: ["sub-admins", params],
        options,
    });
};

export const useGetSubAdminDetails = (userId: number | string, options?: any) => {
    return useGet({
        queryFn: () => getSubAdminDetails(userId),
        queryKey: ["sub-admin-details", userId],
        options: { enabled: !!userId, ...options },
    });
};

export const useAddSubAdmin = (options?: any) => {
    return useMutation<any, AxiosError, AddSubAdminPayload>({
        mutationFn: (data: AddSubAdminPayload) => addSubAdmin(data),
        ...options,
    });
};

export const useUpdateSubAdmin = (options?: any) => {
    return useMutation<any, AxiosError, { id: string | number; data: UpdateSubAdminPayload }>({
        mutationFn: ({ id, data }) => updateSubAdmin(id, data),
        ...options,
    });
};

export const useDeleteSubAdmin = (options?: any) => {
    return useMutation<any, AxiosError, string | number>({
        mutationFn: (id) => deleteSubAdmin(id),
        ...options,
    });
};

export const useUploadSubAdminImage = (options?: any) => {
    return useMutation<any, AxiosError, { id: string | number; formData: FormData }>({
        mutationFn: ({ id, formData }) => uploadSubAdminImage(id, formData),
        ...options,
    });
};

export const useExportSubAdmins = (options?: any) => {
    return useMutation<any, AxiosError, { type: 'csv' | 'excel' | 'pdf', params: any }>({
        mutationFn: ({ type, params }) => {
            if (type === 'csv') return exportSubAdminsCsv(params);
            if (type === 'excel') return exportSubAdminsExcel(params); // Note: verify endpoint name mapping (PDF path is excel in Postman description vs URL?)
            // Implementation follows URL: /excel -> Excel, /pdf -> Pdf
            return exportSubAdminsPdf(params);
        },
        ...options,
    });
};

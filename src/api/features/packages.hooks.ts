import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useGet } from "../useGetData";
import {
    getPackages,
    getPackageDetails,
    addPackage,
    updatePackage,
    deletePackage,
    exportPackagesCsv,
    exportPackagesExcel,
    exportPackagesPdf,
    type GetPackagesParams,
    type AddPackagePayload,
    type UpdatePackagePayload,
    type GetPackagesResponse,
    type PackageResponseItem,
} from "./packages";

// If GetPackagesResponse was not exported or defined in packages.ts, define it or use 'any' for now.
// Based on typical response: { status: string, data: { packages: Package[], pagination: ... } }

// Get all packages
export const useGetPackages = (params: GetPackagesParams, options?: any) => {
    return useGet({
        queryFn: () => getPackages(params),
        queryKey: ["packages", params],
        options,
    });
};

// Get package details
export const usePackageDetails = (id: number | string, options?: any) => {
    return useGet({
        queryFn: () => getPackageDetails(id),
        queryKey: ["package-details", id],
        options,
    });
};

// Add Package Mutation
export const useAddPackage = (options?: any) => {
    return useMutation<any, AxiosError, AddPackagePayload>({
        mutationFn: (data: AddPackagePayload) => addPackage(data),
        ...options,
    });
};

// Update Package Mutation
export const useUpdatePackage = (options?: any) => {
    return useMutation<any, AxiosError, { id: number | string; data: UpdatePackagePayload }>({
        // @ts-ignore
        mutationFn: ({ id, data }) => updatePackage(id, data),
        ...options,
    });
};

// Delete Package Mutation
export const useDeletePackage = (options?: any) => {
    return useMutation<any, AxiosError, number | string>({
        mutationFn: (id: number | string) => deletePackage(id),
        ...options,
    });
};

// Export Packages Csv
export const useExportPackagesCsv = (options?: any) => {
    return useQuery({
        queryKey: ['export-packages-csv'],
        queryFn: ({ queryKey }) => {
            // This is usually a trigger, not a query, but keeping useQuery if it's a fetch
            // Better to use useMutation or just a direct call for file download
            // But if following pattern:
            // Note: exports often act like mutations or direct calls.
            // If we use useGet it runs immediately.
            // For export buttons, usually we just call the function directly or use a mutation.
            return exportPackagesCsv({});
        },
        enabled: false, // Don't run auto
        ...options
    })
}

// Better Export Hooks (Mutation style for triggering download)
export const useExportPackages = (type: 'csv' | 'excel' | 'pdf', options?: any) => {
    return useMutation<any, AxiosError, any>({
        mutationFn: (params: any) => {
            if (type === 'csv') return exportPackagesCsv(params);
            if (type === 'excel') return exportPackagesExcel(params);
            if (type === 'pdf') return exportPackagesPdf(params);
            return Promise.reject("Invalid type");
        },
        ...options
    });
}

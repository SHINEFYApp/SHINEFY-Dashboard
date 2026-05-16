import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useGet } from "../useGetData";
import {
    getCompounds,
    getCompound,
    createCompound,
    updateCompound,
    deleteCompound,
    getPackages,
    getPackage,
    createPackage,
    updatePackage,
    deletePackage,
    getSubscriptions,
    getSubscription,
    createSubscription,
    updateSubscriptionBalances,
    updateSubscriptionStatus,
    deleteSubscription,
    getSubscriptionBookings,
    getBookings,
    getBooking,
    updateBooking,
    bulkAssignServiceBoy,
    getTodaySummary,
    getUserCars,
    getUserLocations,
    getCompoundPackages,
    previewSchedule,
} from "./compounds";

// ---- Compounds ----
export const useGetCompounds = (params?: any, options?: any) => {
    return useGet({
        queryFn: () => getCompounds(params),
        queryKey: ["compounds", params],
        options,
    });
};

export const useGetCompound = (id: number, options?: any) => {
    return useGet({
        queryFn: () => getCompound(id),
        queryKey: ["compound", id],
        options: { enabled: !!id, ...options },
    });
};

export const useCreateCompound = (options?: any) => {
    return useMutation<any, AxiosError, any>({
        mutationFn: (data) => createCompound(data),
        ...options,
    });
};

export const useUpdateCompound = (options?: any) => {
    return useMutation<any, AxiosError, { id: number; data: any }>({
        mutationFn: ({ id, data }) => updateCompound(id, data),
        ...options,
    });
};

export const useDeleteCompound = (options?: any) => {
    return useMutation<any, AxiosError, number>({
        mutationFn: (id) => deleteCompound(id),
        ...options,
    });
};

// ---- Packages ----
export const useGetPackages = (params?: any, options?: any) => {
    return useGet({
        queryFn: () => getPackages(params),
        queryKey: ["compound-packages", params],
        options,
    });
};

export const useGetPackage = (id: number, options?: any) => {
    return useGet({
        queryFn: () => getPackage(id),
        queryKey: ["compound-package", id],
        options: { enabled: !!id, ...options },
    });
};

export const useCreatePackage = (options?: any) => {
    return useMutation<any, AxiosError, any>({
        mutationFn: (data) => createPackage(data),
        ...options,
    });
};

export const useUpdatePackage = (options?: any) => {
    return useMutation<any, AxiosError, { id: number; data: any }>({
        mutationFn: ({ id, data }) => updatePackage(id, data),
        ...options,
    });
};

export const useDeletePackage = (options?: any) => {
    return useMutation<any, AxiosError, number>({
        mutationFn: (id) => deletePackage(id),
        ...options,
    });
};

// ---- Subscriptions ----
export const useGetSubscriptions = (params?: any, options?: any) => {
    return useGet({
        queryFn: () => getSubscriptions(params),
        queryKey: ["compound-subscriptions", params],
        options,
    });
};

export const useGetSubscription = (id: number, options?: any) => {
    return useGet({
        queryFn: () => getSubscription(id),
        queryKey: ["compound-subscription", id],
        options: { enabled: !!id, ...options },
    });
};

export const useCreateSubscription = (options?: any) => {
    return useMutation<any, AxiosError, any>({
        mutationFn: (data) => createSubscription(data),
        ...options,
    });
};

export const useUpdateSubscriptionBalances = (options?: any) => {
    return useMutation<any, AxiosError, { id: number; data: any }>({
        mutationFn: ({ id, data }) => updateSubscriptionBalances(id, data),
        ...options,
    });
};

export const useUpdateSubscriptionStatus = (options?: any) => {
    return useMutation<any, AxiosError, { id: number; data: any }>({
        mutationFn: ({ id, data }) => updateSubscriptionStatus(id, data),
        ...options,
    });
};

export const useDeleteSubscription = (options?: any) => {
    return useMutation<any, AxiosError, number>({
        mutationFn: (id) => deleteSubscription(id),
        ...options,
    });
};

export const useGetSubscriptionBookings = (id: number, options?: any) => {
    return useGet({
        queryFn: () => getSubscriptionBookings(id),
        queryKey: ["compound-subscription-bookings", id],
        options: { enabled: !!id, ...options },
    });
};

// ---- Bookings ----
export const useGetBookings = (params?: any, options?: any) => {
    return useGet({
        queryFn: () => getBookings(params),
        queryKey: ["compound-bookings", params],
        options,
    });
};

export const useGetBooking = (id: number, options?: any) => {
    return useGet({
        queryFn: () => getBooking(id),
        queryKey: ["compound-booking", id],
        options: { enabled: !!id, ...options },
    });
};

export const useUpdateBooking = (options?: any) => {
    return useMutation<any, AxiosError, { id: number; data: any }>({
        mutationFn: ({ id, data }) => updateBooking(id, data),
        ...options,
    });
};

export const useBulkAssignServiceBoy = (options?: any) => {
    return useMutation<any, AxiosError, any>({
        mutationFn: (data) => bulkAssignServiceBoy(data),
        ...options,
    });
};

// ---- Dashboard ----
export const useGetTodaySummary = (options?: any) => {
    return useGet({
        queryFn: () => getTodaySummary(),
        queryKey: ["compound-today-summary"],
        options,
    });
};

// ---- Ajax Lookups ----
export const useGetUserCars = (userId: number, options?: any) => {
    return useGet({
        queryFn: () => getUserCars(userId),
        queryKey: ["user-cars", userId],
        options: { enabled: !!userId, ...options },
    });
};

export const useGetUserLocations = (userId: number, options?: any) => {
    return useGet({
        queryFn: () => getUserLocations(userId),
        queryKey: ["user-locations", userId],
        options: { enabled: !!userId, ...options },
    });
};

export const useGetCompoundPackages = (compoundId: number, options?: any) => {
    return useGet({
        queryFn: () => getCompoundPackages(compoundId),
        queryKey: ["compound-packages-list", compoundId],
        options: { enabled: !!compoundId, ...options },
    });
};

// ---- Schedule Preview ----
export const usePreviewSchedule = (options?: any) => {
    return useMutation<any, AxiosError, any>({
        mutationFn: (data) => previewSchedule(data),
        ...options,
    });
};

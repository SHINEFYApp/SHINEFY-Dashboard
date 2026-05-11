import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
    getDailySlot,
    updateDailySlot,
    getDailySlotSettings,
    updateDailySlotSettings,
    getSpecificSlots,
    viewSpecificSlot,
    addSpecificSlot,
    updateSpecificSlot,
    deleteSpecificSlot,
    getAdminSlots,
} from "./slots";
import type {
    UpdateDailySlotPayload,
    GetSpecificSlotsParams,
    AddSpecificSlotPayload,
    UpdateSpecificSlotPayload,
    GetAdminSlotsParams,
    UpdateDailySlotSettingsPayload,
} from "../../types/slots";

// Query Keys
export const slotsKeys = {
    daily: ["daily-slot"] as const,
    specificAll: ["specific-slots"] as const,
    specificOne: (id: number) => ["specific-slot", id] as const,
    adminSlots: ["admin-slots"] as const,
};

// ============ Daily Slot ============

export const useGetDailySlot = () => {
    return useQuery({
        queryKey: slotsKeys.daily,
        queryFn: getDailySlot,
    });
};

export const useUpdateDailySlot = () => {
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError, UpdateDailySlotPayload>({
        mutationFn: updateDailySlot,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: slotsKeys.daily });
        },
    });
};

export const useGetDailySlotSettings = () => {
    return useQuery({
        queryKey: [...slotsKeys.daily, "settings"],
        queryFn: getDailySlotSettings,
    });
};

export const useUpdateDailySlotSettings = () => {
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError, UpdateDailySlotSettingsPayload>({
        mutationFn: updateDailySlotSettings,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: slotsKeys.daily });
        },
    });
};

// ============ Specific Slots ============

export const useGetSpecificSlots = (params: GetSpecificSlotsParams) => {
    return useQuery({
        queryKey: [...slotsKeys.specificAll, params],
        queryFn: () => getSpecificSlots(params),
    });
};

export const useViewSpecificSlot = (id: number) => {
    return useQuery({
        queryKey: slotsKeys.specificOne(id),
        queryFn: () => viewSpecificSlot(id),
        enabled: !!id,
    });
};

export const useAddSpecificSlot = () => {
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError, AddSpecificSlotPayload>({
        mutationFn: addSpecificSlot,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: slotsKeys.specificAll });
        },
    });
};

export const useUpdateSpecificSlot = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError, UpdateSpecificSlotPayload>({
        mutationFn: (data) => updateSpecificSlot(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: slotsKeys.specificAll });
            queryClient.invalidateQueries({ queryKey: slotsKeys.specificOne(id) });
        },
    });
};

export const useDeleteSpecificSlot = () => {
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError, number>({
        mutationFn: (id) => deleteSpecificSlot(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: slotsKeys.specificAll });
        },
    });
};

// ============ Admin Slots ============

export const useGetAdminSlots = (params: GetAdminSlotsParams) => {
    return useQuery({
        queryKey: [...slotsKeys.adminSlots, params],
        queryFn: () => getAdminSlots(params),
        enabled: !!params.date,
    });
};

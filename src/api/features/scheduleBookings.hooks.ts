import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    cancelSchedule,
    createSchedule,
    getScheduleDetails,
    getSchedules,
    type CreateSchedulePayload,
    type ScheduleListParams,
} from "./scheduleBookings";

export const useGetSchedules = (params?: ScheduleListParams, options?: any) =>
    useQuery({
        queryKey: ["booking-schedules", params],
        queryFn: () => getSchedules(params),
        ...options,
    });

export const useGetScheduleDetails = (id: number | string, options?: any) =>
    useQuery({
        queryKey: ["booking-schedule", id],
        queryFn: () => getScheduleDetails(id),
        enabled: !!id,
        ...options,
    });

export const useCreateSchedule = (options?: any) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateSchedulePayload) => createSchedule(payload),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["booking-schedules"] });
        },
        ...options,
    });
};

export const useCancelSchedule = (options?: any) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: number | string) => cancelSchedule(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["booking-schedules"] });
        },
        ...options,
    });
};

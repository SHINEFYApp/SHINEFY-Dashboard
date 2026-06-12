import type { AxiosResponse } from "axios";
import { deleteService, getService, postService } from "../service/service-requests";

const base = () => `${import.meta.env.VITE_API_URL}/api/admin/booking-schedules`;

export interface CreateSchedulePayload {
    schedule_type: "normal" | "package";
    date_mode: "specific" | "recurring";
    user_id: number;
    vehicle_id?: number;
    // normal
    service_id?: number;
    extra_service_id?: number;
    // package
    user_package_id?: number;
    // specific dates
    dates?: string[];
    // recurring
    recurrence_days?: number[];
    recurrence_start?: string;
    recurrence_end?: string;
    booking_time?: string;
    area_id?: string | number;
    address_loc?: string;
    lat?: string;
    lon?: string;
}

export interface ScheduleListParams {
    user_id?: number;
    status?: "active" | "cancelled";
    schedule_type?: "normal" | "package";
    page?: number;
}

export const createSchedule = async (payload: CreateSchedulePayload) => {
    const res: AxiosResponse = await postService(base(), payload);
    return res.data;
};

export const getSchedules = async (params?: ScheduleListParams) => {
    const res: AxiosResponse = await getService(base(), params);
    return res.data;
};

export const getScheduleDetails = async (id: number | string) => {
    const res: AxiosResponse = await getService(`${base()}/${id}`);
    return res.data;
};

export const cancelSchedule = async (id: number | string) => {
    const res: AxiosResponse = await deleteService(`${base()}/${id}`);
    return res.data;
};

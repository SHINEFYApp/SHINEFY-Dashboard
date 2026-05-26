import type { AxiosResponse } from "axios";
import { getService, putService } from "../service/service-requests";
import type { UpdateBookingPayload } from "../../types/bookings";

export const manageBookings = async (route: string, params: any) => {
    const res: AxiosResponse = await getService(route, params);
    return res.data;

}
export const singleBookingDetails = async (route: string, params?: any) => {
    const res: AxiosResponse = await getService(route, params ? params : null);
    return res.data;
}

export const updateBooking = async (id: number | string, data: UpdateBookingPayload) => {
    const baseURL = import.meta.env.VITE_API_URL;
    const res: AxiosResponse = await putService(`${baseURL}/api/book/update/${id}`, data);
    return res.data;
}

export const getCoupons = async (route: string, params?: any) => {
    const res: AxiosResponse = await getService(route, params ? params : null);
    return res.data;
}

export const getPackage = async (route: string, params?: any) => {
    const res: AxiosResponse = await getService(route, params ? params : null);
    return res.data;
}

export const getServices = async (route: string, params?: any) => {
    const res: AxiosResponse = await getService(route, params ? params : null);
    return res.data;
}

export const getUserBookingsReport = async (route: string, params?: any) => {
    const res: AxiosResponse = await getService(route, params || null);
    return res.data;
}

export const exportUserBookingsReport = async (route: string, params?: any) => {
    const res: AxiosResponse = await getService(route, { params, responseType: 'blob' });
    return res.data;
}

export const getSubareas = async (route: string) => {
    const res: AxiosResponse = await getService(route);
    return res.data;
}

export const getBookingLogs = async (id: number | string, per_page?: number) => {
    const baseURL = import.meta.env.VITE_API_URL;
    const res: AxiosResponse = await getService(`${baseURL}/api/book/${id}/logs`, per_page ? { per_page } : undefined);
    return res.data;
}

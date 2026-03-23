import type { AxiosResponse } from "axios";
import { getService } from "../service/service-requests";

export const manageBookings = async (route: string, params: any) => {
    const res: AxiosResponse = await getService(route, params);
    return res.data;

}
export const singleBookingDetails = async (route: string, params?: any) => {
    const res: AxiosResponse = await getService(route, params ? params : null);
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

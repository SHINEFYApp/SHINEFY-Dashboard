import type { AxiosResponse } from "axios";
import { getService, postService } from "../service/service-requests";

export interface User {
    name: string;
    email: string;
    image: string;
    group_name: string;
    phone_number: string;
    status: number;
    otp_status: number;
    createtime: string;
}

export interface GetUsersResponse {
    status: string;
    data: {
        users: User[];
        pagination: {
            current_page: number;
            total_pages: number;
            total_items: number;
            limit: number;
        };
    };
}

export interface UsersParams {
    limit?: number;
    page?: number;
    group_name?: string;
    search_text?: string;
}

export interface ExportUsersPayload {
    limit?: number;
    page?: number;
    group_name?: string;
    search_text?: string;
    search_with_area?: string;
    createtime?: string;
    device_type?: string;
}

export interface UserDetailsParams {
    user_id: number | string;
}

export interface BookingHistoryParams {
    user_id: number | string;
    limit?: number;
    page?: number;
}

export interface WalletHistoryParams {
    user_id: number | string;
    search?: string | number;
}

export interface UserPackagesParams {
    user_id: number | string;
    search?: string;
}

export interface StatusUpdateParams {
    user_id: number | string;
    status: number;
}

// GET /api/getUsers
export const getUsersList = async (params: UsersParams): Promise<GetUsersResponse> => {
    const res: AxiosResponse<GetUsersResponse> = await getService("/api/getUsers", params);
    return res.data;
};

// POST /api/users/ExportUsers
export const exportUsers = async (data: ExportUsersPayload) => {
    const res: AxiosResponse = await postService("/api/users/ExportUsers", data, { responseType: "blob" });
    return res.data;
};

// GET /api/users/view/user-details?user_id=957
export const getUserDetails = async (params: UserDetailsParams) => {
    const res: AxiosResponse = await getService("/api/users/view/user-details", params);
    return res.data;
};

// GET /api/users/view/booking-history?user_id=957&limit=10&page=1
export const getUserBookingHistory = async (params: BookingHistoryParams) => {
    const res: AxiosResponse = await getService("/api/users/view/booking-history", params);
    return res.data;
};

// GET /api/users/view/my-vehicles?user_id=957
export const getUserVehicles = async (params: { user_id: number | string }) => {
    const res: AxiosResponse = await getService("/api/users/view/my-vehicles", params);
    return res.data;
};

// GET /api/users/view/my-locations?user_id=12
export const getUserLocations = async (params: { user_id: number | string }) => {
    const res: AxiosResponse = await getService("/api/users/view/my-locations", params);
    return res.data;
};

// GET /api/users/view/wallet-history?user_id=957&search=0
export const getUserWalletHistory = async (params: WalletHistoryParams) => {
    const res: AxiosResponse = await getService("/api/users/view/wallet-history", params);
    return res.data;
};

// GET /api/users/view/user-packages?user_id=242&search=Exterior Package Quarter package
export const getUserPackages = async (params: UserPackagesParams) => {
    const res: AxiosResponse = await getService("/api/users/view/user-packages", params);
    return res.data;
};

// GET /api/users/edit/user-status?user_id=12&status=1
export const editUserStatus = async (params: StatusUpdateParams) => {
    const res: AxiosResponse = await postService("/api/users/edit/user-status", params);
    return res.data;
};

// GET /api/users/edit/otp-status?user_id=12&status=1
export const editOtpStatus = async (params: StatusUpdateParams) => {
    const res: AxiosResponse = await postService("/api/users/edit/otp-status", params);
    return res.data;
};

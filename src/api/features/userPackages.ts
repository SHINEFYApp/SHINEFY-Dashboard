import type { AxiosResponse } from "axios";
import { getService } from "../service/service-requests";

export interface UserPackageItem {
    id: number;
    user_id: number;
    user_name: string;
    user_email: string;
    user_mobile: string;
    package_id: number;
    package_name: string;
    status: "pending" | "active" | "finished";
    total_price: number;
    payment_method: string;
    original_price?: number;
    discount?: number;
    coupon_code?: string;
    created_at?: string;
    created_at_formatted?: string;
    available_from?: string;
    available_to?: string;
    total_used?: number | null;
    remind_used?: number | null;
}

export interface GetUserPackagesParams {
    page?: number;
    per_page?: number;
    search?: string;
    status?: string;
    user_id?: number | string;
}

export interface GetUserPackagesResponse {
    status: string;
    data: {
        user_packages: UserPackageItem[];
        pagination: {
            total: number;
            per_page: number;
            current_page: number;
            last_page: number;
        };
    };
}

export const getUserPackages = async (params: GetUserPackagesParams) => {
    const res: AxiosResponse = await getService("/api/user-packages", params);
    return res.data;
};

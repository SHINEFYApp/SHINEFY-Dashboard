import type { AxiosResponse } from "axios";
import { getService } from "../service/service-requests";

export interface UserPackageServiceRemaining {
    type: "main" | "extra";
    service_id: number;
    service_name: string;
    remind_quantity: number;
    used_quantity: number;
    quantity: number;
}

export interface UserPackageItem {
    id: number;
    user_id: number;
    user_name: string;
    user_email: string;
    user_mobile: string;
    package_id: number;
    package_name: string;
    status: "pending" | "active" | "finished";
    is_expired?: boolean;
    is_active_valid?: boolean;
    total_price: number;
    remaining_total?: number;
    services_remaining?: UserPackageServiceRemaining[];
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
    expiry?: "expired" | "valid";
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

// Export subscriptions as CSV (customer, phone, package, total price, remaining
// quantities). Honours the same filters as the list. Returns a Blob.
export const exportUserPackagesCsv = async (params: Omit<GetUserPackagesParams, "page" | "per_page">) => {
    const res: AxiosResponse = await getService("/api/user-packages/export/csv", { params, responseType: "blob" });
    return res.data as Blob;
};

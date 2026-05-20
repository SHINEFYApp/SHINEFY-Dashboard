import type { AxiosResponse } from "axios";
import { postService } from "../service/service-requests";

// --- Types ---

export interface PurchasePackagePayload {
    user_id: number | string;
    package_id: number | string;
    coupon_code?: string;
    vehicle_id?: number | string;
}

export interface PurchasePackageResponse {
    success: string;
    payment_url: string;
    tran_ref: string;
    user_package_id: number;
    amount: number;
    original_price: number;
    discount: number;
}

export interface ResendPaymentLinkPayload {
    user_package_id: number | string;
}

export interface ResendPaymentLinkResponse {
    success: string;
    payment_url: string;
    tran_ref: string;
}

export interface ApplyCouponPayload {
    coupon_code: string;
    package_id: number | string;
}

export interface ApplyCouponResponse {
    success: string;
    original_price: number;
    discount: number;
    total: number;
}

export interface PackagesListItem {
    id: number;
    name: string;
    name_ar: string;
    price: number;
    total_used: number;
    total_days: number;
    schedule_type: string;
    schedule_interval: string;
    package_img: string;
    package_img_url: string;
    description?: string;
    description_ar?: string;
    created_at?: string;
    created_at_formatted?: string;
}

export interface GetPackagesResponse {
    status: string;
    data: {
        data: PackagesListItem[];
        pagination?: {
            current_page: number;
            total_pages: number;
            total_items: number;
            limit: number;
        };
    };
}

// --- Endpoints ---

export const purchasePackage = async (data: PurchasePackagePayload) => {
    const res: AxiosResponse = await postService("/api/purchase_package", data);
    return res.data;
};

export const resendPaymentLink = async (data: ResendPaymentLinkPayload) => {
    const res: AxiosResponse = await postService("/api/resend_payment_link", data);
    return res.data;
};

export const applyCoupon = async (data: ApplyCouponPayload) => {
    const res: AxiosResponse = await postService("/api/apply_coupan", data);
    return res.data;
};

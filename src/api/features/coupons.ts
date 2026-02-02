import {
    getService,
    postService,
    deleteService,
    putService
} from "../service/service-requests";

// Interfaces
export interface CouponItem {
    id: number;
    code: string;
    amount: number;
    discount_percent: number;
    start_at: string;
    end_at: string;
    status?: number;
    audience_type: string;
    services_text: string;
    total_booking: number;
    created_at_formatted: string;
    max_uses_per_user: number;
}

export interface GetCouponsParams {
    start?: number;
    limit?: number;
    search?: string;
}

export interface AddCouponPayload {
    code: string;
    amount: number;
    discount_percent: number;
    audience_type: string;
    max_users?: number;
    user_ids: number[];
    group_ids: number[];
    services_mode: string;
    service_ids: number[];
    start_at: string; // YYYY-MM-DD HH:mm:ss
    end_at: string;
    limit_to_hours: boolean;
    start_hour?: string | null;
    end_hour?: string | null;
    max_uses_per_user: number;
}

export interface EditCouponPayload extends AddCouponPayload {
    id: number;
}

export interface CouponResponse {
    data: {
        coupons: CouponItem[];
        pagination: {
            current_page: number;
            total_pages: number;
            total_items: number;
            limit: number;
        };
    };
}

// Endpoints
export const getCoupons = async (params: GetCouponsParams) => {
    return await getService("/api/coupons", params);
};

export const getCoupon = async (id: number) => {
    return await getService(`/api/coupons/${id}`, {});
};

export const addCoupon = async (data: AddCouponPayload) => {
    return await postService("/api/add/coupon", null, data);
};

export const editCoupon = async (data: EditCouponPayload) => {
    return await putService(`/api/edit/coupon/${data.id}`, null, data);
};

export const deleteCoupon = async (id: number) => {
    return await deleteService(`/api/delete/coupon/${id}`, {});
};

export const exportCoupons = async (type: 'csv' | 'excel' | 'pdf', search: string = "") => {
    return await getService(`/api/export/coupons/${type}`, { search });
};

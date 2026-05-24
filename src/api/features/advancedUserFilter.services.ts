import type { AxiosResponse } from "axios";
import { getService } from "../service/service-requests";

export interface AdvancedFilterUser {
    user_id: number;
    name: string;
    email: string;
    phone_number: string;
    image: string;
    status: number;
    otp_status: number;
    createtime: string;
    [key: string]: any;
}

export interface AdvancedFilterPagination {
    current_page: number;
    total_pages: number;
    total_items: number;
    limit: number;
}

export interface AdvancedFilterResponse {
    status: string;
    data: {
        users: AdvancedFilterUser[];
        pagination: AdvancedFilterPagination;
        filter_type: string;
        applied_filters: Record<string, string>;
    };
}

export interface AdvancedFilterParams {
    filter_type: string;
    page?: number;
    limit?: number;
    from_date?: string;
    to_date?: string;
    min_bookings?: number;
    days?: number;
    cancel_pct?: number;
}

export const getAdvancedFilterUsers = async (params: AdvancedFilterParams): Promise<AdvancedFilterResponse> => {
    const res: AxiosResponse<AdvancedFilterResponse> = await getService("/api/users/advanced-filter", params);
    return res.data;
};

export const exportAdvancedFilterUsers = async (params: AdvancedFilterParams) => {
    const res: AxiosResponse = await getService("/api/users/advanced-filter/export", { params, responseType: "blob" });
    return res.data;
};

export const filterOptionsList = [
    { value: "no_vehicle", label: "No Vehicle" },
    { value: "otp_disabled", label: "OTP Not Verified" },
    { value: "vehicle_no_booking", label: "Has Vehicle — No Booking" },
    { value: "no_booking_date_range", label: "No Bookings in Date Range" },
    { value: "one_booking_cancelled", label: "One Booking — Cancelled" },
    { value: "one_booking_bad_rating", label: "One Booking — Bad Rating" },
    { value: "package_expired", label: "Package Expired" },
    { value: "n_bookings_date_range", label: "N+ Bookings in Date Range" },
    { value: "package_active", label: "Has Active Package" },
    { value: "all_bookings_waiting", label: "All Bookings Waiting" },
    { value: "package_expiring_soon", label: "Package Expiring Soon" },
    { value: "high_cancellation", label: "High Cancellation Rate" },
    { value: "service_boy_late", label: "Service Boy Was Late" },
];

export const filterNeedsDateRange = ["no_booking_date_range", "n_bookings_date_range"];
export const filterNeedsMinBookings = ["n_bookings_date_range"];
export const filterNeedsDays = ["package_expiring_soon"];
export const filterNeedsCancelPct = ["high_cancellation"];

import type { AxiosResponse } from "axios";
import { getService } from "../service/service-requests";

// Types
export interface DashboardStatistics {
    waiting_bookings: number;
    total_bookings_today: number;
    cancelled_bookings_today: number;
    total_revenue: number;
    package_subscriptions_today: number;
    active_service_boys: number;
    pending_slots_today: number;
}

export interface RecentBooking {
    booking_id: number;
    booking_no: string;
    customer_name: string;
    service_name: string;
    total_price: string;
    booking_date: string;
    booking_time: string;
    status: number;
}

export interface RecentBookingsResponse {
    data: RecentBooking[];
    pagination: {
        page: number;
        per_page: number;
        total: number;
        last_page: number;
    };
}

export interface RevenueChartData {
    labels: string[];
    data: number[];
}

// Endpoints
export const getDashboardStatistics = async (): Promise<AxiosResponse<{ status: string; data: DashboardStatistics }>> => {
    return await getService("/api/statistics");
};

export const getRecentBookings = async (limit: number = 10): Promise<AxiosResponse<RecentBookingsResponse>> => {
    return await getService("/api/recent-bookings", { limit });
};

export const getRevenueChart = async (period: 'daily' | 'weekly' | 'monthly' = 'weekly'): Promise<AxiosResponse<{ status: string; data: RevenueChartData }>> => {
    return await getService("/api/revenue-chart", { period });
};

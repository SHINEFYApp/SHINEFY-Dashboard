import { useGet } from "../useGetData";
import { getDashboardStatistics, getRecentBookings, getRevenueChart } from "./home";

export const useDashboardStatistics = (options?: any) => {
    return useGet({
        queryFn: () => getDashboardStatistics(),
        queryKey: ["dashboard-statistics"],
        options: {
            refetchInterval: 30000, // Refetch every 30 seconds
            ...options,
        },
    });
};

export const useRecentBookings = (limit: number = 10, options?: any) => {
    return useGet({
        queryFn: () => getRecentBookings(limit),
        queryKey: ["dashboard-recent-bookings", limit],
        options: {
            refetchInterval: 30000,
            ...options,
        },
    });
};

export const useRevenueChart = (period: 'daily' | 'weekly' | 'monthly' = 'weekly', options?: any) => {
    return useGet({
        queryFn: () => getRevenueChart(period),
        queryKey: ["dashboard-revenue-chart", period],
        options: {
            ...options,
        },
    });
};

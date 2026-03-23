import { useMutation, useQuery } from "@tanstack/react-query";
import {
    getCoupons,
    getCoupon,
    addCoupon,
    editCoupon,
    deleteCoupon,
    exportCoupons,
} from "./coupons";
import type {
    GetCouponsParams,
    AddCouponPayload,
    EditCouponPayload
} from "./coupons";
import type { AxiosError } from "axios";

// Keys
export const couponsKeys = {
    all: ["coupons"] as const,
    list: (params: GetCouponsParams) => [...couponsKeys.all, "list", params] as const,
    detail: (id: number) => [...couponsKeys.all, "detail", id] as const,
};

// GET Coupons
export const useGetCoupons = (params: GetCouponsParams) => {
    return useQuery({
        queryKey: couponsKeys.list(params),
        queryFn: () => getCoupons(params),
    });
};

// GET Coupon Detail
export const useGetCoupon = (id: number) => {
    return useQuery({
        queryKey: couponsKeys.detail(id),
        queryFn: () => getCoupon(id),
        enabled: !!id,
    });
};

// ADD Coupon
export const useAddCoupon = (options?: any) => {
    return useMutation<any, AxiosError, AddCouponPayload>({
        mutationFn: addCoupon,
        ...options,
    });
};

// EDIT Coupon
export const useEditCoupon = (options?: any) => {
    return useMutation<any, AxiosError, EditCouponPayload>({
        mutationFn: editCoupon,
        ...options,
    });
};

// DELETE Coupon
export const useDeleteCoupon = (options?: any) => {
    return useMutation<any, AxiosError, number>({
        mutationFn: deleteCoupon,
        ...options,
    });
};

// EXPORT Coupons
export const useExportCoupons = () => {
    // Export usually returns a file blob, which axios handles if configured. 
    // Here we'll just expose the fetcher. 
    // Usually triggered manually, not a mutation per se but convenient wrap
    // Or just a direct function call in key handlers.
    return (type: 'csv' | 'excel' | 'pdf', search: string) => exportCoupons(type, search);
};

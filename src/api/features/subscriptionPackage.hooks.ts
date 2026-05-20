import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
    purchasePackage,
    resendPaymentLink,
    applyCoupon,
    type PurchasePackagePayload,
    type ResendPaymentLinkPayload,
    type ApplyCouponPayload,
} from "./subscriptionPackage";

export const usePurchasePackage = (options?: any) => {
    return useMutation<any, AxiosError, PurchasePackagePayload>({
        mutationFn: (data: PurchasePackagePayload) => purchasePackage(data),
        ...options,
    });
};

export const useResendPaymentLink = (options?: any) => {
    return useMutation<any, AxiosError, ResendPaymentLinkPayload>({
        mutationFn: (data: ResendPaymentLinkPayload) => resendPaymentLink(data),
        ...options,
    });
};

export const useApplyCoupon = (options?: any) => {
    return useMutation<any, AxiosError, ApplyCouponPayload>({
        mutationFn: (data: ApplyCouponPayload) => applyCoupon(data),
        ...options,
    });
};

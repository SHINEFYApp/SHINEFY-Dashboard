import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useGet } from "../useGetData";
import {
    getCommissionVat,
    updateCommissionVat,
    type UpdateCommissionVatPayload,
    type UpdateCommissionVatResponse,
    getDefaultDriverCommission,
    updateDefaultDriverCommission,
    type UpdateDefaultDriverCommissionPayload,
    type UpdateDefaultDriverCommissionResponse,
    getBonusPoint,
    updateBonusPoint,
    type UpdateBonusPointPayload,
    type UpdateBonusPointResponse,
} from "./commissions";

// VAT
export const useGetCommissionVat = (options?: any) => {
    return useGet({
        queryFn: () => getCommissionVat(),
        queryKey: ["commission-vat"],
        options,
    });
};

export const useUpdateCommissionVat = (options?: any) => {
    return useMutation<UpdateCommissionVatResponse, AxiosError, UpdateCommissionVatPayload>({
        mutationFn: (data) => updateCommissionVat(data).then((res) => res.data),
        ...options,
    });
};

// Default Driver Commission
export const useGetDefaultDriverCommission = (options?: any) => {
    return useGet({
        queryFn: () => getDefaultDriverCommission(),
        queryKey: ["default-driver-commission"],
        options,
    });
};

export const useUpdateDefaultDriverCommission = (options?: any) => {
    return useMutation<UpdateDefaultDriverCommissionResponse, AxiosError, UpdateDefaultDriverCommissionPayload>({
        mutationFn: (data) => updateDefaultDriverCommission(data).then((res) => res.data),
        ...options,
    });
};

// Bonus Point
export const useGetBonusPoint = (options?: any) => {
    return useGet({
        queryFn: () => getBonusPoint(),
        queryKey: ["bonus-point"],
        options,
    });
};

export const useUpdateBonusPoint = (options?: any) => {
    return useMutation<UpdateBonusPointResponse, AxiosError, UpdateBonusPointPayload>({
        mutationFn: (data) => updateBonusPoint(data).then((res) => res.data),
        ...options,
    });
};

import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useGet } from "../useGetData";
import {
    getAds,
    getAdDetails,
    addAd,
    updateAd,
    deleteAdItem,
    toggleAdStatus,
    type GetAdsParams,
} from "./ads";

export const useGetAds = (params: GetAdsParams, options?: any) => {
    return useGet({
        queryFn: () => getAds(params),
        queryKey: ["ads", params],
        options,
    });
};

export const useAdDetails = (id: number | string, options?: any) => {
    return useGet({
        queryFn: () => getAdDetails(id),
        queryKey: ["ad-details", id],
        options,
    });
};

export const useAddAd = (options?: any) => {
    return useMutation<any, AxiosError, FormData>({
        mutationFn: (data: FormData) => addAd(data),
        ...options,
    });
};

export const useUpdateAd = (options?: any) => {
    return useMutation<any, AxiosError, { id: number | string; data: FormData }>({
        mutationFn: ({ id, data }) => updateAd(id, data),
        ...options,
    });
};

export const useDeleteAd = (options?: any) => {
    return useMutation<any, AxiosError, number | string>({
        mutationFn: (id: number | string) => deleteAdItem(id),
        ...options,
    });
};

export const useToggleAdStatus = (options?: any) => {
    return useMutation<any, AxiosError, number | string>({
        mutationFn: (id: number | string) => toggleAdStatus(id),
        ...options,
    });
};

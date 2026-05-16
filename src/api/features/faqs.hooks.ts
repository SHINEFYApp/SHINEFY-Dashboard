import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
    getFaqs,
    getFaq,
    addFaq,
    updateFaq,
    deleteFaq,
    type GetFaqsParams,
    type AddFaqPayload,
    type UpdateFaqPayload,
    type GetFaqsResponse,
    type SingleFaqResponse,
    type MutationResponse,
} from "./faqs";

export const faqsKeys = {
    all: ["faqs"] as const,
    list: (params: GetFaqsParams) => [...faqsKeys.all, "list", params] as const,
    detail: (id: number) => [...faqsKeys.all, "detail", id] as const,
};

export const useGetFaqs = (params: GetFaqsParams) => {
    return useQuery<GetFaqsResponse, AxiosError>({
        queryKey: faqsKeys.list(params),
        queryFn: () => getFaqs(params),
    });
};

export const useGetFaq = (id: number) => {
    return useQuery<SingleFaqResponse, AxiosError>({
        queryKey: faqsKeys.detail(id),
        queryFn: () => getFaq(id),
        enabled: !!id,
    });
};

export const useAddFaq = (options?: any) => {
    return useMutation<MutationResponse, AxiosError, AddFaqPayload>({
        mutationFn: addFaq,
        ...options,
    });
};

export const useUpdateFaq = (options?: any) => {
    return useMutation<MutationResponse, AxiosError, { id: number; data: UpdateFaqPayload }>({
        mutationFn: ({ id, data }) => updateFaq(id, data),
        ...options,
    });
};

export const useDeleteFaq = (options?: any) => {
    return useMutation<MutationResponse, AxiosError, number>({
        mutationFn: deleteFaq,
        ...options,
    });
};

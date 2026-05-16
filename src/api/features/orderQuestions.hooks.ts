import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
    getOrderQuestions,
    getOrderQuestion,
    addOrderQuestion,
    updateOrderQuestion,
    deleteOrderQuestion,
    type GetOrderQuestionsParams,
    type AddOrderQuestionPayload,
    type UpdateOrderQuestionPayload,
    type GetOrderQuestionsResponse,
    type SingleOrderQuestionResponse,
    type MutationResponse,
} from "./orderQuestions";

export const orderQuestionsKeys = {
    all: ["order-questions"] as const,
    list: (params: GetOrderQuestionsParams) => [...orderQuestionsKeys.all, "list", params] as const,
    detail: (id: number) => [...orderQuestionsKeys.all, "detail", id] as const,
};

export const useGetOrderQuestions = (params: GetOrderQuestionsParams) => {
    return useQuery<GetOrderQuestionsResponse, AxiosError>({
        queryKey: orderQuestionsKeys.list(params),
        queryFn: () => getOrderQuestions(params),
    });
};

export const useGetOrderQuestion = (id: number) => {
    return useQuery<SingleOrderQuestionResponse, AxiosError>({
        queryKey: orderQuestionsKeys.detail(id),
        queryFn: () => getOrderQuestion(id),
        enabled: !!id,
    });
};

export const useAddOrderQuestion = (options?: any) => {
    return useMutation<MutationResponse, AxiosError, AddOrderQuestionPayload>({
        mutationFn: addOrderQuestion,
        ...options,
    });
};

export const useUpdateOrderQuestion = (options?: any) => {
    return useMutation<MutationResponse, AxiosError, { id: number; data: UpdateOrderQuestionPayload }>({
        mutationFn: ({ id, data }) => updateOrderQuestion(id, data),
        ...options,
    });
};

export const useDeleteOrderQuestion = (options?: any) => {
    return useMutation<MutationResponse, AxiosError, number>({
        mutationFn: deleteOrderQuestion,
        ...options,
    });
};

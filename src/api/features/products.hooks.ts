import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useGet } from "../useGetData";
import {
    getCategories,
    getProducts,
    getProductDetail,
    createOrder,
    getOrders,
    getOrderDetail,
    type GetCategoriesParams,
    type GetProductsParams,
    type GetProductDetailParams,
    type CreateOrderPayload,
    type GetOrdersParams,
} from "./products";

export const useGetCategories = (params?: GetCategoriesParams, options?: any) => {
    return useGet({
        queryFn: () => getCategories(params),
        queryKey: ["categories", params],
        options,
    });
};

export const useGetProducts = (params?: GetProductsParams, options?: any) => {
    return useGet({
        queryFn: () => getProducts(params),
        queryKey: ["products", params],
        options,
    });
};

export const useGetProductDetail = (id: number, params?: GetProductDetailParams, options?: any) => {
    return useGet({
        queryFn: () => getProductDetail(id, params),
        queryKey: ["product-detail", id, params],
        options,
    });
};

export const useGetOrders = (params?: GetOrdersParams, options?: any) => {
    return useGet({
        queryFn: () => getOrders(params),
        queryKey: ["orders", params],
        options,
    });
};

export const useGetOrderDetail = (id: number, options?: any) => {
    return useGet({
        queryFn: () => getOrderDetail(id),
        queryKey: ["order-detail", id],
        options,
    });
};

export const useCreateOrder = (options?: any) => {
    const queryClient = useQueryClient();
    return useMutation<any, AxiosError, CreateOrderPayload>({
        mutationFn: (data: CreateOrderPayload) => createOrder(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
        ...options,
    });
};

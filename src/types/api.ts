import type { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export interface UseGetDataOptions {
    route: string;
    params?: any;
    enabled?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
}

export interface UsePatchDataOptions {
    route?: string;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
}

export interface UsePutDataOptions {
    route?: string;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
}

export interface PaginationOptions {
    enabled?: boolean;
    defaultPage?: number;
    defaultPerPage?: number;
}

export type UsePutProps<TResponse, TPayload> = {
  route: string;
  params?: any;
  options?: UseMutationOptions<TResponse, AxiosError, TPayload>;
};
export type UsePostProps<TResponse, TPayload> = {
  route: string;
  params?: any;
  options?: UseMutationOptions<TResponse, AxiosError, TPayload>;
};
export type UsePatchProps<TResponse, TPayload> = {
  route: string;
  params?: any;
  options?: UseMutationOptions<TResponse, AxiosError, TPayload>;
};
export type UseGetProps<TData> = {
  queryKey: any[];
  route: string;
  params?: any;
  options?: UseQueryOptions<TData, AxiosError>;
};
export type UseDeleteProps<TResponse, TPayload> = {
  route: string;
  params?: any;
  options?: UseMutationOptions<TResponse, AxiosError, TPayload>;
};
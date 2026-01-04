import { useMutation } from "@tanstack/react-query";
import { AxiosError, type AxiosResponse,  } from "axios";
import { deleteService } from "./service/service-requests";
import type { UseDeleteProps } from "../types/api";

export const useDelete = <TResponse = any, TPayload = any>({
  route,
  params,
  options,
}: UseDeleteProps<TResponse, TPayload>) => {
    return useMutation<TResponse, AxiosError, TPayload>({
        mutationFn: async (data?: TPayload) => {
        const res: AxiosResponse<TResponse> = await deleteService(route, data, params);
        return res.data;
        },
        ...options,
    });
};

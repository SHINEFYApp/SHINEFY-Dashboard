import { useMutation } from "@tanstack/react-query";
import { AxiosError, type AxiosResponse,  } from "axios";
import { putService } from "./service/service-requests";
import type { UsePutProps } from "../types/api";

export const usePut = <TResponse = any, TPayload = any>({
  route,
  params,
  options,
}: UsePutProps<TResponse, TPayload>) => {
    return useMutation<TResponse, AxiosError, TPayload>({
        mutationFn: async (data: TPayload) => {
        const res: AxiosResponse<TResponse> = await putService(route, data, params);
        return res.data;
        },
        ...options,
    });
};

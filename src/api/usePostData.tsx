import { useMutation } from "@tanstack/react-query";
import { AxiosError, type AxiosResponse,  } from "axios";
import { postService } from "./service/service-requests";
import type { UsePostProps } from "../types/api";


export const usePost = <TResponse = any , TPayload = any>({
  route,
  params,
  options,
}: UsePostProps<TResponse, TPayload>) => {
    return useMutation<TResponse, AxiosError, TPayload>({
        mutationFn: async (data: TPayload) => {
        const res: AxiosResponse<TResponse> = await postService(route, data, params);
            return res.data;
        },
        ...options,
    });
};

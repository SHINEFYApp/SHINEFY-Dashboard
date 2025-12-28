import { useMutation } from "@tanstack/react-query";
import { AxiosError, type AxiosResponse,  } from "axios";
import { patchService } from "./service/service-requests";
import type { UsePatchProps } from "../types/api";

export const usePatch = <TResponse = any, TPayload = any>({
  route,
  params,
  options,
}: UsePatchProps<TResponse, TPayload>) => {
    return useMutation<TResponse, AxiosError, TPayload>({
        mutationFn: async (data: TPayload) => {
        const res: AxiosResponse<TResponse> = await patchService(route, data, params);
        return res.data;
        },
        ...options,
    });
};

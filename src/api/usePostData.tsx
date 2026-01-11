import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { postService } from "./service/service-requests";

interface UsePostProps<TResponse, TPayload> {
  route: string;
  params?: any;
  options?: UseMutationOptions<
    TResponse,
    AxiosError,
    TPayload,
    unknown
  >;
}

export const usePost = <TResponse, TPayload>({
  route,
  params,
  options,
}: UsePostProps<TResponse, TPayload>) => {
  return useMutation<TResponse, AxiosError, TPayload>({
    mutationFn: async (payload: TPayload) => {
      const res: AxiosResponse<TResponse> = await postService(
        route,
        payload,
        params
      );
      return res.data;
    },
    ...options,
  });
};

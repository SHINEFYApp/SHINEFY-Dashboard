import { useQuery } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { getService } from "./service/service-requests";

interface UseGetProps<T> {
  route: string;
  queryKey: unknown[];
  params?: any;
  options?: any;
}

export const useGet = <T = any>({
  route,
  queryKey,
  params,
  options,
}: UseGetProps<T>) => {
  return useQuery<T, AxiosError>({
    queryKey,
    queryFn: async () => {
      const res: AxiosResponse<T> = await getService<T>(route, params);
      return res.data;
    },
    refetchInterval: 1000 * 10,
    ...options,
  });
};

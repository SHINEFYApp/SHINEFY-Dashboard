import { useQuery } from "@tanstack/react-query";
import { AxiosError, type AxiosResponse,  } from "axios";
import { getService } from "./service/service-requests";
import type { UseGetProps } from "../types/api";

export const useGet = <TData = any>({
  queryKey,
  route,
  params,
  options,
}: UseGetProps<TData>) => {
  return useQuery<TData, AxiosError>({
    queryKey,
    queryFn: async () => {
      const res: AxiosResponse<TData> = await getService(route, params);
      return res.data;
    },
    refetchInterval: 1000 * 10 ,
    ...options,
  });
};



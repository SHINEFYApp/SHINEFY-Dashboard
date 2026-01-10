import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

interface UseGetProps<T> {
  queryKey: unknown[];
  queryFn: () => Promise<T>;
  options?: any;
}

export const useGet = <T = any>({
  queryFn,
  queryKey,
  options,
}: UseGetProps<T>) => {
  return useQuery<T, AxiosError>({
    queryFn ,
    queryKey,
    refetchInterval: 1000 * 10,
    ...options,
  });
};

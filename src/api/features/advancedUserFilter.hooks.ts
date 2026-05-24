import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useGet } from "../useGetData";
import {
    getAdvancedFilterUsers,
    exportAdvancedFilterUsers,
    type AdvancedFilterParams,
} from "./advancedUserFilter.services";

export const useGetAdvancedFilterUsers = (params: AdvancedFilterParams, options?: any) => {
    return useGet({
        queryFn: () => getAdvancedFilterUsers(params),
        queryKey: ["advanced-filter-users", params],
        options,
    });
};

export const useExportAdvancedFilterUsers = (options?: any) => {
    return useMutation<any, AxiosError, AdvancedFilterParams>({
        mutationFn: (params: AdvancedFilterParams) => exportAdvancedFilterUsers(params),
        ...options,
    });
};

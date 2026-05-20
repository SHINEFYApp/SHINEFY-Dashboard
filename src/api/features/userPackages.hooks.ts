import { useGet } from "../useGetData";
import {
    getUserPackages,
    type GetUserPackagesParams,
} from "./userPackages";

export const useGetUserPackages = (params: GetUserPackagesParams, options?: any) => {
    return useGet({
        queryFn: () => getUserPackages(params),
        queryKey: ["user-packages", params],
        options,
    });
};

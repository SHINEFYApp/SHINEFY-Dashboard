import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
    addUserVehicle,
    getUserVehicles,
    getModelsByMake,
    getMakesList,
    getColorsList,
    getCategoriesList,
} from "./manageVehicles.services";
import type {
    StoreVehiclePayload,
    VehicleLookupsPayload,
    MakesParams,
    ColorsParams,
    CategoriesParams,
} from "./manageVehicles.services";

// Query Keys
export const vehicleKeys = {
    makes: ["makes-list"] as const,
    models: (makeId: number) => ["models-by-make", makeId] as const,
    colors: ["colors-list"] as const,
    categories: ["categories-list"] as const,
    userVehicles: ["user-vehicles"] as const,
};

// GET Makes List
export const useGetMakesList = (params: MakesParams = {}) => {
    return useQuery({
        queryKey: [...vehicleKeys.makes, params],
        queryFn: () => getMakesList(params),
    });
};

// GET Models by Make
export const useGetModelsByMake = (makeId: number) => {
    return useQuery({
        queryKey: vehicleKeys.models(makeId),
        queryFn: () => getModelsByMake(makeId),
        enabled: !!makeId,
    });
};

// GET Colors List
export const useGetColorsList = (params: ColorsParams = {}) => {
    return useQuery({
        queryKey: [...vehicleKeys.colors, params],
        queryFn: () => getColorsList(params),
    });
};

// GET Categories List
export const useGetCategoriesList = (params: CategoriesParams = {}) => {
    return useQuery({
        queryKey: [...vehicleKeys.categories, params],
        queryFn: () => getCategoriesList(params),
    });
};

// Lookup user vehicles by phone
export const useLookupUserVehicles = () => {
    return useMutation<any, AxiosError, VehicleLookupsPayload>({
        mutationFn: getUserVehicles,
    });
};

// Add user vehicle
export const useAddUserVehicle = () => {
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError, StoreVehiclePayload>({
        mutationFn: addUserVehicle,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: vehicleKeys.userVehicles });
        },
    });
};

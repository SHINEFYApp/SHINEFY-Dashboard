import { useMutation, useQuery } from "@tanstack/react-query";
import {
    getMainAreas,
    getSubAreas,
    getAreaCoordinates,
    addArea,
    editArea,
    deleteArea,
    getNearestAreas,
    updateNearestAreas,
} from "./areas";
import type {
    GetAreasParams,
    AddAreaPayload,
    EditAreaPayload,
    DeleteAreaPayload,
    UpdateNearestAreasPayload
} from "./areas";
import { AxiosError } from "axios";

// Keys
export const areasKeys = {
    allMain: ["main-areas"] as const,
    allSub: ["sub-areas"] as const,
    coordinates: (id: number, type: string) => ["area-coordinates", id, type] as const,
    nearest: (id: number) => ["nearest-areas", id] as const,
};

// GET Main Areas
export const useGetMainAreas = (params: GetAreasParams) => {
    return useQuery({
        queryKey: [...areasKeys.allMain, params],
        queryFn: () => getMainAreas(params),
    });
};

// GET Sub Areas
export const useGetSubAreas = (params: GetAreasParams) => {
    return useQuery({
        queryKey: [...areasKeys.allSub, params],
        queryFn: () => getSubAreas(params),
    });
};

// GET Coordinates
export const useGetAreaCoordinates = (id: number, area_type: 'main_area' | 'sub_area') => {
    return useQuery({
        queryKey: areasKeys.coordinates(id, area_type),
        queryFn: () => getAreaCoordinates(id, area_type),
        enabled: !!id,
    });
};

// ADD Area
export const useAddArea = (options?: any) => {
    return useMutation<any, AxiosError, AddAreaPayload>({
        mutationFn: addArea,
        ...options,
    });
};

// EDIT Area
export const useEditArea = (options?: any) => {
    return useMutation<any, AxiosError, EditAreaPayload>({
        mutationFn: editArea,
        ...options,
    });
};

// DELETE Area
export const useDeleteArea = (options?: any) => {
    return useMutation<any, AxiosError, DeleteAreaPayload>({
        mutationFn: deleteArea,
        ...options,
    });
};

// GET Nearest Areas
export const useGetNearestAreas = (id: number) => {
    return useQuery({
        queryKey: areasKeys.nearest(id),
        queryFn: () => getNearestAreas(id),
        enabled: !!id,
    });
};

// UPDATE Nearest Areas
export const useUpdateNearestAreas = (options?: any) => {
    return useMutation<any, AxiosError, UpdateNearestAreasPayload>({
        mutationFn: updateNearestAreas,
        ...options,
    });
};

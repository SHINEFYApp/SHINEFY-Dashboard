import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useGet } from "../useGetData";
import {
    getGroups,
    addGroup,
    editGroup,
    deleteGroup,
    exportGroups,
    type GroupsParams,
    type AddGroupParams,
    type EditGroupParams,
    type DeleteGroupParams,
    type ExportGroupsParams,
} from "./groups.services";

// Get groups list
export const useGetGroups = (params: GroupsParams, options?: any) => {
    return useGet({
        queryFn: () => getGroups(params),
        queryKey: ["groups", params],
        options,
    });
};

// Add group
export const useAddGroup = (options?: any) => {
    return useMutation<any, AxiosError, AddGroupParams>({
        mutationFn: (params: AddGroupParams) => addGroup(params),
        ...options,
    });
};

// Edit group
export const useEditGroup = (options?: any) => {
    return useMutation<any, AxiosError, EditGroupParams>({
        mutationFn: (params: EditGroupParams) => editGroup(params),
        ...options,
    });
};

// Delete group
export const useDeleteGroup = (options?: any) => {
    return useMutation<any, AxiosError, DeleteGroupParams>({
        mutationFn: (params: DeleteGroupParams) => deleteGroup(params),
        ...options,
    });
};

// Export groups
export const useExportGroups = (options?: any) => {
    return useMutation<any, AxiosError, ExportGroupsParams>({
        mutationFn: (params: ExportGroupsParams) => exportGroups(params),
        ...options,
    });
};

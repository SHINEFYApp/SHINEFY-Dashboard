import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getUserTags,
    createUserTag,
    updateUserTag,
    deleteUserTag,
    assignUserTags,
    getUserTagsByUserId,
} from "./userTags";

export const useGetUserTags = () =>
    useQuery({ queryKey: ["user-tags"], queryFn: getUserTags });

export const useGetUserTagsByUserId = (userId: number | null) =>
    useQuery({
        queryKey: ["user-tags", "user", userId],
        queryFn: () => getUserTagsByUserId(userId!),
        enabled: !!userId,
    });

export const useCreateUserTag = (options?: any) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: createUserTag,
        onSuccess: (...args) => {
            qc.invalidateQueries({ queryKey: ["user-tags"] });
            options?.onSuccess?.(...args);
        },
        onError: options?.onError,
    });
};

export const useUpdateUserTag = (options?: any) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: { name?: string; color?: string } }) =>
            updateUserTag(id, data),
        onSuccess: (...args) => {
            qc.invalidateQueries({ queryKey: ["user-tags"] });
            options?.onSuccess?.(...args);
        },
        onError: options?.onError,
    });
};

export const useDeleteUserTag = (options?: any) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: deleteUserTag,
        onSuccess: (...args) => {
            qc.invalidateQueries({ queryKey: ["user-tags"] });
            qc.invalidateQueries({ queryKey: ["users"] });
            options?.onSuccess?.(...args);
        },
        onError: options?.onError,
    });
};

export const useAssignUserTags = (options?: any) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, tagIds }: { userId: number; tagIds: number[] }) =>
            assignUserTags(userId, tagIds),
        onSuccess: (...args) => {
            qc.invalidateQueries({ queryKey: ["user-tags"] });
            qc.invalidateQueries({ queryKey: ["users"] });
            options?.onSuccess?.(...args);
        },
        onError: options?.onError,
    });
};

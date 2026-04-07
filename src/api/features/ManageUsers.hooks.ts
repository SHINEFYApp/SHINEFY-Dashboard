import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useGet } from "../useGetData";
import {
    getUsersList,
    exportUsers,
    getUserDetails,
    getUserBookingHistory,
    getUserVehicles,
    getUserLocations,
    getUserWalletHistory,
    getUserPackages,
    editUserStatus,
    editOtpStatus,
    type UsersParams,
    type ExportUsersPayload,
    type UserDetailsParams,
    type BookingHistoryParams,
    type WalletHistoryParams,
    type UserPackagesParams,
    type StatusUpdateParams,
    addUserLocation,
    editUserLocation,
    editUserVehicle,
    type AddLocationParams,
    type EditLocationParams,
    type EditVehicleParams
} from "./ManageUsers.services";

// Get all users
export const useGetUsers = (params: UsersParams, options?: any) => {
    return useGet({
        queryFn: () => getUsersList(params),
        queryKey: ["users", params],
        options
    });
};

// Export users (Mutation)
export const useExportUsers = (options?: any) => {
    return useMutation<any, AxiosError, ExportUsersPayload>({
        mutationFn: (data: ExportUsersPayload) => exportUsers(data),
        ...options
    });
};

// Get user details
export const useUserDetails = (params: UserDetailsParams, options?: any) => {
    return useGet({
        queryFn: () => getUserDetails(params),
        queryKey: ["user-details", params.user_id],
        options
    });
};

// Get user booking history
export const useUserBookingHistory = (params: BookingHistoryParams, options?: any) => {
    return useGet({
        queryFn: () => getUserBookingHistory(params),
        queryKey: ["user-booking-history", params],
        options
    });
};

// Get user vehicles
export const useUserVehicles = (params: { user_id: number | string }, options?: any) => {
    return useGet({
        queryFn: () => getUserVehicles(params),
        queryKey: ["user-vehicles", params.user_id],
        options
    });
};

// Get user locations
export const useUserLocations = (params: { user_id: number | string }, options?: any) => {
    return useGet({
        queryFn: () => getUserLocations(params),
        queryKey: ["user-locations", params.user_id],
        options
    });
};

// Get user wallet history
export const useUserWalletHistory = (params: WalletHistoryParams, options?: any) => {
    return useGet({
        queryFn: () => getUserWalletHistory(params),
        queryKey: ["user-wallet-history", params],
        options
    });
};

// Get user packages
export const useUserPackages = (params: UserPackagesParams, options?: any) => {
    return useGet({
        queryFn: () => getUserPackages(params),
        queryKey: ["user-packages", params],
        options
    });
};

// Edit user status (Mutation)
export const useEditUserStatus = (options?: any) => {
    return useMutation<any, AxiosError, StatusUpdateParams>({
        mutationFn: (params: StatusUpdateParams) => editUserStatus(params),
        ...options
    });
};

// Edit OTP status (Mutation)
export const useEditOtpStatus = (options?: any) => {
    return useMutation<any, AxiosError, StatusUpdateParams>({
        mutationFn: (params: StatusUpdateParams) => editOtpStatus(params),
        ...options
    });
};

// Add user location (Mutation)
export const useAddUserLocation = (options?: any) => {
    return useMutation<any, AxiosError, AddLocationParams>({
        mutationFn: (params: AddLocationParams) => addUserLocation(params),
        ...options
    });
};

// Edit user location (Mutation)
export const useEditUserLocation = (options?: any) => {
    return useMutation<any, AxiosError, EditLocationParams>({
        mutationFn: (params: EditLocationParams) => editUserLocation(params),
        ...options
    });
};

// Edit user vehicle (Mutation)
export const useEditUserVehicle = (options?: any) => {
    return useMutation<any, AxiosError, EditVehicleParams>({
        mutationFn: (params: EditVehicleParams) => editUserVehicle(params),
        ...options
    });
};

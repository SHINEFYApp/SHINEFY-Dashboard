import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useGet } from "../useGetData";
import {
    getWallets,
    addWallet,
    exportWallets,
    type GetWalletsParams,
    type AddWalletPayload,
    type GetWalletsResponse,
} from "./wallets";

// Get Wallets
export const useGetWallets = (params: GetWalletsParams, options?: any) => {
    return useGet({
        queryFn: () => getWallets(params),
        queryKey: ["wallets", params],
        options,
    });
};

// Add Wallet
export const useAddWallet = (options?: any) => {
    return useMutation<any, AxiosError, AddWalletPayload>({
        mutationFn: (data: AddWalletPayload) => addWallet(data),
        ...options,
    });
};

// Export Wallets
export const useExportWallets = (options?: any) => {
    return useMutation<any, AxiosError, GetWalletsParams>({
        mutationFn: (params: GetWalletsParams) => exportWallets(params),
        ...options,
    });
};

// src/api/features/wallets.ts
import {
    getService,
    postService,
} from "../service/service-requests";

// Interfaces

export interface WalletItem {
    wallet_id: number;
    user_id: number;
    amount_type: string;
    amount: string;
    reason: string;
    name: string; // User Name
    phone_number: string;
    createtime: string;
}

export interface GetWalletsParams {
    search_text?: string;
    page?: number;
    limit?: number;
    start?: number
}

export interface GetWalletsResponse {
    status: string;
    data: {
        wallets: WalletItem[]; // Check if 'wallets' or just array in data
        pagination?: {
            total_items: number;
            total_pages: number;
            current_page: number;
            limit: number;
        };
    };
}

export interface AddWalletPayload {
    phone: string;
    type: string;
    amount: number;
}

// Endpoints

export const getWallets = async (params: GetWalletsParams) => {
    return await getService("/api/getWallet", params);
};

export const addWallet = async (data: AddWalletPayload) => {
    return await postService("/api/addWallet", data);
};

export const exportWallets = async (params: GetWalletsParams) => {
    // Export likely expects params as query string too
    return await postService("/api/ExportWallets", null, params);
};

// src/api/features/wallets.ts
import {
    getService,
    postService,
} from "../service/service-requests";

// Interfaces

export interface WalletItem {
    id: number;
    user_id: number;
    amount: number;
    amount_type: string; // e.g., "Credit"
    type: string; // e.g., "Bonus" or "Main"
    reason: string;
    created_at: string;
    user?: {
        id: number;
        name: string;
        phone: string;
    };
    // Add other fields as needed based on actual API response
}

export interface GetWalletsParams {
    search_text?: string;
    page?: number;
    limit?: number;
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
    user_type: string | number; // 0 for user, 1 for group?
    users?: number[]; // Array of user IDs
    group_id?: number;
    optradio?: string | number; // 0 for amount, 1 for something else?
    bonus_percentage?: number;
    amount?: number; // Depending on 'optradio'
    // The previous request showed 'users' and 'group_id' as optional.
    // The request in Postman: user_type=0, optradio=0, bonus_percentage=1
    // It seems 'addWallet' logic might be complex. 
}

// Endpoints

export const getWallets = async (params: GetWalletsParams) => {
    return await getService("/api/getWallet", { params });
};

export const addWallet = async (data: AddWalletPayload) => {
    // Postman request has query params mixed with body?
    // "raw": "http://127.0.0.1:8000/api/addWallet?user_type=0&optradio=0&bonus_percentage=1"
    // But it's a POST. Usually POST sends data in body. 
    // If query params are forced, we might need to append them to URL.
    // However, typical `postService` sends data as JSON body.
    // Let's assume body for now, or check if we need to send as query params.
    // Validating with user request: params are in 'query' in Postman for POST (which is weird but possible).
    // Let's support both or assume normal body payload first (standard).
    // Updated to send as query parameters based on Postman collection
    return await postService("/api/addWallet", null, data);
};

export const exportWallets = async (params: GetWalletsParams) => {
    // Export likely expects params as query string too
    return await postService("/api/ExportWallets", null, params);
};

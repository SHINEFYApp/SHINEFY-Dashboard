// src/api/features/subAdmins.ts
import {
    getService,
    postService,
    putService,
    deleteService,
} from "../service/service-requests";

// Interfaces

export interface SubAdminItem {
    user_id: number;
    name: string;
    email: string;
    phone_number: string;
    image_url?: string;
    registered_at?: string;
    // Add other fields as per API response
    // Postman doesn't show response body, assumes standard user fields
    active_flag?: number;
    previlages?: number[] | string;
    receive_sms?: number;
}

export interface GetSubAdminsParams {
    limit?: number;
    page?: number;
    search?: string;
}

export interface AddSubAdminPayload {
    name: string;
    email: string;
    phone_number: string;
    previlages: number[]; // Note: Typo in API 'previlages' vs 'privileges'
    receive_sms: boolean;
    password?: string;
    password_confirmation?: string;
}

export interface UpdateSubAdminPayload extends Partial<AddSubAdminPayload> { }

// Endpoints

// GET /api/get/sub/admins
export const getSubAdmins = async (params: GetSubAdminsParams) => {
    return await getService("/api/get/sub/admins", params);
};

// GET /api/view/sub/admin
export const getSubAdminDetails = async (user_id: number | string) => {
    return await getService("/api/view/sub/admin", { user_id });
};

// POST /api/add/sub/admin (FormData - includes image)
export const addSubAdmin = async (formData: FormData) => {
    return await postService("/api/add/sub/admin", formData);
};

// POST /api/edit/sub/admin/{id} (FormData - includes image)
export const updateSubAdmin = async (id: number | string, formData: FormData) => {
    return await postService(`/api/edit/sub/admin/${id}`, formData);
};

// DELETE /api/delete/sub/admin/{id}
export const deleteSubAdmin = async (id: number | string) => {
    return await deleteService(`/api/delete/sub/admin/${id}`);
};

// GET /api/get/sub/admin/privileges
export interface PrivilegeItem {
    id: number;
    value: string;
}

export const getSubAdminPrivileges = async () => {
    return await getService("/api/get/sub/admin/privileges");
};


// Export

export const exportSubAdminsCsv = async (params: any) => {
    return await getService("/api/export/subadmins/csv", params);
};

export const exportSubAdminsExcel = async (params: any) => {
    return await getService("/api/export/sub/admins/excel", params);
};

export const exportSubAdminsPdf = async (params: any) => {
    return await getService("/api/export/sub/admins/pdf", params);
};

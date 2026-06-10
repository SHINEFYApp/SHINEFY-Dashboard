// src/api/features/contactUs.ts
import type { AxiosResponse } from "axios";
import {
    getService,
    postService,
    deleteService,
} from "../service/service-requests";

// ─── Types ───

export interface ContactItem {
    id: number;
    user_id: number;
    user_name: string;
    name: string;
    email: string;
    message: string;
    phone_number: string;
    is_replied: boolean;
    created_at: string;
}

export interface ContactListResponse {
    status: string;
    data: {
        contacts: ContactItem[];
        pagination: {
            total: number;
            per_page: number;
            current_page: number;
            last_page: number;
        };
    };
}

export interface ReplyItem {
    id: number;
    subject: string;
    message: string;
    created_at: string;
}

export interface ContactDetail {
    id: number;
    user_id: number;
    user_name: string;
    user_email: string;
    user_phone: string;
    name: string;
    email: string;
    message: string;
    phone_number: string;
    is_replied: boolean;
    created_at: string;
    replies: ReplyItem[];
}

export interface ContactDetailResponse {
    status: string;
    data: ContactDetail;
}

export interface ContactRepliesResponse {
    status: string;
    data: {
        contact_id: number;
        replies: ReplyItem[];
    };
}

export interface SendReplyPayload {
    subject: string;
    message: string;
}

export interface SendReplyResponse {
    status: string;
    data: {
        message: string;
        reply: ReplyItem;
    };
}

export interface DeleteContactResponse {
    status: string;
    data: {
        message: string;
    };
}

export interface GetContactListParams {
    per_page?: number;
    page?: number;
    search?: string;
}

// ─── Endpoints ───

// GET /contact-us
export const getContactList = async (params: GetContactListParams) => {
    return await getService("/api/contact-us", params);
};

// GET /contact-us/{id}
export const getContactDetail = async (id: number | string) => {
    return await getService(`/api/contact-us/${id}`);
};

// GET /contact-us/{id}/replies
export const getContactReplies = async (id: number | string) => {
    return await getService(`/api/contact-us/${id}/replies`);
};

// POST /contact-us/{id}/reply
export const sendContactReply = async (id: number | string, data: SendReplyPayload) => {
    return await postService(`/api/contact-us/${id}/reply`, data);
};

// DELETE /contact-us/{id}
export const deleteContact = async (id: number | string) => {
    return await deleteService(`/api/contact-us/${id}`);
};

// GET /contact-us/export/csv
export const exportContactCsv = async (params: any) => {
    return await getService("/api/contact-us/export/csv", { params, responseType: "blob" });
};

// GET /contact-us/export/excel
export const exportContactExcel = async (params: any) => {
    return await getService("/api/contact-us/export/excel", { params, responseType: "blob" });
};

// GET /contact-us/export/pdf
export const exportContactPdf = async (params: any) => {
    return await getService("/api/contact-us/export/pdf", { params, responseType: "blob" });
};

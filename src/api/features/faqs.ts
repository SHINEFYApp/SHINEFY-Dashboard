import type { AxiosResponse } from "axios";
import { getService, postService, putService, deleteService } from "../service/service-requests";

export interface FaqItem {
    faq_id: number;
    question_in_english: string;
    question_in_arabic: string;
    answer_in_english: string;
    answer_in_arabic: string;
    created_at?: string;
}

export interface GetFaqsParams {
    page?: number;
    limit?: number;
    search?: string;
}

export interface GetFaqsResponse {
    status: string;
    data: {
        faqs: FaqItem[];
        total: number;
    };
}

export interface AddFaqPayload {
    question_in_english: string;
    question_in_arabic: string;
    answer_in_english: string;
    answer_in_arabic: string;
}

export interface UpdateFaqPayload extends AddFaqPayload {}

export interface SingleFaqResponse {
    status: string;
    data: FaqItem;
}

export interface MutationResponse {
    status: string;
    data: {
        message: string;
        faq_id: number;
        question_in_english?: string;
        question_in_arabic?: string;
        answer_in_english?: string;
        answer_in_arabic?: string;
        deleted?: boolean;
    };
}

export const getFaqs = async (params: GetFaqsParams) => {
    const res: AxiosResponse<GetFaqsResponse> = await getService("/api/faqs", params);
    return res.data;
};

export const getFaq = async (id: number) => {
    const res: AxiosResponse<SingleFaqResponse> = await getService(`/api/viewFaq/${id}`);
    return res.data;
};

export const addFaq = async (data: AddFaqPayload) => {
    const res: AxiosResponse<MutationResponse> = await postService("/api/addFaq", data);
    return res.data;
};

export const updateFaq = async (id: number, data: UpdateFaqPayload) => {
    const res: AxiosResponse<MutationResponse> = await putService(`/api/updateFaq/${id}`, data);
    return res.data;
};

export const deleteFaq = async (id: number) => {
    const res: AxiosResponse<MutationResponse> = await deleteService(`/api/deleteFaq/${id}`);
    return res.data;
};

export const exportFaqs = async (type: "csv" | "excel" | "pdf", search: string = "") => {
    const res: AxiosResponse = await getService(`/api/faqs/export/${type}`, {
        params: { search },
        responseType: "blob",
    });
    return res.data;
};



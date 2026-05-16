import type { AxiosResponse } from "axios";
import { getService, postService, putService, deleteService } from "../service/service-requests";

export interface OrderQuestionItem {
    order_question_id: number;
    order_question_in_english: string;
    order_question_in_arabic: string;
    created_at?: string;
}

export interface GetOrderQuestionsParams {
    page?: number;
    limit?: number;
    search?: string;
}

export interface GetOrderQuestionsResponse {
    status: string;
    data: {
        order_questions: OrderQuestionItem[];
        total: number;
    };
}

export interface AddOrderQuestionPayload {
    order_question_in_english: string;
    order_question_in_arabic: string;
}

export interface UpdateOrderQuestionPayload extends AddOrderQuestionPayload {}

export interface SingleOrderQuestionResponse {
    status: string;
    data: OrderQuestionItem;
}

export interface MutationResponse {
    status: string;
    data: {
        message: string;
        order_question_id?: number;
    };
}

export const getOrderQuestions = async (params: GetOrderQuestionsParams) => {
    const res: AxiosResponse<GetOrderQuestionsResponse> = await getService("/api/order-questions", params);
    return res.data;
};

export const getOrderQuestion = async (id: number) => {
    const res: AxiosResponse<SingleOrderQuestionResponse> = await getService(`/api/order-questions/${id}`);
    return res.data;
};

export const addOrderQuestion = async (data: AddOrderQuestionPayload) => {
    const res: AxiosResponse<MutationResponse> = await postService("/api/order-questions", data);
    return res.data;
};

export const updateOrderQuestion = async (id: number, data: UpdateOrderQuestionPayload) => {
    const res: AxiosResponse<MutationResponse> = await putService(`/api/order-questions/${id}`, data);
    return res.data;
};

export const deleteOrderQuestion = async (id: number) => {
    const res: AxiosResponse<MutationResponse> = await deleteService(`/api/order-questions/${id}`);
    return res.data;
};

import type { AxiosResponse } from "axios";
import {
    getService,
    postService,
} from "../service/service-requests";

// --- Categories ---

export interface CategoryItem {
    id: number;
    name: string;
    active: boolean;
}

export interface GetCategoriesResponse {
    success: boolean;
    data: CategoryItem[];
}

export interface GetCategoriesParams {
    lang?: "en" | "ar";
}

export const getCategories = async (params?: GetCategoriesParams) => {
    const res: AxiosResponse<GetCategoriesResponse> = await getService("/api/v1/categories", { params });
    return res.data;
};

// --- Products ---

export interface ProductCategory {
    id: number;
    name: string;
}

export interface ProductItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
    active: boolean;
    category: ProductCategory;
    created_at: string;
}

export interface GetProductsResponse {
    success: boolean;
    data: ProductItem[];
    meta: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
    };
}

export interface GetProductsParams {
    lang?: "en" | "ar";
    per_page?: number;
    category_id?: number;
    active?: boolean;
    q?: string;
}

export const getProducts = async (params?: GetProductsParams) => {
    const res: AxiosResponse<GetProductsResponse> = await getService("/api/v1/products", { params });
    return res.data;
};

export interface GetProductDetailResponse {
    success: boolean;
    data: ProductItem;
}

export interface GetProductDetailParams {
    lang?: "en" | "ar";
}

export const getProductDetail = async (id: number, params?: GetProductDetailParams) => {
    const res: AxiosResponse<GetProductDetailResponse> = await getService(`/api/v1/products/${id}`, { params });
    return res.data;
};

// --- Orders ---

export interface CreateOrderItem {
    product_id: number;
    qty: number;
}

export interface CreateOrderPayload {
    user_id: number;
    items: CreateOrderItem[];
}

export interface OrderLineItem {
    product_id: number;
    name_en: string;
    name_ar: string;
    qty: number;
    unit_price: number;
    line_total: number;
}

export interface CreateOrderResponse {
    success: boolean;
    data: {
        id: number;
        user_id: number;
        status: string;
        total: number;
        items: OrderLineItem[];
        created_at: string;
    };
}

export const createOrder = async (data: CreateOrderPayload) => {
    const res: AxiosResponse<CreateOrderResponse> = await postService("/api/v1/product-orders", data);
    return res.data;
};

export interface OrderListItem {
    id: number;
    user_id: number;
    status: string;
    total: number;
    items_count: number;
    created_at: string;
}

export interface GetOrdersResponse {
    success: boolean;
    data: OrderListItem[];
    meta: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
    };
}

export interface GetOrdersParams {
    per_page?: number;
}

export const getOrders = async (params?: GetOrdersParams) => {
    const res: AxiosResponse<GetOrdersResponse> = await getService("/api/v1/product-orders", { params });
    return res.data;
};

export interface GetOrderDetailResponse {
    success: boolean;
    data: {
        id: number;
        user_id: number;
        status: string;
        total: number;
        items: OrderLineItem[];
        created_at: string;
    };
}

export const getOrderDetail = async (id: number) => {
    const res: AxiosResponse<GetOrderDetailResponse> = await getService(`/api/v1/product-orders/${id}`);
    return res.data;
};

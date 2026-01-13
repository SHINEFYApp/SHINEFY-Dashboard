import type { AxiosResponse } from "axios";
import { deleteService, getService, postService, putService } from "../service/service-requests";

export interface StoreVehiclePayload {
    user_id: number;
    make_id: number;
    model_id: number;
    color_id: number;
    car_category_id: number;
    plate_number: string;
}

export interface VehicleLookupsPayload {
    phone_number: string;
}

export interface ModelPayload {
    make: number;
    model: string;
    make_name_arabic: string;
}

export interface UpdateModelPayload extends ModelPayload {
    id: number;
}

export interface ModelsParams {
    per_page?: number;
    page?: number;
    make_id?: number;
    search?: string;
}

export interface MakePayload {
    make: string;
    make_name_arabic: string;
    image: any; // Can be File or string
}

export interface UpdateMakePayload extends MakePayload {
    id: number;
}

export interface MakesParams {
    per_page?: number;
    page?: number;
    search?: string;
}

export interface ColorPayload {
    color_code: string;
    color_name: string;
    color_name_arabic: string;
}

export interface UpdateColorPayload extends ColorPayload {
    id: number;
}

export interface ColorsParams {
    per_page?: number;
    page?: number;
    search?: string;
}

export interface CategoryPayload {
    category_name: string;
    category_name_arabic: string;
    image: any; // Can be File or string
}

export interface UpdateCategoryPayload extends CategoryPayload {
    id: number;
}

export interface CategoriesParams {
    per_page?: number;
    page?: number;
    search?: string;
}

export const addUserVehicle = async (data: StoreVehiclePayload) => {
    const res: AxiosResponse = await postService("/admin/api/vehicles/store", data);
    return res.data;
};

export const getUserVehicles = async (data: VehicleLookupsPayload) => {
    const res: AxiosResponse = await postService("/admin/api/vehicles/lookups", data);
    return res.data;
};

export const getModelsByMake = async (makeId: number) => {
    const res: AxiosResponse = await getService(`/admin/api/vehicles/models/${makeId}`);
    return res.data;
}

export const getModelsList = async (params: ModelsParams) => {
    const res: AxiosResponse = await getService("/admin/api/models", params);
    return res.data;
}

export const addModel = async (data: ModelPayload) => {
    const res: AxiosResponse = await postService("/admin/api/models", data);
    return res.data;
}

export const updateModel = async (data: UpdateModelPayload) => {
    const res: AxiosResponse = await putService("/admin/api/models", data);
    return res.data;
}

export const deleteModel = async (modelId: number) => {
    const res: AxiosResponse = await deleteService(`/api/models/${modelId}`);
    return res.data;
}

export const getMakesList = async (params: MakesParams) => {
    const res: AxiosResponse = await getService("/admin/api/makes", params);
    return res.data;
}

export const addMake = async (data: MakePayload | FormData) => {
    const res: AxiosResponse = await postService("/admin/api/makes", data);
    return res.data;
}

export const updateMake = async (data: UpdateMakePayload | FormData) => {
    const res: AxiosResponse = await putService("/admin/api/makes", data);
    return res.data;
}

export const deleteMake = async (makeId: number) => {
    const res: AxiosResponse = await deleteService(`/admin/api/makes/${makeId}`);
    return res.data;
}

export const getColorsList = async (params: ColorsParams) => {
    const res: AxiosResponse = await getService("/admin/api/colors", params);
    return res.data;
}

export const addColor = async (data: ColorPayload) => {
    const res: AxiosResponse = await postService("/admin/api/colors", data);
    return res.data;
}

export const updateColor = async (data: UpdateColorPayload) => {
    const res: AxiosResponse = await putService("/admin/api/colors", data);
    return res.data;
}

export const deleteColor = async (colorId: number) => {
    const res: AxiosResponse = await deleteService(`/admin/api/colors/${colorId}`);
    return res.data;
}

export const getCategoriesList = async (params: CategoriesParams) => {
    const res: AxiosResponse = await getService("/admin/api/categories", params);
    return res.data;
}

export const addCategory = async (data: CategoryPayload | FormData) => {
    const res: AxiosResponse = await postService("/admin/api/categories", data);
    return res.data;
}

export const updateCategory = async (data: UpdateCategoryPayload | FormData) => {
    const res: AxiosResponse = await putService("/admin/api/categories", data);
    return res.data;
}

export const deleteCategory = async (categoryId: number) => {
    const res: AxiosResponse = await deleteService(`/admin/api/categories/${categoryId}`);
    return res.data;
}


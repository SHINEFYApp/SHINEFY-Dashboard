import type { AxiosResponse } from 'axios';
import axiosInstance from './axios';

// GET Request
export const getService = async (route: string, params?: any): Promise<AxiosResponse> => {
    return await axiosInstance.get(route, { params });
};

// POST Request
export const postService = async (route: string, data?: any, params?: any): Promise<AxiosResponse> => {
    return await axiosInstance.post(route, data, { params });
};

// PUT Request
export const putService = async (route: string, data?: any, params?: any): Promise<AxiosResponse> => {
    return await axiosInstance.put(route, data, { params });
};

// PATCH Request
export const patchService = async (route: string, data?: any, params?: any): Promise<AxiosResponse> => {
    return await axiosInstance.patch(route, data, { params });
};

// DELETE Request
export const deleteService = async (route: string, data?: any, params?: any): Promise<AxiosResponse> => {
    return await axiosInstance.delete(route, { params, data });
};

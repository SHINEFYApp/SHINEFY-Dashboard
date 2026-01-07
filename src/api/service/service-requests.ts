import type { AxiosResponse } from "axios";
import api from "./axios";

// GET
export const getService = async <T = any>(
  route: string,
  params?: any
): Promise<AxiosResponse<T>> => api.get(route, { params });

// POST
export const postService = async <T = any>(
  route: string,
  data?: any,
  params?: any
): Promise<AxiosResponse<T>> => api.post(route, data, { params });

// PUT
export const putService = async <T = any>(
  route: string,
  data?: any,
  params?: any
): Promise<AxiosResponse<T>> => api.put(route, data, { params });

// PATCH
export const patchService = async <T = any>(
  route: string,
  data?: any,
  params?: any
): Promise<AxiosResponse<T>> => api.patch(route, data, { params });

// DELETE
export const deleteService = async <T = any>(
  route: string,
  data?: any,
  params?: any
): Promise<AxiosResponse<T>> => api.delete(route, { data, params });

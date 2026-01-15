import type { AxiosResponse } from "axios";
import api from "./axios";

// GET
export const getService = async <T = any>(
  route: string,
  config?: any
): Promise<AxiosResponse<T>> => {
  const finalConfig = config?.params ? config : { params: config };
  return api.get(route, finalConfig);
};

// POST
export const postService = async <T = any>(
  route: string,
  data?: any,
  config?: any
): Promise<AxiosResponse<T>> => {
  const finalConfig = config?.params || config?.responseType ? config : { params: config };
  return api.post(route, data, finalConfig);
};

// PUT
export const putService = async <T = any>(
  route: string,
  data?: any,
  config?: any
): Promise<AxiosResponse<T>> => {
  const finalConfig = config?.params || config?.responseType ? config : { params: config };
  return api.put(route, data, finalConfig);
};

// PATCH
export const patchService = async <T = any>(
  route: string,
  data?: any,
  config?: any
): Promise<AxiosResponse<T>> => {
  const finalConfig = config?.params || config?.responseType ? config : { params: config };
  return api.patch(route, data, finalConfig);
};

// DELETE
export const deleteService = async <T = any>(
  route: string,
  data?: any,
  config?: any
): Promise<AxiosResponse<T>> => {
  const finalConfig = config?.params || config?.data || config?.responseType ? config : { data, params: config };
  return api.delete(route, finalConfig);
};

import type { AxiosResponse } from "axios";
import {
    getService,
    postService,
    deleteService,
    patchService,
} from "../service/service-requests";
import api from "../service/axios";
import type { GetAdsParams } from "../../types/ads";

export const getAds = async (params: GetAdsParams) => {
    const res: AxiosResponse = await getService("/api/ads", params);
    return res.data;
};

export const getAdDetails = async (id: number | string) => {
    const res: AxiosResponse = await getService(`/api/ads/${id}`);
    return res.data;
};

export const addAd = async (data: FormData) => {
    const res: AxiosResponse = await postService("/api/ads", data);
    return res.data;
};

export const updateAd = async (id: number | string, data: FormData) => {
    const res: AxiosResponse = await api.post(`/api/ads/${id}`, data, {
        headers: { "X-HTTP-Method-Override": "PUT" },
    });
    return res.data;
};

export const deleteAdItem = async (id: number | string) => {
    const res: AxiosResponse = await deleteService(`/api/ads/${id}`);
    return res.data;
};

export const toggleAdStatus = async (id: number | string) => {
    const res: AxiosResponse = await patchService(`/api/ads/${id}/toggle-status`);
    return res.data;
};

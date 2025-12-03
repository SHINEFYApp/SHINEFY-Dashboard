'use client';

import { useState } from 'react';
import { type AxiosResponse, AxiosError } from 'axios';
import { postService } from './service/service-requests';

export const usePostData = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<AxiosResponse | null>(null);
    const [error, setError] = useState<AxiosError | null>(null);

    const postData = async (route: string, payload: any, params?: any) => {
        try {
            setLoading(true);
            setError(null);

            const res = await postService(route, payload, params);
            setData(res);

            return res;
        } catch (err) {
            const axiosError = err as AxiosError;
            setError(axiosError);
            throw axiosError;
        } finally {
            setLoading(false);
        }
    };

    return { loading, data, error, postData, setData };
};

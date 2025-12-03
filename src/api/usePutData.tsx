'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { type AxiosResponse, AxiosError } from 'axios';
import { putService } from './service/service-requests';
import type { UsePutDataOptions } from '../types/api';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout } from '../redux/slices/authSlice';

export const usePutData = ({ onSuccess, onError }: UsePutDataOptions = {}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<any>(null);

    const router = useRouter();
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    // Use refs for callbacks
    const onSuccessRef = useRef(onSuccess);
    const onErrorRef = useRef(onError);

    useEffect(() => {
        onSuccessRef.current = onSuccess;
        onErrorRef.current = onError;
    }, [onSuccess, onError]);

    const handleLogout = useCallback(() => {
        dispatch(logout());
        router.push('/login');
    }, [dispatch, router]);

    const putData = useCallback(async (
        route: string,
        submitData: any,
        options?: {
            onSuccess?: (data: any) => void;
            onError?: (error: any) => void;
        }
    ) => {
        if (!isAuthenticated) {
            const authError = new Error('Not authenticated');
            if (options?.onError) options.onError(authError);
            if (onErrorRef.current) onErrorRef.current(authError);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const res: AxiosResponse = await putService(route, submitData);
            setData(res.data);

            if (options?.onSuccess) options.onSuccess(res.data);
            if (onSuccessRef.current) onSuccessRef.current(res.data);

            return res;
        } catch (err) {
            const axiosError = err as AxiosError;
            setError(axiosError);

            const status = axiosError?.response?.status;
            if (status === 401 || status === 403) {
                handleLogout();
            }

            if (options?.onError) options.onError(axiosError);
            if (onErrorRef.current) onErrorRef.current(axiosError);

            throw axiosError;
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, handleLogout]);

    return {
        putData,
        loading,
        error,
        data,
    };
};

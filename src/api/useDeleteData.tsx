'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { type AxiosResponse, AxiosError } from 'axios';
import { deleteService } from './service/service-requests';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout } from '../redux/slices/authSlice';

export const useDeleteData = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    const router = useRouter();
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    const handleLogout = useCallback(() => {
        dispatch(logout());
        router.push('/login');
    }, [dispatch, router]);

    const deleteData = useCallback(async (route: string, deletePayload?: any, params?: any) => {
        if (!isAuthenticated) {
            throw new Error('Not authenticated');
        }

        try {
            setLoading(true);
            setError(null);

            const res: AxiosResponse = await deleteService(route, deletePayload, params);
            setData(res.data);

            return res;
        } catch (err) {
            const axiosError = err as AxiosError;
            setError(axiosError);

            const status = axiosError?.response?.status;
            if (status === 401 || status === 403) {
                handleLogout();
            }

            throw axiosError;
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, handleLogout]);

    return {
        loading,
        data,
        error,
        deleteData,
    };
};

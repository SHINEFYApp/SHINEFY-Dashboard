'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { type AxiosResponse, AxiosError } from 'axios';
import { getService } from './service/service-requests';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout } from '../redux/slices/authSlice';
import type { PaginationOptions, UseGetDataOptions } from '../types/api';

export const useGetData = ({
    route,
    params = {},
    enabled = true,
    onSuccess,
    onError,
    pagination,
}: UseGetDataOptions & { pagination?: PaginationOptions; }) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    // Pagination state
    const paginationEnabled = pagination?.enabled || false;
    const currentPage = paginationEnabled
        ? Number(searchParams.get('page')) || pagination?.defaultPage || 1
        : 1;
    const perPage = paginationEnabled
        ? Number(searchParams.get('per_page')) || pagination?.defaultPerPage || 10
        : 10;

    const handleLogout = useCallback(() => {
        dispatch(logout());
        router.push('/login');
    }, [dispatch, router]);

    const paramsString = JSON.stringify(params);

    const fetchData = useCallback(async () => {
        if (!enabled || !isAuthenticated) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // Merge pagination params if enabled
            const currentParams = JSON.parse(paramsString);
            const finalParams = paginationEnabled
                ? { ...currentParams, page: currentPage, per_page: perPage }
                : currentParams;

            const res: AxiosResponse = await getService(route, finalParams);
            setData(res.data);

            if (onSuccess) onSuccess(res.data);
        } catch (err) {
            const axiosError = err as AxiosError;
            setError(axiosError);

            const status = axiosError?.response?.status;
            if (status === 401 || status === 403) {
                handleLogout();
            }

            if (onError) onError(axiosError);
        } finally {
            setLoading(false);
        }
    }, [
        route,
        enabled,
        paramsString,
        paginationEnabled,
        currentPage,
        perPage,
        isAuthenticated,
        onSuccess,
        onError,
        handleLogout
    ]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Pagination helpers
    const updatePage = useCallback((page: number) => {
        if (!paginationEnabled) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        params.set('per_page', perPage.toString());
        router.push(`?${params.toString()}`, { scroll: false });
    }, [paginationEnabled, perPage, router, searchParams]);

    const updatePerPage = useCallback((newPerPage: number) => {
        if (!paginationEnabled) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set('page', '1'); // Reset to first page
        params.set('per_page', newPerPage.toString());
        router.push(`?${params.toString()}`, { scroll: false });
    }, [paginationEnabled, router, searchParams]);

    const updatePageAndSize = useCallback((page: number, pageSize: number) => {
        if (!paginationEnabled) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        params.set('per_page', pageSize.toString());
        router.push(`?${params.toString()}`, { scroll: false });
    }, [paginationEnabled, router, searchParams]);

    return {
        data,
        loading,
        error,
        refetch: fetchData,
        setData,
        // Pagination specific
        ...(paginationEnabled && {
            currentPage,
            perPage,
            updatePage,
            updatePerPage,
            updatePageAndSize,
        }),
    };
};

export interface UseGetDataOptions {
    route: string;
    params?: any;
    enabled?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
}

export interface UsePatchDataOptions {
    route?: string;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
}

export interface UsePutDataOptions {
    route?: string;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
}

export interface PaginationOptions {
    enabled?: boolean;
    defaultPage?: number;
    defaultPerPage?: number;
}
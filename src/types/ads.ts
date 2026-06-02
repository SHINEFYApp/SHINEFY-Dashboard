export interface AdItem {
    id: number;
    title: string;
    type: string;
    description: string;
    image: string;
    start_date: string;
    end_date: string;
    status: string;
    is_active: number;
    created_at: string;
    updated_at: string;
}

export interface GetAdsPagination {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

export interface GetAdsResponse {
    status: string;
    data: {
        ads: AdItem[];
        pagination: GetAdsPagination;
    };
}

export interface GetAdsParams {
    start?: number;
    length?: number;
    search?: string;
    type?: string;
    is_active?: string;
}

export interface AdDetailResponse {
    status: string;
    data: {
        ad: AdItem;
    };
}

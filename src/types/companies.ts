export interface CompanyItem {
    id: number;
    name: string;
    code: string;
    email_extension: string | null;
    num_of_users: number;
    percentage: number;
    company_benefit_percentage: number;
    apply_on_services: boolean;
    apply_on_extra_services: boolean;
    start_date: string;
    end_date: string;
    created_at: string;
    services_ids?: number[];
    extra_services_ids?: number[];
}

export interface CompanyPagination {
    current_page: number;
    total_pages: number;
    total_items: number;
    limit: number;
}

export interface CompanyListResponse {
    status: string;
    data: {
        data: CompanyItem[];
        pagination: CompanyPagination;
    };
}

export interface CompanyDetailData {
    company: CompanyItem;
    bookings: { date_type: string; total_operations: number }[];
    users: { date_type: string; total: number }[];
}

export interface CompanyDetailResponse {
    status: string;
    data: CompanyDetailData;
}

export interface CompanyMutationResponse {
    status: string;
    data: CompanyItem;
}

export interface CompanyChartResponse {
    status: string;
    data: {
        bookings?: { date_type: string; total_operations: number }[];
        users?: { date_type: string; total: number }[];
    };
}

export interface CompanyFormValues {
    name: string;
    email_extension: string;
    code: string;
    num_of_users: string;
    percentage: string;
    company_benefit_percentage: string;
    apply_on_services: string;
    apply_on_extra_services: string;
    start_date: string;
    end_date: string;
    services_ids: string;
    extra_services_ids: string;
}

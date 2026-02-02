import type { AxiosResponse } from "axios";
import {
    getService,
    postService,
    putService,
    deleteService,
} from "../service/service-requests";

// Interfaces

export interface ServiceItem {
    service_id: number;
    quantity: number;
}

export interface ExtraServiceItem {
    extra_service_id: number;
    quantity: number;
}

export interface AddPackagePayload {
    name: string;
    name_ar: string;
    description?: string | null;
    description_ar?: string | null;
    price: number;
    total_used: number;
    total_days: number;
    schedule_type: string; // e.g., "pre_schedule"
    schedule_interval: string; // e.g., "daily"
    main_services: ServiceItem[];
    extra_services: ExtraServiceItem[];
}

export interface UpdatePackagePayload extends AddPackagePayload { }

export interface PackageResponseItem extends AddPackagePayload {
    id: number;
    created_at?: string;
    // Add other fields as needed
}

export interface GetPackagesResponse {
    status: string;
    data: {
        packages: PackageResponseItem[];
        pagination: {
            current_page: number;
            total_pages: number;
            total_items: number;
            limit: number;
        };
    };
}

export interface GetPackagesParams {
    start?: number;
    limit?: number;
    search?: string;
}

export interface ExportPackagesParams {
    search?: string;
}

// Endpoints

// GET /api/packages/v2?start=0&limit=10&search=
export const getPackages = async (params: GetPackagesParams) => {
    const res: AxiosResponse = await getService("/api/packages/v2", params);
    return res.data;
};

// GET /api/packages/v2/{id}
export const getPackageDetails = async (id: number | string) => {
    const res: AxiosResponse = await getService(`/api/packages/v2/${id}`);
    return res.data;
};

// POST /api/add/packages
export const addPackage = async (data: AddPackagePayload) => {
    const res: AxiosResponse = await postService("/api/add/packages", data);
    return res.data;
};

// PUT /api/update/packages/{id}
export const updatePackage = async (
    id: number | string,
    data: UpdatePackagePayload
) => {
    const res: AxiosResponse = await putService(
        `/api/update/packages/${id}`,
        data
    );
    return res.data;
};

// DELETE /api/delete/packages/{id}
export const deletePackage = async (id: number | string) => {
    const res: AxiosResponse = await deleteService(`/api/delete/packages/${id}`);
    return res.data;
};

// GET /api/packages/export/csv
export const exportPackagesCsv = async (params: ExportPackagesParams) => {
    const res: AxiosResponse = await getService("/api/packages/export/csv", params);
    return res.data;
};

// GET /api/packages/export/excel
export const exportPackagesExcel = async (params: ExportPackagesParams) => {
    const res: AxiosResponse = await getService(
        "/api/packages/export/excel",
        params
    );
    return res.data;
};

// GET /api/packages/export/pdf
export const exportPackagesPdf = async (params: ExportPackagesParams) => {
    const res: AxiosResponse = await getService(
        "/api/packages/export/pdf",
        params
    );
    return res.data;
};

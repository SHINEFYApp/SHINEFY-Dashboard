import { getService, putService } from "../service/service-requests";

// --- VAT ---
export interface GetCommissionVatResponse {
    status: string;
    data: {
        commission_id: number;
        vat: number;
    };
}

export interface UpdateCommissionVatPayload {
    vat: number;
}

export interface UpdateCommissionVatResponse {
    status: string;
    data: {
        message: string;
        commission_id: number;
        vat: number;
    };
}

export const getCommissionVat = async () => {
    return await getService("/api/commission/get");
};

export const updateCommissionVat = async (data: UpdateCommissionVatPayload) => {
    return await putService("/api/commission/update", data);
};

// --- Default Driver Commission ---
export interface GetDefaultDriverCommissionResponse {
    status: string;
    data: {
        commission_id: number;
        service_per: number;
        extra_service_per: number;
    };
}

export interface UpdateDefaultDriverCommissionPayload {
    service_per: number;
    extra_service_per: number;
}

export interface UpdateDefaultDriverCommissionResponse {
    status: string;
    data: {
        message: string;
        commission_id: number;
        service_per: number;
        extra_service_per: number;
    };
}

export const getDefaultDriverCommission = async () => {
    return await getService("/api/default-driver-commission/get");
};

export const updateDefaultDriverCommission = async (data: UpdateDefaultDriverCommissionPayload) => {
    return await putService("/api/default-driver-commission/update", data);
};

// --- Bonus Point ---
export interface GetBonusPointResponse {
    status: string;
    data: {
        commission_id: number;
        bonus_on_off_status: number;
        bonus_percentage: number;
    };
}

export interface UpdateBonusPointPayload {
    status: number;
    bonus_percentage: number;
}

export interface UpdateBonusPointResponse {
    status: string;
    data: {
        message: string;
        commission_id: number;
        bonus_on_off_status: number;
        bonus_percentage: number;
    };
}

export const getBonusPoint = async () => {
    return await getService("/api/bonus-point/get");
};

export const updateBonusPoint = async (data: UpdateBonusPointPayload) => {
    return await putService("/api/bonus-point/update", data);
};

import {
    getService,
    postService,
    putService,
    deleteService,
} from "../service/service-requests";
import type {
    UpdateDailySlotPayload,
    GetSpecificSlotsParams,
    AddSpecificSlotPayload,
    UpdateSpecificSlotPayload,
} from "../../types/slots";

// ============ Daily Slot ============

export const getDailySlot = async () => {
    return await getService("/api/slots/getDailySlot");
};

export const updateDailySlot = async (data: UpdateDailySlotPayload) => {
    return await putService("/api/slots/updateDailySlot", data);
};

// ============ Specific Slots ============

export const getSpecificSlots = async (params: GetSpecificSlotsParams) => {
    return await getService("/api/slots/getSpecificSlots", params);
};

export const viewSpecificSlot = async (id: number) => {
    return await getService(`/api/slots/viewSpecificSlot/${id}`);
};

export const addSpecificSlot = async (data: AddSpecificSlotPayload) => {
    return await postService("/api/slots/addSpecificSlot", data);
};

export const updateSpecificSlot = async (id: number, data: UpdateSpecificSlotPayload) => {
    return await putService(`/api/slots/updateSpecificSlot/${id}`, data);
};

export const deleteSpecificSlot = async (id: number) => {
    return await deleteService(`/api/slots/deleteSpecificSlot/${id}`);
};

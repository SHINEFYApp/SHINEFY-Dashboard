// ============ Daily Slot ============

export interface DailySlotData {
    id: number;
    start_date: string;
    start_time: string;
    end_date: string;
    end_time: string;
    city: string;
    area: string;
    slot_status: string;
    slot_type: string;
}

export interface GetDailySlotResponse {
    status: string;
    data: DailySlotData;
}

export interface UpdateDailySlotPayload {
    start_date: string;
    start_time: string;
    end_date: string;
    end_time: string;
    city: string;
    area: string;
    slot_status: string;
    slot_type: string;
}

// ============ Specific Slots ============

export interface SpecificSlot {
    id: number;
    slot_date: string;
    create_date: string;
    type: string;
    start_time: string;
    end_time: string;
    status: string;
}

export interface SpecificSlotsPagination {
    current_page: number;
    total_pages: number;
    total_items: number;
    limit: number;
}

export interface GetSpecificSlotsResponse {
    status: string;
    data: {
        slots: SpecificSlot[];
        pagination: SpecificSlotsPagination;
    };
}

export interface GetSpecificSlotsParams {
    page?: number;
    limit?: number;
    type?: string;
    status?: string;
    date?: string;
}

export interface ViewSpecificSlotResponse {
    status: string;
    data: SpecificSlot;
}

export interface AddSpecificSlotPayload {
    start_date: string;
    start_time: string;
    end_date: string;
    end_time: string;
    city: string;
    area: string;
    slot_status: string;
    slot_type: string;
}

export interface UpdateSpecificSlotPayload {
    start_date: string;
    start_time: string;
    end_date: string;
    end_time: string;
    city: string;
    area: string;
    slot_status: string;
    slot_type: string;
}

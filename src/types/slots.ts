// ============ Daily Slot ============

export interface OutOfServiceHour {
    start_time: string;
    end_time: string;
}

export interface DailySlotData {
    start_time: string;
    end_time: string;
    out_of_service_hours: Record<string, OutOfServiceHour>;
}

export interface GetDailySlotResponse {
    status: string;
    data: DailySlotData;
}

export interface UpdateDailySlotPayload {
    start_time: string;
    end_time: string;
    out_of_service_hours: OutOfServiceHour[];
}

// ============ Daily Slot Settings ============

export interface DailySlotSettings {
    start_time: string;
    end_time: string;
    out_of_service_hours: Record<string, OutOfServiceHour>;
}

export interface UpdateDailySlotSettingsPayload {
    start_time: string;
    end_time: string;
    out_of_service_hours: OutOfServiceHour[];
}

export interface DailySlotSettingsFormValues {
    start_time: string;
    end_time: string;
    out_of_service_hours: OutOfServiceHour[];
}

// ============ Specific Slots ============

export interface SpecificSlot {
    slot_id: number;
    slot_date: string;
    slot_date_formatted: string;
    start_time: string;
    start_time_formatted: string;
    end_time: string;
    end_time_formatted: string;
    status: number;
    status_label: string;
    out_of_service_hours: OutOfServiceHour[];
    created_at: string;
}

export interface GetSpecificSlotsResponse {
    success: boolean;
    data: {
        slots: SpecificSlot[];
        total: number;
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
    success: boolean;
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
    slot_date?: string;
    start_time?: string | null;
    end_time?: string | null;
    status?: number;
    out_of_service_hours?: OutOfServiceHour[];
}

// ============ Admin Slots ============

export interface AdminSlotBoy {
    user_id: number;
    name: string;
    image: string;
    phone: string;
    work_status: string;
}

export interface AdminSlotAvailableBoy extends AdminSlotBoy {
    work_status: "available";
}

export interface AdminSlotBusyBoy extends AdminSlotBoy {
    work_status: "busy";
    booking_id: number;
    booking_no: string;
    booking_time: string;
    end_slot_time: string;
}

export interface AdminSlotOffShiftBoy extends AdminSlotBoy {
    work_status: "off_shift";
    reason: string;
}

export interface AdminSlot {
    time: string;
    available_count: number;
    busy_count: number;
    available_boys: AdminSlotAvailableBoy[];
    busy_boys: AdminSlotBusyBoy[];
    off_shift_boys: AdminSlotOffShiftBoy[];
}

export interface GetAdminSlotsParams {
    date: string;
    area_id?: number;
    service_time?: number;
    service_boy_id?: number;
    latitude?: string;
    longitude?: string;
}

export interface GetAdminSlotsResponse {
    status: string;
    data: {
        slots: AdminSlot[];
    };
}

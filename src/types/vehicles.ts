export interface addVehiclesFormData {
    user: string,
    category: string,
    make: string,
    model: string,
    color: string,
}

export interface AddVehicleFormValues {
    phoneNumber: string;
    category: string;
    make: string;
    model: string;
    color: string;
    plateNumber: string;
}

export interface UserLookupInfo {
    user_id: number;
    name: string;
}

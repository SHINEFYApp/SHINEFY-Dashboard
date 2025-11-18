// CREATE BOOKING
export interface ServicesFormData {
    phoneNumber: string;
    address: string;
    vehicle: string;
    bookingDate: string;
    bookingTime: string;
    mainService: string;
    extraServices: ExtraService[];
    serviceBoy: string;
    coupon: string;
    paymentMethod: 'cash' | 'credit' | 'free' | '';
    walletAmount: string;
    userNote: string;
    adminNotes: string;
}

export interface ServicesStep1Props {
    onNext: () => void;
    formData: ServicesFormData;
    onDataChange: (data: Partial<ServicesFormData>) => void;
    onRemoveVehicle: (vehicleId: string) => void;
    registerValidation: (validationFn: () => Promise<boolean>) => void;
    onValidationChange: (isValid: boolean) => void;
}

export interface ServicesFormData {
    phoneNumber: string;
    address: string;
    vehicle: string;
    vehicles: Vehicle[];
    bookingDate: string;
    bookingTime: string;
}

export interface PackageFormData {
    [key: string]: any;
}

export interface FormData {
    services: ServicesFormData;
    package: PackageFormData;
}
export interface Vehicle {
    id: string;
    name: string;
    type: string;
    image: string;
}

export interface SelectedVehiclesProps {
    vehicles: Vehicle[];
    onAddClick: () => void;
    onRemoveVehicle?: (vehicleId: string) => void;
}

export interface VehicleSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (vehicles: Vehicle[]) => void;
    selectedVehicles: Vehicle[];
}

export interface ExtraService {
    id: string;
    name: string;
    quantity: number;
}

export interface ServicesStep2Data {
    mainService: string;
    extraServices: ExtraService[];
    serviceBoy: string;
}

export interface ServicesStep2Props {
    onNext: () => void;
    onBack: () => void;
    formData: ServicesStep2Data;
    onDataChange: (data: Partial<ServicesStep2Data>) => void;
    registerValidation: (validationFn: () => Promise<boolean>) => void;
    onValidationChange: (isValid: boolean) => void;
}

export interface ServicesStep3Data {
    coupon: string;
    paymentMethod: 'cash' | 'credit' | 'free' | '';
    walletAmount: string;
}

export interface ServicesStep3Props {
    onNext: () => void;
    onBack: () => void;
    formData: ServicesStep2Data;
    onDataChange: (data: Partial<ServicesStep2Data>) => void;
    registerValidation: (validationFn: () => Promise<boolean>) => void;
    onValidationChange: (isValid: boolean) => void;
}

export interface ServicesStep4Data {
    userNote: string;
    adminNotes: string;
}

export interface ServicesStep4Props {
    onBack: () => void;
    formData: ServicesStep2Data;
    onDataChange: (data: Partial<ServicesStep2Data>) => void;
    registerValidation: (validationFn: () => Promise<boolean>) => void;
    onValidationChange: (isValid: boolean) => void;
}

// MANAGE BOOKINGS
export interface FilterFormValues {
    search: string;
    date: string;
}
import type { ComponentType, Dispatch, SetStateAction } from "react";

// CREATE BOOKING
export interface ServicesFormData {
    phoneNumber: string;
    address: string;
    vehicle: string;
    vehicles: Vehicle[];
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

export interface PackageFormData {
    phoneNumber: string;
    address: string;
    vehicle: string;
    vehicles: Vehicle[];
    bookingDate: string;
    bookingTime: string;
    mainPackage: string;
    mainService: string;
    extraServices: ExtraService[];
    serviceBoy: string;
    userNote: string;
    adminNotes: string;
}

export interface ServicesStep1Props {
    onNext: () => void;
    formData: Partial<ServicesFormData> | Partial<PackageFormData>;
    onDataChange: (data: Partial<ServicesFormData> | Partial<PackageFormData>) => void;
    onRemoveVehicle: (vehicleId: string) => void;
    registerValidation: (validationFn: () => Promise<boolean>) => void;
    onValidationChange: (isValid: boolean) => void;
}

export interface FormData {
    services: ServicesFormData;
    package: PackageFormData;
}

export interface Vehicle {
    make: any;
    model: any;
    colorHex: 'BackgroundColor' | undefined;
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
    mainPackage?: string;
    extraServices: ExtraService[];
    serviceBoy: string;
}

export interface ServicesStep2Props {
    onNext: () => void;
    onBack: () => void;
    userPackageInput?: boolean; //user package input in package tap
    formData: Partial<ServicesFormData> | Partial<PackageFormData>;
    onDataChange: (data: Partial<ServicesFormData> | Partial<PackageFormData>) => void;
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
    formData: Partial<ServicesFormData>;
    onDataChange: (data: Partial<ServicesFormData>) => void;
    registerValidation: (validationFn: () => Promise<boolean>) => void;
    onValidationChange: (isValid: boolean) => void;
}

export interface ServicesStep4Data {
    userNote: string;
    adminNotes: string;
}

export interface ServicesStep4Props {
    onBack: () => void;
    formData: Partial<ServicesFormData> | Partial<PackageFormData>;
    onDataChange: (data: Partial<ServicesFormData> | Partial<PackageFormData>) => void;
    registerValidation: (validationFn: () => Promise<boolean>) => void;
    onValidationChange: (isValid: boolean) => void;
    onSubmit: () => void;
}

// MANAGE BOOKINGS
export interface FilterFormValues {
    search: string;
    date: string;
}

// MANAGE SLOTS
export interface FilterFormValuesManageSlots {
    type: string;
    status: string;
    date: string;
}

// MANAGE MANGE SUB ADMIN
export interface FilterFormValuesManageSubAdmin {
    search: string,
    franchise: string;
}

// FILTER VALUES BY ONLY SEARCH 
export interface FilterFormValuesOnlySearch{
    search: string,
}

// MANAGE REGIONS
export interface FilterFormValuesManageRegions {
    search: string,
}

// Table props
export type ManageSectionKey =  'manageSlots' | 'manageSubAdmin' | 'userWallets' | 'countries' | 'regions' | 'service';

export interface ManageBookingsAndSlotsProps {
    manageSectionFromComponant: ManageSectionKey;
    openWindow?: boolean;
    setOpenWindow?: Dispatch<SetStateAction<boolean | undefined>>;
    setWhoTap? : Dispatch<SetStateAction<string | undefined>>;
}

export type AreaTabs = "mainArea" | "subArea";


export interface DetailRowProps {
    label?: string;
    value?: string | number;
    type: "text" | "badge" ;
    badgeColor?: "yellow" | "green" | "blue" | "red" | "purple";
    actionButton?: {
        text: string;
        icon?: ComponentType<{ className?: string; }>;
        onClick: () => void;
    };
}

export interface ProgressStepsProps {
    steps: { title: string; description: string; }[];
    currentStep: number;
    completedSteps?: number[];
    validatedSteps?: number[]; // Steps that have valid data
    onStepClick?: (stepNumber: number) => void;
    className?: string;
}

export interface ReportFilters {
    status: string;
    startDate: string;
    endDate: string;
}

export interface ReportFilters {
    status: string;
    startDate: string;
    endDate: string;
}


export interface ServicesFormData {
    phoneNumber: string;
    address: string;
    vehicle: string;
    bookingDate: string;
    bookingTime: string;
}

export interface ServicesStep1Props {
    onNext: () => void;
    formData: ServicesFormData;
    onDataChange: (data: Partial<ServicesFormData>) => void;
}

export interface ServicesFormData {
    phoneNumber: string;
    address: string;
    vehicle: string;
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
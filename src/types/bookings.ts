import type { ComponentType, Dispatch, SetStateAction } from "react";
import type { CouponData, services_boys } from "./common";

export interface Location {
  location: string;
  latitude: string;
  longitude: string;
  createtime: string;
}

interface user_info {
    user_id: number,
    name: string
}

export interface createServiceBookingPayload {
    booking_date: string,
    booking_time: string,
    latitude: string,
    longitude: string,
    address_loc:  string,
    coupon_id: number | undefined, 
    service_id: number,
    area_id: number,
    vehicle_id: number[], 
    free_status: number,
    payment_option: string | undefined,
    service_time: number,
    service_boy_id: number,
    user_id: number,
    wallet_amount: number,
    note:  string, 
    booking_admin_note: string,
    extra_services: {
        id: string,
        quantity : number
    }[],
}

export interface createPackageBookingPayload {
    user_package_id: string,
    package_id: string,
    booking_date: string,
    booking_time: string,
    latitude: string,
    longitude: string,
    address_loc: string,
    coupon_id: number ,
    service_id: number ,
    area_id: number ,
    vehicle_id: number[] ,
    free_status: number,
    payment_option: string
    service_time: number,
    service_boy_id: number,
    user_id: number,
    extra_service: {
        id: string,
        quantity: number
    }[]  
}

export interface createServiceBookingRespons {
    status : string,
    data : {
        booking_id : number
    }
}

export interface createPackageBookingRespons {
    status : string,
    data : {
        booking_id : number
    }
}

export type BookingPayload =
    | createServiceBookingPayload
    | createPackageBookingPayload;

export type BookingResponse =
    | createServiceBookingRespons
    | createPackageBookingRespons;

export interface packageTyps {
    delete_flag : string ,
    description : string ,
    description_ar : string ,
    extra_services_count : number ,
    id : number ,
    main_services_count : number ,
    name : string ,
    name_ar : string ,
    package_img : string ,
    price : number ,
    schedule_interval : string ,
    schedule_type : string ,
    total_days : number ,
    total_used : number ,
}

export interface BookingFormData {
    userDetails: user_info ;
    phoneNumber: string;
    address: {
        location: string;
        latitude: string;
        longitude: string;
        createtime: string;
    } ;
    vehicle: string;
    vehicles: Vehicle[];
    bookingDate: string;
    bookingTime: string;
    mainService: string;
    extraServices: ExtraService[];
    serviceBoy: services_boys
    userNote: string;
    adminNotes: string;
    mainPackage?: packageTyps;
    coupon?: CouponData
    paymentMethod?: string;
    walletAmount?: string;
}



export interface stepsProps {
    onNext: () => Promise<void>
    onBack : () => void
    onSubmit :  () => void
    formData : BookingFormData
    setFormData: React.Dispatch<React.SetStateAction<BookingFormData>>;
    registerValidation : (validationFn: () => Promise<boolean>) => void
    onValidationChange : (isValid: boolean) => Promise<void>
    userPackageInput : boolean
    activeTab?: string;
    currentStep?: number;
}

export interface ServiceData {
    services: BookingFormData;
}
export interface PackageData {
    package: BookingFormData;
}

export interface Vehicle {
    car_category_id : number
    color_id : number
    color_name : string
    createtime : string
    delete_flag : number
    make_id : number
    make_name : string
    model_id : number
    model_name : string
    mysqltime : string
    plate_number : string
    updatetime : string
    user_id : string
    vehicle_id : number
    vehicle_image : number
    vehicle_name : string
    vehicle_name_arabic : string
}


export interface SelectedVehiclesProps {
    vehicles: Vehicle[];
    onAddClick: () => void;
    onChange?: (newVehicles: Vehicle[]) => void
}

export interface VehicleSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedVehicles: Vehicle[];
    setSelectedVehicles : (newVehicles: Vehicle[]) => void
    dummyDataVehicles : any
    isSuccess : boolean
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


export interface ServicesStep3Data {
    coupon: string;
    paymentMethod: 'cash' | 'credit' | 'free' | '';
    walletAmount: string;
}

export interface ServicesStep4Data {
    userNote: string;
    adminNotes: string;
}


// MANAGE BOOKINGS
export interface FilterFormValues {
    search: string;
    date: string;
    limit : string
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

// FILTER VALUES BROADCAST 
export interface FilterFormValuesBroadcast{
    search: string,
    date: string,
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

export interface BookingState {
    id: number;
    customer_name: string;
    type: string;
    booking_date: Date;
    booking_time: Date | null;
    address_type: "Home" | "Work";
    address: string;
    booking_status: string;
    note: string | null;
    pay_option: string;
    mony_status: string;
    total: string;
    Coupon_Applied : number
    Coupon_Code : string
    Coupon_Amount : number
    Sub_Total : number
    Wallet_Amount : number
    Gradn_Total : number
    User_Note : string
    Admin_Note : string
    Create_Date : Date
    Create_Time : Date | null
}

export interface ReportFilters {
    status: string;
    startDate: string;
    endDate: string;
}


type BookingKey = keyof BookingState;
type DetailType =
  | "badge"
  | "text"
  | "select"
  | "date"
  | "time"
  | "textArea";

interface ActionButton {
  text: string;
  icon: React.ElementType;
  onClick: () => void;
}

interface BaseDetail {
  key: BookingKey;
  label: string;
  type: DetailType;
  badgeColor?: "yellow" | "blue" | "red" | "green";
  actionButton?: ActionButton;
}

interface SelectDetail extends BaseDetail {
  type: "select";
  options: string[];
}

interface BadgeDetail extends BaseDetail {
  type: "badge";
}

interface TextDetail extends BaseDetail {
  type: "text" | "textArea";
}

interface DateDetail extends BaseDetail {
  type: "date" | "time";
}

export type DetailItem =
  | SelectDetail
  | BadgeDetail
  | TextDetail
  | DateDetail;

export interface UserInfo {
  user_id: number;
  name: string;
}


export interface servicesBoysPayload {
    latitude: string
    longitude: string
    booking_date: string
    booking_time: string
    service_duration: number
}

export interface servicesBoysResponse {
    status: string,
    data: {
        available_service_boys: {
            user_id: number,
            name: string
        }[],
        total_found: number
    }
}


export interface getUserInfoByNumberPayload {
    phone_number: string
} 
export interface getUserInfoByNumberResponse {
    data : {
        user_info: UserInfo;
        vehicles: Vehicle[];
        locations: Location[];
        packages: any[];
    }
}

export interface Booking {
    booking_id: number;
    booking_no: string;
    total_price: string;
    customer_name: string;
    service_boy_name: string | null;
    service_name: string;
    payment_option: string;
}
export interface Pagination {
    current_page: number;
    total_pages: number;
    total_items: number;
    limit: number;
}

export interface BookingsData {
    [x: string]: any;
    bookings: Booking[];
    pagination: Pagination;
}

export interface ApiResponse {
    status: string;
    data: BookingsData;
}

export interface formDataManageBooking{
    search : string ,
    date : string ,
    limit : string
}
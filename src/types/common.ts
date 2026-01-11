export interface Step {
    title: string;
    description: string;
}

export interface Tab {
    id: string;
    label: string;
}

export interface AnimatedTabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
    className?: string;
}

export interface FormTimePickerProps {
    name: string;
    label: string;
    placeholder?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    className?: string;
}

export interface smsStatus {
    status: boolean,
    isSms: boolean;
}

export interface FormInputProps {
    name: string;
    label: string;
    placeholder?: string;
    type?: 'text' | 'tel' | 'email' | 'password' | 'number';
    icon?: React.ReactNode;
    disabled?: boolean;
    checkmark?: boolean;
    className?: string;
    receiveSms?: smsStatus;
    setReceiveSms?: React.Dispatch<React.SetStateAction<smsStatus>>;
    moreOptions?: string
    onBlur?: (value: string) => void;
}

export interface FormTextArea {
    name: string;
    label: string;
    placeholder?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    checkmark?: boolean;
    className?: string;
}

export type CountryOption = {
  name: string;
  flag?: string;
};

interface Locations {
    createtime: string
    latitude: string
    location: string
    longitude: string
}

export type CouponData = {
  id: number;
  code: string;
  amount: number;
  discount_percent: number;
  audience_type: "all_users" | "specific_users" | "groups";
  max_users: number;
  max_uses_per_user: number;
  total_booking: number;
  limit_to_hours: boolean;
  services_mode: "all" | "specific";
  services_text: string;
  start_at: string;
  end_at: string;
  start_hour: string | null;
  end_hour: string | null;
  created_at: string;
  created_at_formatted: string;
  group_ids: number[];
  groups_names: string[] | null;
  user_ids: number[];
  users_names: string[] | null;
  service_ids: number[];
};

export interface services_boys {
    user_id : number
    name : string
}

export interface LocationDropdownProps<T> {
  name: string;
  label: string;
  placeholder?: string;
  icon?: React.ReactNode;
  options?: T[];
  disabled?: boolean;
  className?: string;
  moreOptions?: string;
  getOptionLabel: (option: T) => string;
}



export interface FormDropdownProps {
    name: string;
    label: string;
    placeholder?: string;
    icon?: React.ReactNode;
    options?: (string | CountryOption )[];
    disabled?: boolean;
    className?: string;
    moreOptions?: string
}

export interface FormDatePickerProps {
    name: string;
    label: string;
    placeholder?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    checkmark: boolean;
    className?: string;
}

export interface Column<T> {
    [x: string]: any;
    key: string;
    title: string;
    render?: (value: any, row: T, index: number) => React.ReactNode;
    width?: string;
}

export interface TableProps<T> {
    page?: string ;
    columns: Column<T>[];
    data: T[];
    currentPage?: number;
    totalPages?: number;
    totalEntries?: number;
    pageSize?: number;
    onPageChange?: (page: number) => void;
    isLoading?: boolean;
}

export interface FormDataListProps {
  name: string;
  label: string;
  placeholder?: string;
  options: string[];
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  checkmark?: boolean;
}


export interface PaginationProps {
    currentPage?: number;
    totalPages?: number;
    totalEntries?: number;
    pageSize?: number;
    onPageChange?: (page: number) => void;
}

//drop down with multi select
export type MenuType = {
    Key: number;
    title: string;
    options: string[];
};

//drop down with multi select props
export type ChildProps = {
    selectedOptions: Record<string, string[]>;
    setSelectedOptions: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
};

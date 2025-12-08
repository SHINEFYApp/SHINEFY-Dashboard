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

export interface FormDropdownProps {
    name: string;
    label: string;
    placeholder?: string;
    icon?: React.ReactNode;
    options?: (string | CountryOption)[];
    disabled?: boolean;
    className?: string;
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
    key: string;
    title: string;
    render?: (value: any, row: T, index: number) => React.ReactNode;
    width?: string;
}

export interface TableProps<T> {
    page?: string ;
    columns: Column<T>[];
    data: T[];
    currentPage: number;
    totalPages: number;
    totalEntries: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalEntries: number;
    pageSize: number;
    onPageChange: (page: number) => void;
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

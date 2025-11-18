export interface Step {
    title: string;
    description: string;
}

export interface ProgressStepsProps {
    steps: Step[];
    currentStep: number;
    className?: string;
    completedSteps?: number[];
    onStepClick?: (stepNumber: number) => void;
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

export interface FormInputProps {
    name: string;
    label: string;
    placeholder?: string;
    type?: 'text' | 'tel' | 'email' | 'password' | 'number';
    icon?: React.ReactNode;
    disabled?: boolean;
    checkmark?: boolean;
    className?: string;
}

export interface FormDropdownProps {
    name: string;
    label: string;
    placeholder?: string;
    icon?: React.ReactNode;
    options?: string[];
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

export interface DetailRowProps {
    label: string;
    value: string | number;
    type?: "text" | "badge";
    badgeColor?: "yellow" | "green" | "blue" | "red" | "purple";
    actionButton?: {
        text: string;
        icon?: React.ReactNode;
        onClick: () => void;
    };
}

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
    className?: string;
}
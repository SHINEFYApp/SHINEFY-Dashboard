import { useField } from 'formik';
import { cn } from '../utils/utils';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { format } from 'date-fns';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Calendar } from '../components/ui/calendar';
import type { FormDatePickerProps } from '../types/common';

export const FormDatePicker = ({
    name,
    label,
    placeholder = 'Select date',
    icon,
    disabled = false,
    className,
}: FormDatePickerProps) => {
    const [field, meta, helpers] = useField(name);
    const [open, setOpen] = useState(false);

    const hasError = meta.touched && meta.error;
    const isValid = meta.touched && !meta.error && field.value;

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            helpers.setValue(format(date, 'dd.MM.yyyy'));
            setOpen(false);
        }
    };

    const selectedDate = field.value ? new Date(field.value.split('.').reverse().join('-')) : undefined;

    return (
        <div className={cn('space-y-2', className)}>
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
            </label>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div className="relative">
                        {icon && (
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                                {icon}
                            </div>
                        )}

                        <button
                            type="button"
                            disabled={disabled}
                            className={cn(
                                'w-full text-left rounded-xl border bg-gray-50 px-4 py-3.5 text-sm font-medium transition-all duration-200',
                                icon && 'pl-12',
                                isValid && 'pr-12',
                                hasError
                                    ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                                    : isValid
                                        ? 'border-green-500 bg-green-50 focus:border-green-500 focus:ring-2 focus:ring-green-200'
                                        : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20',
                                disabled && 'cursor-not-allowed opacity-60',
                                !field.value && 'text-gray-400'
                            )}
                        >
                            {field.value || placeholder}
                        </button>

                        {isValid && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 animate-scale-up pointer-events-none">
                                <IoCheckmarkCircle className="w-5 h-5 text-green-500" />
                            </div>
                        )}
                    </div>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0 bg-white" align="start">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>

            {hasError && (
                <p className="text-xs text-red-500 animate-slide-down pl-1">
                    {meta.error}
                </p>
            )}
        </div>
    );
};

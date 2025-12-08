import type { FC } from 'react';
import { useField } from 'formik';
import { cn } from '../utils/utils';
import { IoCheckmarkCircle, IoChevronDown } from 'react-icons/io5';
import type { FormDropdownProps } from '../types/common';
import { dummyCountries } from '../constants/data';

export const FormDropdown: FC<FormDropdownProps> = ({
    name,
    label,
    placeholder,
    icon,
    options = [],
    disabled = false,
    className,
}) => {
    const [field, meta] = useField(name);
    const hasError = meta.touched && meta.error;
    const isValid = meta.touched && !meta.error && field.value;

    return (
        <div className={cn('space-y-2', className)}>
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
            </label>

            <div className="relative">
                {/* Icon on the left */}
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                        {icon}
                    </div>
                )}

                {/* Select dropdown */}
                <select
                    {...field}
                    id={name}
                    disabled={disabled}
                    className={cn(
                        'w-full appearance-none rounded-xl mt-2 border bg-gray-50 px-4 py-3.5 text-sm font-medium transition-all duration-200 cursor-pointer',
                        icon && 'pl-12',
                        'pr-12',
                        hasError
                            ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                            : isValid
                                ? 'border-green-500 bg-green-50 focus:border-green-500 focus:ring-2 focus:ring-green-200'
                                : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20',
                        disabled && 'cursor-not-allowed opacity-60'
                    )}
                >
                    <option value="" disabled>
                        {placeholder || 'Select an option'}
                    </option>
                    {options.map((option) => (
                        typeof option === "object" ? 
                            <option key={option.name} value={option.name }>
                                {option.name}
                            </option>
                        : 
                            <option key={option} value={option}>
                                {option}
                            </option>
                    ))}
                </select>

                {/* Chevron or checkmark */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    {isValid ? (
                        <IoCheckmarkCircle className="w-5 h-5 text-green-500 animate-scale-up" />
                    ) : (
                        <IoChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                </div>
            </div>

            {/* Error message */}
            {hasError && (
                <p className="text-xs text-red-500 animate-slide-down pl-1">
                    {meta.error}
                </p>
            )}
        </div>
    );
};

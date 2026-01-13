import type { FC } from 'react';
import { useField, useFormikContext } from 'formik';
import { cn } from '../utils/utils';
import { IoCheckmarkCircle, IoChevronDown } from 'react-icons/io5';
import type { FormDropdownProps } from '../types/common';

export const FormDropdown: FC<FormDropdownProps & { onChangeExternal?: (value: string) => void }> = ({
    name,
    label,
    placeholder,
    icon,
    options = [],
    disabled = false,
    className,
    moreOptions,
    onChangeExternal,
}) => {
    const [field, meta] = useField(name);
    const { setFieldValue } = useFormikContext<any>();
    const hasError = meta.touched && meta.error;
    const isValid = meta.touched && !meta.error && field.value;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setFieldValue(name, value);
        if (onChangeExternal) onChangeExternal(value);
    };

    return (
        <div className={cn('space-y-2', className)}>
            {label && <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</label>}

            <div className="relative">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">{icon}</div>
                )}

                <select
                    {...field}
                    id={name}
                    disabled={disabled}
                    onChange={handleChange}
                    className={cn(
                        'w-full appearance-none rounded-xl mt-2 border px-4 py-3.5 text-sm font-medium transition-all duration-200 cursor-pointer',
                        icon && 'pl-12',
                        moreOptions === 'packageService' ? 'bg-[#191919] text-[#FFC107] border-[#E9EAEC]' : 'bg-gray-50',
                        'pr-12',
                        hasError
                            ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                            : isValid
                                ? 'border-green-500 bg-green-50 focus:border-green-500 focus:ring-2 focus:ring-green-200'
                                : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20',
                        disabled && 'cursor-not-allowed opacity-60'
                    )}
                >
                    <option value="" disabled>{placeholder || 'Select an option'}</option>
                    {options.map((option, index) => {
                        if (option && typeof option === 'object') {
                            const val = 'value' in option ? (option as any).value :
                                ('name' in option ? (option as any).name : '');
                            const label = 'label' in option ? (option as any).label :
                                ('name' in option ? (option as any).name : '');
                            return <option key={index} value={val}>{label}</option>;
                        }
                        return <option key={index} value={option as string}>{option as string}</option>;
                    })}
                </select>

                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    {isValid ? <IoCheckmarkCircle className="w-5 h-5 text-green-500 animate-scale-up" /> : <IoChevronDown className="w-5 h-5 text-gray-400" />}
                </div>
            </div>

            {hasError && <p className="text-xs text-red-500 animate-slide-down pl-1">{meta.error}</p>}
        </div>
    );
};

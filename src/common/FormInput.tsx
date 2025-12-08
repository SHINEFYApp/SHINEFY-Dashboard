import type { FC } from 'react';
import { useField } from 'formik';
import { cn } from '../utils/utils';
import type { FormInputProps } from '../types/common';
import { Check, CircleCheck } from 'lucide-react';

export const FormInput: FC<FormInputProps> = ({
    name,
    label,
    placeholder,
    type = 'text',
    icon,
    disabled = false,
    checkmark = true,
    className,
    receiveSms,
    setReceiveSms
}) => {
    const [field, meta] = useField(name);
    const hasError = meta.touched && meta.error;
    const isValid = meta.touched && !meta.error && field.value;

    const handleToggle = () => {
        if (!receiveSms) return;
        setReceiveSms?.({ ...receiveSms, isSms: !receiveSms?.isSms });
    };

    return (
        <div className={cn('space-y-2', className)}>
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
            </label>

            <div className="relative">
                {/* Icon on the left */}
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 mt-1">
                        {icon}
                    </div>
                )}

                {/* Input field */}
                <input
                    {...field}
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={cn(
                        'w-full rounded-xl mt-2 border bg-gray-50 px-4 py-3.5 text-sm font-medium transition-all duration-200',
                        icon && 'pl-12',
                        isValid && checkmark && 'pr-12',
                        hasError
                            ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                            : isValid && checkmark
                                ? 'border-green-500 bg-green-50 focus:border-green-500 focus:ring-2 focus:ring-green-200'
                                : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20',
                        disabled && 'cursor-not-allowed opacity-60'
                    )}
                />


                {/* Success checkmark */}
                {isValid && checkmark && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 animate-scale-up">
                        <CircleCheck className="w-5 h-5 text-green-500" />
                    </div>
                )}

            </div>

            {/* Error message */}
            {hasError && (
                <p className="text-xs text-red-500 animate-slide-down pl-1">
                    {meta.error}
                </p>
            )}

            {/* receiveSms to manage sub admins */}
            {receiveSms?.status && (
                <div className="py-2">
                    <button onClick={handleToggle} type='button' className='flex gap-2 font-extrabold text-[14px] items-center'>
                        {receiveSms.isSms ?
                            <span className='w-5 rounded h-5 bg-green-600 flex justify-center items-center'><Check color='white' size={15} /></span>
                            :
                            <span className='w-5 rounded h-5 border border-black flex justify-center items-center'></span>
                        }
                        Receive Sms
                    </button>
                </div>
            )}
        </div>
    );
};

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useField, useFormikContext } from 'formik';
import { cn } from '../utils/utils';
import { IoCheckmarkCircle, IoChevronDown } from 'react-icons/io5';
import type { FormDropdownProps } from '../types/common';

export const SearchableFormDropdown: React.FC<FormDropdownProps> = ({
    name,
    label,
    placeholder,
    icon,
    options = [],
    disabled = false,
    className,
}) => {
    const [field, meta] = useField(name);
    const { setFieldValue } = useFormikContext<any>();
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [highlightedIdx, setHighlightedIdx] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);

    const hasError = meta.touched && meta.error;
    const isValid = meta.touched && !meta.error && field.value;

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
                setSearch('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const processedOptions = useMemo(() => {
        return options.map((option) => {
            if (option && typeof option === 'object') {
                const val = 'value' in option ? (option as any).value :
                    ('name' in option ? (option as any).name : '');
                const label = 'label' in option ? (option as any).label :
                    ('name' in option ? (option as any).name : '');
                return { value: val, label: label ?? '' };
            }
            return { value: option as string, label: option as string };
        });
    }, [options]);

    const filteredOptions = useMemo(() => {
        if (!search) return processedOptions;
        return processedOptions.filter(opt =>
            opt.label.toLowerCase().includes(search.toLowerCase())
        );
    }, [processedOptions, search]);

    const selectedLabel = useMemo(() => {
        const selected = processedOptions.find(opt => opt.value === field.value);
        return selected ? selected.label : '';
    }, [processedOptions, field.value]);

    const handleSelect = useCallback((value: string) => {
        setFieldValue(name, value);
        setIsOpen(false);
        setSearch('');
        setHighlightedIdx(-1);
    }, [name, setFieldValue]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setHighlightedIdx(-1);
        if (!isOpen) setIsOpen(true);
    };

    const handleInputFocus = () => {
        if (!disabled) {
            setIsOpen(true);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) {
            if (e.key === 'ArrowDown' || e.key === 'Enter') {
                setIsOpen(true);
                e.preventDefault();
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIdx(prev => Math.min(prev + 1, filteredOptions.length - 1));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIdx(prev => Math.max(prev - 1, 0));
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIdx >= 0 && highlightedIdx < filteredOptions.length) {
                    handleSelect(filteredOptions[highlightedIdx].value);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setIsOpen(false);
                setSearch('');
                setHighlightedIdx(-1);
                break;
        }
    };

    return (
        <div className={cn('space-y-2 relative', className)} ref={containerRef}>
            {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

            <div className="relative">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                        {icon}
                    </div>
                )}

                <input
                    type="text"
                    value={isOpen && !disabled ? search : selectedLabel}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onKeyDown={handleKeyDown}
                    readOnly={!isOpen || disabled}
                    disabled={disabled}
                    placeholder={placeholder || 'Select an option'}
                    className={cn(
                        'w-full rounded-xl mt-2 border px-4 py-3.5 text-sm font-medium transition-all duration-200',
                        icon && 'pl-12',
                        'pr-12',
                        hasError
                            ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                            : isValid
                                ? 'border-green-500 bg-green-50 focus:border-green-500 focus:ring-2 focus:ring-green-200'
                                : 'border-gray-200 bg-gray-50 focus:border-primary focus:ring-2 focus:ring-primary/20',
                        disabled && 'cursor-not-allowed opacity-60',
                        !disabled && (isOpen ? 'cursor-text' : 'cursor-pointer')
                    )}
                    autoComplete="off"
                />

                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    {isValid ? (
                        <IoCheckmarkCircle className="w-5 h-5 text-green-500 animate-scale-up" />
                    ) : (
                        <IoChevronDown className={cn('w-5 h-5 text-gray-400 transition-transform duration-200', isOpen && 'rotate-180')} />
                    )}
                </div>
            </div>

            {isOpen && !disabled && (
                <div className="absolute z-50 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-lg max-h-60 overflow-auto">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((opt, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => handleSelect(opt.value)}
                                onMouseEnter={() => setHighlightedIdx(idx)}
                                className={cn(
                                    'w-full text-left px-4 py-2.5 text-sm transition-colors',
                                    highlightedIdx === idx
                                        ? 'bg-primary/10 text-primary'
                                        : opt.value === field.value
                                            ? 'bg-primary/5 text-primary font-medium'
                                            : 'text-gray-700 hover:bg-gray-100'
                                )}
                            >
                                {opt.label}
                            </button>
                        ))
                    ) : (
                        <div className="px-4 py-2.5 text-sm text-gray-400">No results found</div>
                    )}
                </div>
            )}

            {hasError && (
                <p className="text-xs text-red-500 animate-slide-down pl-1">{meta.error}</p>
            )}
        </div>
    );
};

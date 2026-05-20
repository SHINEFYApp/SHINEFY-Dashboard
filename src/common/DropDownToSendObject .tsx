import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useField, useFormikContext } from 'formik';
import { IoCheckmarkCircle, IoChevronDown, IoSearch } from 'react-icons/io5';
import { cn } from '../utils/utils';

export interface DropDownToSendObjectProps<T> {
  name: string;
  label: string;
  placeholder?: string;
  icon?: React.ReactNode;
  options: T[] | undefined;
  disabled?: boolean;
  className?: string;
  moreOptions?: string;
  setFormData?: React.Dispatch<React.SetStateAction<any>>;
  getOptionLabel?: (option: T) => string; 
  valueExtractor?: (option: T) => any;
  extraKey?: string;
  searchable?: boolean;
}

export const DropDownToSendObject = <T,>({
  name,
  label,
  placeholder,
  icon,
  options,
  disabled = false,
  className,
  moreOptions,
  getOptionLabel,
  valueExtractor,
  setFormData,
  extraKey,
  searchable
}: DropDownToSendObjectProps<T>) => {
  const { t } = useTranslation();
  const [field, meta] = useField<T | undefined>(name);
  const { setFieldValue, setFieldTouched } = useFormikContext<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const safeDisplay = (option: T): string => {
    if (getOptionLabel) return String(getOptionLabel(option));
    if (!option || typeof option !== 'object') return '';
    const obj = option as Record<string, any>;
    if (typeof obj.name === 'string') return obj.name;
    if (typeof obj.code === 'string') return obj.code;
    if (typeof obj.location === 'string') return obj.location;
    return '';
  };

  const filteredOptions = useMemo(() => {
    if (!options || !searchable || !searchQuery) return options;
    const q = searchQuery.toLowerCase();
    return options.filter((opt) => {
      const label = getOptionLabel ? String(getOptionLabel(opt)) : safeDisplay(opt);
      return label.toLowerCase().includes(q);
    });
  }, [options, searchQuery, searchable, getOptionLabel]);

  const handleToggle = () => {
    if (!isOpen) setSearchQuery('');
    setIsOpen(!isOpen);
  };

  const hasError = meta.touched && meta.error;
  const isValid = meta.touched && !meta.error && field.value;

  const matchedOption = (valueExtractor && field.value !== undefined && field.value !== null && typeof field.value !== 'object')
      ? options?.find((opt) => valueExtractor(opt) === field.value)
      : field.value;

  const selectedLabel = matchedOption ? safeDisplay(matchedOption as T) : '';

  const handleSelect = (option: T) => {
    console.log(option)
    const valueToSet = valueExtractor ? valueExtractor(option) : option;
    setFormData?.((prev: any) => ({ ...prev, [name]: valueToSet }));
    setFieldValue(name, valueToSet);
    setFieldTouched(name, true, true);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className={cn('relative space-y-2', className)}>
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <button
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          'w-full flex justify-between items-center rounded-xl border px-4 py-3.5 text-sm font-medium cursor-pointer',
          moreOptions === 'packageService'
            ? 'bg-[#191919] text-[#FFC107] border-[#E9EAEC]'
            : 'bg-gray-50',
          hasError
            ? 'border-red-500 bg-red-50'
            : isValid
            ? 'border-green-500 bg-green-50'
            : 'border-gray-200',
          disabled && 'cursor-not-allowed opacity-60'
        )}
      >
        <div className="flex gap-4 items-center text-gray-400">
          {icon}
          <span>{selectedLabel || placeholder}</span>
        </div>
        {isValid ? (
          <IoCheckmarkCircle className="w-5 h-5 text-green-500" />
        ) : (
          <IoChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 rounded-xl border bg-white shadow-lg max-h-60 overflow-auto">
          {searchable && (
            <div className="sticky top-0 bg-white border-b border-gray-100 px-3 py-2">
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <IoSearch className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('common.searchDot')}
                  className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                  autoFocus
                />
              </div>
            </div>
          )}
          {(filteredOptions?.length === 0) ? (
            <div className="w-full h-20 flex justify-center items-center text-gray-300 text-sm">
              {t('common.noOptionsAvailable')}
            </div>
          ) : (
            filteredOptions?.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(option)}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors"
              >
                {safeDisplay(option)} {extraKey && `(${option[extraKey as keyof T]})`}
              </button>
            ))
          )}
        </div>
      )}

      {hasError && (
        <p className="text-xs text-red-500 pl-1 mt-1">{meta.error}</p>
      )}
    </div>
  );
};

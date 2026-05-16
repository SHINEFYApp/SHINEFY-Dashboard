import { useField } from 'formik';
import { cn } from '../utils/utils';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Calendar } from '../components/ui/calendar';
import { Button } from '../components/ui/button';
import type { DateRange } from 'react-day-picker';

interface FormDateRangePickerProps {
    fromName: string;
    toName: string;
    label?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    className?: string;
}

export const FormDateRangePicker = ({
    fromName,
    toName,
    label,
    placeholder = 'Select date range',
    icon,
    disabled = false,
    className,
}: FormDateRangePickerProps) => {
    const [fromField, , fromHelpers] = useField(fromName);
    const [toField, , toHelpers] = useField(toName);
    const [open, setOpen] = useState(false);
    const [tempRange, setTempRange] = useState<DateRange | undefined>();

    useEffect(() => {
        if (open) {
            setTempRange(
                fromField.value || toField.value
                    ? {
                          from: fromField.value ? new Date(fromField.value) : undefined,
                          to: toField.value ? new Date(toField.value) : undefined,
                      }
                    : undefined
            );
        }
    }, [open, fromField.value, toField.value]);

    const displayText = () => {
        if (tempRange?.from && tempRange?.to && tempRange.from !== tempRange.to) {
            return `${format(tempRange.from, 'dd/MM/yyyy')} - ${format(tempRange.to, 'dd/MM/yyyy')}`;
        }
        if (tempRange?.from) {
            return format(tempRange.from, 'dd/MM/yyyy');
        }
        return placeholder;
    };

    const handleSelect = (selectedRange: DateRange | undefined) => {
        setTempRange(selectedRange);
        if (!selectedRange) {
            fromHelpers.setValue('');
            toHelpers.setValue('');
            return;
        }
        if (selectedRange.from && selectedRange.to) {
            fromHelpers.setValue(format(selectedRange.from, 'yyyy-MM-dd'));
            toHelpers.setValue(format(selectedRange.to, 'yyyy-MM-dd'));
            setOpen(false);
        }
    };

    const hasValue = tempRange?.from != null;

    return (
        <div className={cn('space-y-2', className)}>
            {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

            <Popover open={open} onOpenChange={setOpen} modal={true}>
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
                                'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20',
                                disabled && 'cursor-not-allowed opacity-60',
                                !hasValue && 'text-gray-400'
                            )}
                        >
                            {displayText()}
                        </button>
                    </div>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0 bg-white" align="start">
                    <Calendar
                        mode="range"
                        selected={tempRange}
                        onSelect={handleSelect}
                        initialFocus
                        classNames={{
                            today: cn(
                                "rounded-md",
                                "data-[range-start=true]:!bg-primary data-[range-start=true]:!text-primary-foreground",
                                "data-[range-end=true]:!bg-primary data-[range-end=true]:!text-primary-foreground",
                                "data-[range-middle=true]:!bg-accent data-[range-middle=true]:!text-accent-foreground",
                                "[&:not([data-range-start=true]):not([data-range-end=true]):not([data-range-middle=true])]:bg-accent [&:not([data-range-start=true]):not([data-range-end=true]):not([data-range-middle=true])]:text-accent-foreground"
                            )
                        }}
                    />
                    <div className="flex items-center justify-end border-t p-3">
                        <Button
                            type="button"
                            size="sm"
                            disabled={!tempRange?.from}
                            onClick={() => {
                                if (tempRange?.from) {
                                    fromHelpers.setValue(format(tempRange.from, 'yyyy-MM-dd'));
                                    toHelpers.setValue(format(tempRange.to || tempRange.from, 'yyyy-MM-dd'));
                                    setOpen(false);
                                }
                            }}
                        >
                            Apply
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

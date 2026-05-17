import { useField, useFormikContext } from 'formik';
import { cn } from '../utils/utils';
import { Loader2 } from 'lucide-react';
import { useGetAdminSlots } from '../api/features/slots.hooks';
import type { AdminSlot } from '../types/slots';

interface FormTimeSlotsProps {
    name: string;
    label: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    className?: string;
    date?: string;
    serviceBoyId?: number;
    serviceTime?: number;
    latitude?: string;
    longitude?: string;
    onSelect?: (time: string) => void;
}

const getSlots = (data: any): AdminSlot[] =>
    Array.isArray(data?.data?.data?.slots) ? data.data.data.slots : [];

const normalizeTimeToHms = (time: string): string => {
    if (!time) return time;
    if (/^\d{2}:\d{2}:\d{2}$/.test(time)) return time;
    const match = time.match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i);
    if (match) {
        let hours = parseInt(match[1], 10);
        const minutes = match[2];
        const ampm = match[3];
        if (ampm) {
            const upper = ampm.toUpperCase();
            if (upper === 'PM' && hours !== 12) hours += 12;
            if (upper === 'AM' && hours === 12) hours = 0;
        }
        return `${String(hours).padStart(2, '0')}:${minutes}:00`;
    }
    return time;
};

export const FormTimeSlots = ({
    name,
    label,
    icon,
    disabled = false,
    className,
    date: dateProp,
    serviceBoyId,
    serviceTime,
    latitude,
    longitude,
    onSelect,
}: FormTimeSlotsProps) => {
    const [field, meta, helpers] = useField(name);
    const { values } = useFormikContext<any>();

    const bookingDate = dateProp ?? values?.bookingDate;
    const hasRequiredParams = !!bookingDate;

    const params: {
        date: string;
        service_boy_id?: number;
        service_time?: number;
        latitude?: string;
        longitude?: string;
    } = { date: bookingDate || '' };

    if (serviceBoyId) params.service_boy_id = serviceBoyId;
    if (serviceTime) params.service_time = serviceTime;
    if (latitude) params.latitude = latitude;
    if (longitude) params.longitude = longitude;

    const { data: slotsData, isLoading } = useGetAdminSlots(params);

    const slots = getSlots(slotsData);

    const hasError = meta.touched && meta.error;
    const selectedTime = field.value;

    const handleSelect = (time: string) => {
        if (disabled) return;
        const normalized = normalizeTimeToHms(time);
        helpers.setValue(normalized);
        helpers.setTouched(true, false);
        onSelect?.(normalized);
    };

    const missingDate = !dateProp && !values?.bookingDate;

    return (
        <div className={cn('space-y-2', className)}>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                {icon}
                {label}
            </label>

            {missingDate ? (
                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center text-sm text-gray-400">
                    Select a booking date first to see available time slots
                </div>
            ) : isLoading ? (
                <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-8 text-center text-sm text-gray-400">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                    Loading available slots...
                </div>
            ) : slots.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center text-sm text-gray-400">
                    No available slots for the selected criteria
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {slots.map((slot, index) => {
                        const isSelected = selectedTime === slot.time;
                        const isDisabled = slot.available_count === 0;

                        return (
                            <button
                                key={index}
                                type="button"
                                disabled={isDisabled || disabled}
                                onClick={() => handleSelect(slot.time)}
                                className={cn(
                                    'flex flex-col items-center gap-1 rounded-xl border-2 px-3 py-3 text-sm font-medium transition-all duration-200',
                                    'focus:outline-none focus:ring-2 focus:ring-primary/20',
                                    isSelected
                                        ? 'border-primary bg-primary/5 text-primary'
                                        : isDisabled
                                            ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
                                            : 'border-gray-200 bg-white text-gray-700 hover:border-primary/50 hover:bg-primary/5'
                                )}
                            >
                                <span className="font-semibold">{slot.time}</span>
                                <span
                                    className={cn(
                                        'text-xs',
                                        isSelected ? 'text-primary/70' : 'text-gray-400'
                                    )}
                                >
                                    {slot.available_count} available
                                </span>
                            </button>
                        );
                    })}
                </div>
            )}

            {hasError && (
                <p className="text-xs text-red-500 animate-slide-down pl-1">
                    {meta.error}
                </p>
            )}
        </div>
    );
};

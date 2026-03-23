import { useField } from 'formik';
import { CheckIcon, X } from 'lucide-react';
import addVehicle from '../../../../assets/addVehicle.svg';
import car from '../../../../assets/addVehicle.svg';
import { cn } from '../../../../utils/utils';
import type { Vehicle } from '../../../../types/bookings';

type FormSelectedVehiclesProps = {
    name: string;
    label?: string;
    vehicles?: Vehicle[];
    onAddClick: () => void;
    className?: string;
};

export const FormSelectedVehicles = ({
    name,
    label = 'Select Vehicle',
    onAddClick,
    className,
}: FormSelectedVehiclesProps) => {
    const [field, meta, helpers] = useField<Vehicle[]>(name);

    const vehicles = field.value || [];
    const hasError = meta.touched && meta.error;
    const isValid = meta.touched && !meta.error && vehicles.length > 0;

    const handleRemove = (vehicleId: number) => {
        const updated = vehicles.filter(v => v.vehicle_id !== vehicleId);
        helpers.setValue(updated);
    };

    return (
        <div className={cn('space-y-2', className)}>
            <label className="text-sm font-medium text-gray-700 block">
                {label}
            </label>

            {vehicles.length === 0 ? (
                <button
                    type="button"
                    onClick={onAddClick}
                    className={cn(
                        'w-full md:w-80 h-56 rounded-2xl border-2 border-dashed bg-gray-50 flex flex-col items-center justify-center transition-all duration-200',
                        hasError
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300 hover:border-primary hover:bg-primary/5'
                    )}
                >
                    <img src={addVehicle} alt="add vehicle" className="size-52" />
                </button>
            ) : (
                <div className="flex gap-4 flex-wrap overflow-x-auto pb-4 scrollbar-hide">
                    {vehicles.map(vehicle => (
                        <div
                            key={vehicle.vehicle_id}
                            className={cn(
                                'relative shrink-0 w-[30%] p-6 rounded-2xl border-2 bg-white transition-all duration-200 hover:shadow-lg',
                                isValid
                                    ? 'border-green-500'
                                    : hasError
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                            )}
                        >
                            {/* Check */}
                            {isValid && (
                                <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-scale-up">
                                    <CheckIcon className="text-white" />
                                </div>
                            )}

                            {/* Remove */}
                            <button
                                type="button"
                                onClick={() => handleRemove(vehicle.vehicle_id)}
                                className="absolute top-4 left-4 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Vehicle image */}
                            <div className="flex items-center justify-center mb-3">
                                <img src={car} alt={vehicle.vehicle_name} className="w-full h-28 object-contain" />
                            </div>

                            {/* Name header */}
                            <div className="text-left mb-3 border-b border-gray-100 pb-3">
                                <h3 className="font-bold text-gray-900 leading-tight">{vehicle.vehicle_name}</h3>
                                {vehicle.vehicle_name_arabic && (
                                    <p className="text-xs text-gray-400 mt-0.5 text-right" dir="rtl">{vehicle.vehicle_name_arabic}</p>
                                )}
                            </div>

                            {/* Detail grid */}
                            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-left">
                                {vehicle.make_name && (
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">Make</span>
                                        <span className="text-sm font-semibold text-gray-700 truncate">{vehicle.make_name}</span>
                                    </div>
                                )}
                                {vehicle.model_name && (
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">Model</span>
                                        <span className="text-sm font-semibold text-gray-700 truncate">{vehicle.model_name}</span>
                                    </div>
                                )}
                                {vehicle.plate_number && (
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">Plate No.</span>
                                        <span className="text-sm font-semibold text-gray-700 truncate">{vehicle.plate_number}</span>
                                    </div>
                                )}
                                {vehicle.color_name && (
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">Color</span>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <span
                                                className="inline-block w-3 h-3 rounded-full border border-gray-200 shrink-0"
                                                style={{ backgroundColor: vehicle.color_name }}
                                            />
                                            <span className="text-sm font-semibold text-gray-700 truncate">{vehicle.color_name}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Add more */}
                    <button
                        type="button"
                        onClick={onAddClick}
                        className="w-80 h-56 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 transition-all duration-200"
                    >
                        <img src={addVehicle} alt="add vehicle" className="size-52 mx-auto" />
                    </button>
                </div>
            )}

            {hasError && (
                <p className="text-xs text-red-500 animate-slide-down pl-1">
                    {meta.error as string}
                </p>
            )}
        </div>
    );
};

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

                            <h3 className="font-bold text-lg text-gray-900 mb-2">
                                {vehicle.vehicle_name}
                            </h3>

                            <div className="flex items-center justify-center h-32">
                                <img
                                    src={car}
                                    alt={vehicle.vehicle_name}
                                    className="w-full h-full object-contain"
                                />
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

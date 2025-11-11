import { useState } from 'react';
import { cn } from '../../../../utils/utils';
import { IoClose } from 'react-icons/io5';
import car from '../../../../assets/car.svg';
import { CheckIcon } from 'lucide-react';
import type { Vehicle, VehicleSelectionModalProps } from '../../../../types/bookings';

export const VehicleSelectionModal = ({
    isOpen,
    onClose,
    onSelect,
    selectedVehicles,
}: VehicleSelectionModalProps) => {
    const [selected, setSelected] = useState<Vehicle[]>(selectedVehicles);

    const vehicles: Vehicle[] = [
        {
            id: '1',
            name: 'Porsche 718 Cayman S',
            type: 'Coupe',
            image: car,
        },
        {
            id: '2',
            name: 'Porsche 718 Cayman S',
            type: 'Coupe',
            image: car,
        },
        {
            id: '3',
            name: 'Porsche 718 Cayman S',
            type: 'Coupe',
            image: car,
        },
        {
            id: '4',
            name: 'Porsche 718 Cayman S',
            type: 'Coupe',
            image: car,
        },
        {
            id: '5',
            name: 'Porsche 718 Cayman S',
            type: 'Coupe',
            image: car,
        },
        {
            id: '6',
            name: 'Porsche 718 Cayman S',
            type: 'Coupe',
            image: car,
        },
        {
            id: '7',
            name: 'Porsche 718 Cayman S',
            type: 'Coupe',
            image: car,
        },
    ];

    const toggleVehicle = (vehicle: Vehicle) => {
        const isSelected = selected.some((v) => v.id === vehicle.id);
        if (isSelected) {
            setSelected(selected.filter((v) => v.id !== vehicle.id));
        } else {
            setSelected([...selected, vehicle]);
        }
    };

    const handleDone = () => {
        onSelect(selected);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden animate-scale-up">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900">Select Vehicle</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <IoClose className="w-8 h-8" />
                        </button>
                        <button
                            className="px-6 py-2 border-2 border-green-500 text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-colors"
                        >
                            Add New Vehicle
                        </button>
                    </div>

                    {/* Vehicle Grid */}
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {vehicles.map((vehicle) => {
                                const isSelected = selected.some((v) => v.id === vehicle.id);
                                return (
                                    <button
                                        key={vehicle.id}
                                        onClick={() => toggleVehicle(vehicle)}
                                        className={cn(
                                            'relative p-6 rounded-2xl border-2 transition-all duration-200 hover:shadow-lg',
                                            isSelected
                                                ? 'border-green-500 bg-green-50'
                                                : 'border-gray-200 bg-white hover:border-gray-300'
                                        )}
                                    >
                                        {/* Checkmark */}
                                        {isSelected && (
                                            <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-scale-up">
                                                <CheckIcon className='text-white' />
                                            </div>
                                        )}

                                        {/* Vehicle Info */}
                                        <div className="text-left mb-4">
                                            <h3 className="font-bold text-gray-900 mb-1">{vehicle.name}</h3>
                                            <p className="text-sm text-gray-500">{vehicle.type}</p>
                                        </div>

                                        {/* Vehicle Image */}
                                        <div className="flex items-center justify-center">
                                            <img
                                                src={vehicle.image}
                                                alt={vehicle.name}
                                                className="w-full h-32 object-contain"
                                            />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between gap-4 p-6 border-t border-gray-100">
                        <button
                            onClick={onClose}
                            className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleDone}
                            disabled={selected.length === 0}
                            className="flex-1 py-4 bg-primary hover:bg-primary-600 text-gray-900 rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

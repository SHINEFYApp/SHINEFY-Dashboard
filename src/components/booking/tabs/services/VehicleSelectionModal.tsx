import { useEffect } from 'react';
import { cn } from '../../../../utils/utils';
import { IoClose } from 'react-icons/io5';
import { CheckIcon } from 'lucide-react';
import type { Vehicle, VehicleSelectionModalProps } from '../../../../types/bookings';
import car from '../../../../assets/addVehicle.svg';

// Small labelled detail row used inside each vehicle card
const DetailRow = ({ label, value }: { label: string; value?: string | number | null }) => {
    if (!value && value !== 0) return null;
    return (
        <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">{label}</span>
            <span className="text-sm font-semibold text-gray-700 truncate">{value}</span>
        </div>
    );
};

export const VehicleSelectionModal = ({
    isOpen,
    onClose,
    selectedVehicles,
    setSelectedVehicles,
    dummyDataVehicles,
    isSuccess ,
}: VehicleSelectionModalProps) => {

    const toggleVehicle = (vehicle: Vehicle) => {
        const isSelected = selectedVehicles.some(v => v.vehicle_id === vehicle.vehicle_id);
        let updatedSelection: Vehicle[];

        if (isSelected) {
        updatedSelection = selectedVehicles.filter(v => v.vehicle_id !== vehicle.vehicle_id);
        } else {
        updatedSelection = [...selectedVehicles, vehicle];
        }

        setSelectedVehicles(updatedSelection);
    };

    const handleDone = () => {
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    useEffect(() => {
        if (!dummyDataVehicles || dummyDataVehicles.length === 0) {
        handleCancel();
        }
    }, [dummyDataVehicles]);

    if (!isOpen) return null;

    return (
        <>
        {/* Backdrop */}
        <div
            className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
            onClick={handleCancel}
        />

        {/* Modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden animate-scale-up">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">Select Vehicle</h2>
                <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                <IoClose className="w-8 h-8" />
                </button>
            </div>

            {/* Body */}
            {isSuccess ?
                <>
                    {
                        (dummyDataVehicles?.length === 0) ? (
                            <div className="h-100 flex justify-center items-center">
                                <p className="text-gray-400">The Client doesn't have any vehicle</p>
                            </div>
                        ) : (
                            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {dummyDataVehicles.map((vehicle: Vehicle) => {
                                const isSelected = selectedVehicles.some(v => v.vehicle_id === vehicle.vehicle_id);

                                return (
                                    <button
                                    key={vehicle.vehicle_id}
                                    onClick={() => toggleVehicle(vehicle)}
                                    type='button'
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
                                        <CheckIcon className="text-white" />
                                        </div>
                                    )}

                                    {/* Vehicle image */}
                                    <div className="flex items-center justify-center mb-3">
                                        <img src={car} alt={vehicle.vehicle_name} className="w-full h-28 object-contain" />
                                    </div>

                                    {/* Vehicle name header */}
                                    <div className="text-left mb-3 border-b border-gray-100 pb-3">
                                        <h3 className="font-bold text-gray-900 leading-tight">{vehicle.vehicle_name}</h3>
                                        {vehicle.vehicle_name_arabic && (
                                            <p className="text-xs text-gray-400 mt-0.5 text-right" dir="rtl">{vehicle.vehicle_name_arabic}</p>
                                        )}
                                    </div>

                                    {/* Detail grid */}
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-left">
                                        <DetailRow label="Make" value={vehicle.make_name} />
                                        <DetailRow label="Model" value={vehicle.model_name} />
                                        <DetailRow label="Plate No." value={vehicle.plate_number} />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">Color</span>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                <span
                                                    className="inline-block w-3 h-3 rounded-full border border-gray-200 shrink-0"
                                                    style={{ backgroundColor: vehicle.color_name ?? '#ccc' }}
                                                />
                                                <span className="text-sm font-semibold text-gray-700 truncate">{vehicle.color_name}</span>
                                            </div>
                                        </div>
                                    </div>

                                    </button>
                                );
                                })}
                            </div>
                            </div>
                        )
                    }
                </>
                :
                <div className="h-100 flex justify-center items-center">
                    <p className="text-gray-400">Not Find Any Client</p>
                </div>
            }

            {/* Footer */}
            <div className="flex items-center justify-between gap-4 p-6 border-t border-gray-100">
                <p className="text-sm text-gray-600">{selectedVehicles.length} vehicle(s) selected</p>
                <div className="flex gap-4">
                <button
                    onClick={handleCancel}
                    className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleDone}
                    disabled={selectedVehicles.length === 0}
                    className="px-8 py-3 bg-primary hover:bg-primary-600 text-gray-900 rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Done
                </button>
                </div>
            </div>
            </div>
        </div>
        </>
    );
};


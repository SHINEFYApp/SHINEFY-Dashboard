import { useState } from 'react';
import { cn } from '../../../../utils/utils';
import { IoClose } from 'react-icons/io5';
import { CheckIcon, Clock, DollarSign } from 'lucide-react';
import type { ApiExtraService, ExtraService } from '../../../../types/bookings';

interface ExtraServiceModalProps {
    onClose: () => void;
    availableExtras: ApiExtraService[];
    selectedExtras: ExtraService[];
    onConfirm: (updated: ExtraService[]) => void;
}

export const ExtraServiceModal = ({
    onClose,
    availableExtras,
    selectedExtras,
    onConfirm,
}: ExtraServiceModalProps) => {
    // Local draft state — only committed when "Done" is clicked
    const [draft, setDraft] = useState<ExtraService[]>(selectedExtras);

    const getQty = (id: string) => draft.find((s) => s.id === id)?.quantity ?? 0;

    const handleQtyChange = (service: ApiExtraService, delta: number) => {
        setDraft((prev) => {
            const svcId = String(service.extra_service_id);
            const svcName = service.extra_service_name?.[0] || 'Unknown';
            const existing = prev.find((s) => s.id === svcId);
            const newQty = (existing?.quantity ?? 0) + delta;

            if (newQty <= 0) {
                return prev.filter((s) => s.id !== svcId);
            }
            if (existing) {
                return prev.map((s) => s.id === svcId ? { ...s, quantity: newQty } : s);
            }
            return [...prev, { id: svcId, name: svcName, quantity: newQty }];
        });
    };

    const handleDone = () => {
        onConfirm(draft);
        onClose();
    };

    const handleCancel = () => {
        setDraft(selectedExtras); // discard changes
        onClose();
    };

    const totalSelected = draft.reduce((sum, s) => sum + s.quantity, 0);

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
                onClick={handleCancel}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scale-up">

                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Add Extra Services</h2>
                            <p className="text-sm text-gray-400 mt-0.5">Select and set quantities for each service</p>
                        </div>
                        <button
                            onClick={handleCancel}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <IoClose className="w-8 h-8" />
                        </button>
                    </div>

                    {/* Body */}
                    {availableExtras.length === 0 ? (
                        <div className="h-40 flex justify-center items-center">
                            <p className="text-gray-400">No extra services available for this service.</p>
                        </div>
                    ) : (
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {availableExtras.map((service) => {
                                    const svcId = String(service.extra_service_id);
                                    const qty = getQty(svcId);
                                    const isSelected = qty > 0;

                                    return (
                                        <div
                                            key={svcId}
                                            onClick={() => {
                                                if (!isSelected) handleQtyChange(service, +1);
                                            }}
                                            className={cn(
                                                'relative p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer',
                                                isSelected
                                                    ? 'border-green-500 bg-green-50'
                                                    : 'border-gray-200 bg-hover:border-green-300'
                                            )}
                                        >
                                            {/* Selected checkmark */}
                                            {isSelected && (
                                                <div className="absolute top-4 right-4 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center animate-scale-up">
                                                    <CheckIcon className="text-white w-4 h-4" />
                                                </div>
                                            )}

                                            {/* Service info */}
                                            <div className="mb-4">
                                                <h3 className="font-bold text-gray-900 leading-tight pr-8">{service.extra_service_name?.[0]}</h3>
                                                {service.extra_service_name?.[1] && (
                                                    <p className="text-xs text-gray-400 mt-0.5 text-right" dir="rtl">{service.extra_service_name[1]}</p>
                                                )}
                                                <div className="flex items-center gap-4 mt-2">
                                                    {service.extra_service_price && (
                                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                                            <DollarSign className="w-3 h-3" />
                                                            <span>{service.extra_service_price}</span>
                                                        </div>
                                                    )}
                                                    {service.extra_service_time && (
                                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                                            <Clock className="w-3 h-3" />
                                                            <span>{service.extra_service_time} min</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Quantity stepper */}
                                            <div className="flex items-center justify-between mt-3">
                                                <span className="text-sm font-medium text-gray-600">Quantity</span>
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleQtyChange(service, -1);
                                                        }}
                                                        disabled={qty === 0}
                                                        className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-red-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="w-6 text-center font-bold text-gray-900">{qty}</span>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleQtyChange(service, +1);
                                                        }}
                                                        className="w-8 h-8 rounded-full border-2 border-green-400 flex items-center justify-center text-green-600 hover:bg-green-50 transition-colors font-bold"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between gap-4 p-6 border-t border-gray-100">
                        <p className="text-sm text-gray-600">{totalSelected} item(s) selected</p>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDone}
                                className="px-8 py-3 bg-primary hover:bg-primary-600 text-gray-900 rounded-xl font-bold transition-colors"
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

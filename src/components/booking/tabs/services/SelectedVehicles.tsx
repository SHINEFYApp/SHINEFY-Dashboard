import { CheckIcon } from 'lucide-react';
import addVehicle from '../../../../assets/addVehicle.svg';

interface Vehicle {
    id: string;
    name: string;
    type: string;
    image: string;
}

interface SelectedVehiclesProps {
    vehicles: Vehicle[];
    onAddClick: () => void;
}

export const SelectedVehicles = ({ vehicles, onAddClick }: SelectedVehiclesProps) => {
    if (vehicles.length === 0) {
        // Show initial add vehicle placeholder
        return (
            <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Select Vehicle
                </label>
                <button
                    type="button"
                    onClick={onAddClick}
                    className="w-full md:w-80 h-56 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                >
                    <img src={addVehicle} alt="add vehicle" className="size-52" />
                </button>
            </div>
        );
    }

    // Show selected vehicles in horizontal scroll with "Select" card at the end
    return (
        <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
                Select Vehicle
            </label>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {/* Selected Vehicles */}
                {vehicles.map((vehicle) => (
                    <div
                        key={vehicle.id}
                        className="shrink-0 w-80 p-6 rounded-2xl border-2 border-green-500 bg-white relative transition-all duration-200 hover:shadow-lg"
                    >
                        {/* Green Checkmark */}
                        <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md animate-scale-up">
                            <CheckIcon className='text-white' />
                        </div>

                        {/* Vehicle Info */}
                        <div className="mb-4">
                            <h3 className="font-bold text-lg text-gray-900">{vehicle.name}</h3>
                            <p className="text-sm text-gray-500">{vehicle.type}</p>
                        </div>

                        {/* Vehicle Image */}
                        <div className="flex items-center justify-center h-32">
                            <img
                                src={vehicle.image}
                                alt={vehicle.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                ))}

                {/* Add More "Select" Card */}
                <div className="flex flex-col gap-2">

                    <label className="text-sm font-medium text-gray-700">
                        Select Vehicle
                    </label>
                    <button
                        type="button"
                        onClick={onAddClick}
                        className="w-80 h-56 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300  cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-200 group shrink-0">
                        <img src={addVehicle} alt="add vehicle" className="size-52 mx-auto" />
                    </button>
                </div>

            </div>
        </div>
    );
};

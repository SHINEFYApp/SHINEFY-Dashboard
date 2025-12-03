import { ArrowUpFromLine, Trash2, History } from "lucide-react";
import { CustomTable } from "../../../common/CustomTable";
import { DetailRow } from "../../../components/booking/DetailRow";
import { dummyVehicles, financeRows, mainDetails, statusDetails } from "../../../constants/data";


const ManageBookingDetails = () => {

    // Handle vehicle actions
    const handleUpdateVehicle = (vehicle: any) => {
        console.log("Update vehicle:", vehicle);
    };

    const handleDeleteVehicle = (vehicle: any) => {
        console.log("Delete vehicle:", vehicle);
    };

    // Define vehicle table columns
    const vehicleColumns: any[] = [
        {
            key: "image",
            title: "Image",
            width: "w-32",
            render: (value: string, row: Vehicle) => (
                <div className="flex items-center justify-center">
                    <img
                        src={value}
                        alt={`${row.make} ${row.model}`}
                        className="w-24 h-16 object-contain"
                    />
                </div>
            ),
        },
        {
            key: "make",
            title: "Make",
            render: (value: string) => (
                <span className="text-gray-700 font-medium">{value}</span>
            ),
        },
        {
            key: "model",
            title: "Model",
            render: (value: string) => (
                <span className="text-gray-700 font-medium">{value}</span>
            ),
        },
        {
            key: "plateNumber",
            title: "Plate Number",
            render: (value: string) => (
                <span className="text-gray-700 font-medium" dir="rtl">
                    {value}
                </span>
            ),
        },
        {
            key: "color",
            title: "Color",
            render: (value: string, row: Vehicle) => (
                <div className="flex items-center gap-3">
                    <div
                        className="w-8 h-8 rounded-md border border-gray-300 shadow-sm"
                        style={{ backgroundColor: row.colorHex }}
                    />
                    <span className="text-gray-700 font-medium">{value}</span>
                </div>
            ),
        },
        {
            key: "action",
            title: "Action",
            width: "w-48",
            render: (_: any, row: Vehicle) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleUpdateVehicle(row)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-500 rounded-lg text-green-700 font-medium text-xs hover:bg-green-100 transition-all"
                    >
                        <ArrowUpFromLine className="w-3 h-3" />
                        Update
                    </button>
                    <button
                        onClick={() => handleDeleteVehicle(row)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-300 rounded-lg text-red-700 font-medium text-xs hover:bg-red-100 transition-all"
                    >
                        <Trash2 className="w-3 h-3" />
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            {/* Booking Details Section */}
            <div className="w-full bg-white shadow-md p-4 md:p-6 rounded-2xl">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200">
                    <h1 className="text-xl md:text-2xl font-bold text-secondary-900">
                        Booking Details
                    </h1>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                        <button className="px-6 py-2.5 bg-primary rounded-lg text-secondary-900 font-semibold hover:bg-primary-600 transition-all shadow-sm hover:shadow-md whitespace-nowrap text-sm">
                            Track Booking
                        </button>

                        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#C9FFCB] border border-[#4CAF50] rounded-lg text-green-700 font-medium text-xs transition-all whitespace-nowrap">
                            <ArrowUpFromLine className="size-3" />
                            Update
                        </button>

                        <button className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 rounded-lg text-red-700 font-medium text-xs transition-all whitespace-nowrap">
                            <Trash2 className="size-3" />
                            Delete
                        </button>

                        <button className="flex items-center justify-center p-2.5 bg-purple-50 border border-purple-200 rounded-lg text-purple-700 hover:bg-purple-100 transition-all">
                            <History className="size-4" />
                        </button>
                    </div>
                </div>

                {/* Booking Details Grid */}
                <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-x-[10%] gap-y-4">
                    <div className="space-y-4">
                        {mainDetails.map((prop, i) => (
                            <DetailRow key={prop.label} {...prop} />
                        ))}
                    </div>
                    <div className="space-y-4">
                        {statusDetails.map((prop, i) => (
                            <DetailRow key={prop.label} {...prop} />
                        ))}
                    </div>
                </div>

                {/* Vehicle Table Section */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200 mt-10">
                    <h1 className="text-xl md:text-2xl font-bold text-secondary-900">
                        User Cars Details
                    </h1>

                    <button className="flex items-center justify-center p-2.5 bg-purple-50 border border-purple-200 rounded-lg text-purple-700 hover:bg-purple-100 transition-all">
                        <History className="size-4" />
                    </button>
                </div>

                <div className="w-full mt-4">
                    <CustomTable
                        columns={vehicleColumns}
                        data={dummyVehicles}
                        currentPage={1}
                        totalPages={1}
                        totalEntries={dummyVehicles.length}
                        pageSize={10}
                        onPageChange={(page) => console.log("Page changed:", page)}
                        isLoading={false}
                    />
                </div>

                {/* Service Boys Section */}
                <h1 className="text-xl md:text-2xl font-bold text-secondary-900 pb-6 border-b border-gray-200 mt-10">
                    Service boys Details
                </h1>

                <div className="w-full mt-4">
                    <CustomTable
                        columns={vehicleColumns}
                        data={dummyVehicles}
                        currentPage={1}
                        totalPages={1}
                        totalEntries={dummyVehicles.length}
                        pageSize={10}
                        onPageChange={(page) => console.log("Page changed:", page)}
                        isLoading={false}
                    />
                </div>
                <div className="w-1/2 mt-5">
                    {financeRows.map((row, idx) =>
                        row.isDivider ? (
                            <div key={idx} className="pt-4 border-t border-gray-200" />
                        ) : (
                            <DetailRow
                                key={row.label}
                                label={row.label}
                                value={row.value}
                                type={row.type}
                                badgeColor={row.badgeColor}
                            />
                        )
                    )}
                </div>

            </div>
        </div>
    );
};

export default ManageBookingDetails;

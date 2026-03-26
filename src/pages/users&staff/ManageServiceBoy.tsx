import { useState, useMemo } from "react";
import { FormDropdown } from "../../common/FormDropdown";
import { exportTypes, franchise } from "../../constants/data";
import { manageServiceBoySearchInitialValues } from "../../constants/initialValues";
import { FilterHeader } from "../../common/FilterHeader";
import { FormDatePicker } from "../../common/FormDatePicker";
import { CustomTable } from "../../common/CustomTable";
import { useGetServiceBoys, useDeleteServiceBoy, useUpdateServiceBoyStatus, useExportServiceBoys, useSetServiceBoyTemporaryOff } from "../../api/features/serviceBoys.hooks";
import { GenericModal } from "../../common/GenericModal";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, MapPin, Clock, Trash2, Ban, ArrowUpToLine, CheckCircle, Navigation } from "lucide-react";
import { Link } from "react-router-dom";

const ManageServiceBoy = () => {
    const queryClient = useQueryClient();
    const [statusFilter, setStatusFilter] = useState("");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const [offModalOpen, setOffModalOpen] = useState(false);
    const [selectedBoyId, setSelectedBoyId] = useState<number | null>(null);
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    const handleSearchSubmit = (values: any) => {
        setSearch(values.search);
        setCurrentPage(1);
    };

    const handleFilterSubmit = (values: any) => {
        setStatusFilter(values.status || "");
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Data Fetching
    const { data, isLoading } = useGetServiceBoys({
        limit: pageSize,
        page: currentPage,
        search: search,
        work_status: statusFilter
    });


    // Response structure: { status: "success", data: { data: [...] } }
    // Log showed data.data.data is { data: [...] } so we need one more level.
    // Assuming response structure is { status: "success", data: { data: [...], pagination: {...} } }
    const serviceBoysRaw = data?.data?.data?.data;
    const serviceBoys = (Array.isArray(serviceBoysRaw) ? serviceBoysRaw : []) as any[];

    const pagination = data?.data?.data?.pagination;
    const totalEntries = pagination?.total_items || pagination?.total || serviceBoys.length;
    const totalPages = pagination?.total_pages || pagination?.last_page || Math.ceil(totalEntries / pageSize);

    // Mutations
    const deleteMutation = useDeleteServiceBoy({
        onSuccess: () => {
            toast.success("Service Boy deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["service-boys"] });
        },
        onError: () => toast.error("Failed to delete")
    });

    const statusMutation = useUpdateServiceBoyStatus({
        onSuccess: () => {
            toast.success("Status updated");
            queryClient.invalidateQueries({ queryKey: ["service-boys"] });
        },
        onError: () => toast.error("Failed to update status")
    });

    const exportMutation = useExportServiceBoys({
        onSuccess: () => toast.success("Export successful"),
        onError: () => toast.error("Export failed")
    });

    const offMutation = useSetServiceBoyTemporaryOff({
        onSuccess: () => {
            toast.success("Temporary off time set successfully");
            setOffModalOpen(false);
            setDateFrom("");
            setDateTo("");
        },
        onError: () => toast.error("Failed to set temporary off time")
    });

    const handleDelete = (id: number) => {
        toast("Are you sure you want to delete this Service Boy?", {
            action: {
                label: "Confirm",
                onClick: () => deleteMutation.mutate(id)
            }
        });
    };

    const handleStatusChange = (id: number, currentStatus: number) => {
        const newStatus = currentStatus === 1 ? 0 : 1;
        const msg = newStatus === 1 ? "Are you sure you want to activate?" : "Are you sure you want to deactivate?";
        toast(msg, {
            action: {
                label: "Confirm",
                onClick: () => statusMutation.mutate({ id, data: { active_flag: newStatus } })
            }
        });
    };

    const handleOffTimeClick = (id: number) => {
        setSelectedBoyId(id);
        setOffModalOpen(true);
    };

    const handleOffTimeConfirm = () => {
        if (!selectedBoyId || !dateFrom || !dateTo) {
            toast.error("Please select both from and to dates");
            return;
        }

        const formatDateTime = (dt: string) => dt.includes('T') ? dt.replace('T', ' ') + ':00' : dt;

        offMutation.mutate({
            id: selectedBoyId,
            data: {
                date_from: formatDateTime(dateFrom),
                date_to: formatDateTime(dateTo)
            }
        });
    };

    const handleExport = (type: string) => {
        const exportType = type.toLowerCase() as 'csv' | 'excel' | 'pdf';
        exportMutation.mutate({
            type: exportType,
            params: { search, work_status: statusFilter }
        });
    };

    // Columns Definition
    const columns = useMemo(() => [
        {
            key: "image_url",
            title: "Image",
            render: (image_url: string) => (
                <div className="w-10 h-10 rounded-full overflow-hidden">
                    {image_url ? <img src={image_url} alt="Service Boy" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-200"></div>}
                </div>
            ),
        },
        { key: "name", title: "Name" },
        { key: "phone_number_display", title: "Phone Number" },
        { key: "registered_at", title: "Registration On" },
        {
            key: "active_flag",
            title: "Status",
            render: (active_flag: number) => (
                <span className={`font-bold ${active_flag === 1 ? "text-green-600" : "text-red-600"}`}>
                    {active_flag === 1 ? "Activated" : "Deactivated"}
                </span>
            ),
        },
        {
            key: "action",
            title: "Action",
            width: "w-[600px]",
            render: (_: any, record: any) => (
                <div className="flex gap-2 items-center text-nowrap">
                    <Link
                        to={`/users&staff/manage/serviceBoy/${record.user_id}`}
                        className="bg-[#D2E3FF] flex items-center gap-2 rounded-[2.75px] text-[#2196F3] border border-[#2196F3] capitalize hover:text-[#D2E3FF] hover:bg-[#2196F3] px-3.5 py-3 font-semibold transition-colors"
                    >
                        <Eye size={18} /> View
                    </Link>
                    <Link
                        to={`/users&staff/manage/serviceBoy/track/${record.user_id}`}
                        className="bg-[#FFF9C4] flex items-center gap-2 rounded-[2.75px] text-[#FBC02D] border border-[#FBC02D] capitalize hover:text-[#FFF9C4] hover:bg-[#FBC02D] px-3.5 py-3 font-semibold transition-colors"
                    >
                        <Navigation size={18} /> track
                    </Link>
                    <Link
                        to={`/users&staff/manage/serviceBoy/edit/${record.user_id}`}
                        state={{ mode: 'edit' }}
                        className="bg-[#C9FFCB] flex items-center gap-2 rounded-[2.75px] text-[#4CAF50] border border-[#4CAF50] capitalize hover:text-[#C9FFCB] hover:bg-[#4CAF50] px-3.5 py-3 font-semibold transition-colors"
                    >
                        <ArrowUpToLine size={18} /> update
                    </Link>
                    <button
                        className="bg-[#E1BEE7] flex items-center gap-2 rounded-[2.75px] text-[#9C27B0] border border-[#9C27B0] capitalize hover:text-[#E1BEE7] hover:bg-[#9C27B0] px-3.5 py-3 font-semibold transition-colors"
                        onClick={() => alert(`Edit Areas for ${record.user_id}`)}
                    >
                        <MapPin size={18} /> Edit Areas
                    </button>
                    <button
                        className="bg-[#FFE0B2] flex items-center gap-2 rounded-[2.75px] text-[#FF9800] border border-[#FF9800] capitalize hover:text-[#FFE0B2] hover:bg-[#FF9800] px-3.5 py-3 font-semibold transition-colors"
                        onClick={() => handleOffTimeClick(record.user_id)}
                    >
                        <Clock size={18} /> Off Time
                    </button>
                    <button
                        className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-3.5 py-3 font-semibold transition-colors"
                        onClick={() => handleDelete(record.user_id)}
                    >
                        <Trash2 size={18} /> delete
                    </button>
                    <button
                        className="bg-[#F5F5F5] flex items-center gap-2 rounded-[2.75px] text-[#757575] border border-[#757575] capitalize hover:text-[#F5F5F5] hover:bg-[#757575] px-3.5 py-3 font-semibold transition-colors"
                        onClick={() => handleStatusChange(record.user_id, record.active_flag)}
                    >
                        {record.active_flag === 1 ? <Ban size={18} /> : <CheckCircle size={18} />}
                        {record.active_flag === 1 ? "Deactivate" : "Activate"}
                    </button>
                </div>
            ),
        }
    ], [handleDelete, handleStatusChange, handleOffTimeClick]);

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                {/* Filter Section */}
                <FilterHeader
                    subtitle="Manage Service Boy"
                    searchInitialValues={manageServiceBoySearchInitialValues}
                    onSearchSubmit={handleSearchSubmit}
                    filterInitialValues={manageServiceBoySearchInitialValues}
                    onFilterSubmit={handleFilterSubmit}
                    filterModalTitle="Filter Options"
                    filterModalSubtitle="Manage Service Boy"
                    filterFields={
                        <>
                            <FormDropdown
                                name="status"
                                label="Status"
                                placeholder="Choose Status"
                                options={['Pending', 'Confirmed', 'Completed', 'Cancelled']}
                            />
                            <FormDropdown
                                name="franchise"
                                label="Franchise"
                                placeholder="Choose Franchise"
                                options={franchise}
                            />
                            <FormDatePicker
                                name="date"
                                label="Date"
                                placeholder="Select Date"
                                checkmark={false}
                            />
                        </>
                    }
                    actionButtons={[
                        {
                            label: "Add Service Boy",
                            href: "/users&staff/manage/serviceBoy/addServiceBoy",
                            variant: "primary"
                        }
                    ]}
                    onExport={handleExport}
                    showExport={true}
                    exportOptions={exportTypes}
                />

                {/* Table Section */}
                <div className="mt-6">
                    {isLoading ? <div>Loading...</div> : (
                        <CustomTable
                            columns={columns}
                            data={serviceBoys}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalEntries={totalEntries}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>

            <GenericModal
                isOpen={offModalOpen}
                onClose={() => setOffModalOpen(false)}
                title="Set Temporary Off Time"
                subtitle="Select the start and end time for this Service Boy to be offline."
            >
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="dateFrom" className="text-sm font-bold text-gray-700">Date & Time From</label>
                        <input
                            id="dateFrom"
                            type="datetime-local"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="dateTo" className="text-sm font-bold text-gray-700">Date & Time To</label>
                        <input
                            id="dateTo"
                            type="datetime-local"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black"
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-8">
                    <button
                        className="px-6 py-2 rounded-lg font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                        onClick={() => setOffModalOpen(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-6 py-2 rounded-lg font-bold text-black bg-[#FFC107] hover:bg-yellow-500 transition-colors"
                        onClick={handleOffTimeConfirm}
                    >
                        Confirm Off Time
                    </button>
                </div>
            </GenericModal>
        </main>
    );
};

export default ManageServiceBoy;
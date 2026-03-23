import { useState, useMemo } from "react";
import { FormDropdown } from "../../common/FormDropdown";
import { exportTypes, franchise } from "../../constants/data";
import { manageServiceBoySearchInitialValues } from "../../constants/initialValues";
import { FilterHeader } from "../../common/FilterHeader";
import { FormDatePicker } from "../../common/FormDatePicker";
import { CustomTable } from "../../common/CustomTable";
import { useGetServiceBoys, useDeleteServiceBoy, useUpdateServiceBoyStatus, useExportServiceBoys } from "../../api/features/serviceBoys.hooks";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, MapPin, Clock, Trash2, Ban, ArrowUpToLine, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ManageServiceBoy = () => {
    const queryClient = useQueryClient();
    const [statusFilter, setStatusFilter] = useState("");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

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
        start: (currentPage - 1) * pageSize,
        search: search,
        work_status: statusFilter
    });


    // Response structure: { status: "success", data: { data: [...] } }
    // Log showed data.data.data is { data: [...] } so we need one more level.
    const serviceBoysRaw = data?.data?.data?.data;
    const serviceBoys = (Array.isArray(serviceBoysRaw) ? serviceBoysRaw : []) as any[];

    // Pagination data seems missing in the provided JSON snippet. 
    // Assuming we might need to assume a total or check if it's elsewhere.
    // For now, let's assume total_items is returned or default to length.
    const pagination = data?.data?.pagination;
    const totalEntries = pagination?.total_items || serviceBoys.length;
    const totalPages = pagination?.total_pages || Math.ceil(totalEntries / pageSize);

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

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure?")) {
            deleteMutation.mutate(id);
        }
    };

    const handleStatusChange = (id: number, currentStatus: number) => {
        statusMutation.mutate({ id, data: { active_flag: currentStatus === 1 ? 0 : 1 } });
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
                        to={`/users&staff/manage/ServiceBoy/${record.user_id}`}
                        className="bg-[#D2E3FF] flex items-center gap-2 rounded-[2.75px] text-[#2196F3] border border-[#2196F3] capitalize hover:text-[#D2E3FF] hover:bg-[#2196F3] px-3.5 py-3 font-semibold transition-colors"
                    >
                        <Eye size={18} /> View
                    </Link>
                    <Link
                        to={`/users&staff/manage/ServiceBoy/${record.user_id}`}
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
                        onClick={() => alert(`Off Time for ${record.user_id}`)}
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
    ], [handleDelete, handleStatusChange]);

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
        </main>
    );
};

export default ManageServiceBoy;
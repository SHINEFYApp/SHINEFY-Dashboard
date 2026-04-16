import { useState, useMemo } from "react";
import { FormDropdown } from "../../common/FormDropdown";
import { exportTypes, franchise } from "../../constants/data";
import { manageServiceBoySearchInitialValues } from "../../constants/initialValues";
import { FilterHeader } from "../../common/FilterHeader";
import { FormDatePicker } from "../../common/FormDatePicker";
import { CustomTable } from "../../common/CustomTable";
import { useGetServiceBoys, useDeleteServiceBoy, useUpdateServiceBoyStatus, useExportServiceBoys, useSetServiceBoyTemporaryOff, useGetServiceBoyAreas, useUpdateServiceBoyAreas } from "../../api/features/serviceBoys.hooks";
import { useGetSubAreas } from "../../api/features/areas.hooks";
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
    const [areasModalOpen, setAreasModalOpen] = useState(false);
    const [areasEditMode, setAreasEditMode] = useState(false);
    const [selectedBoyId, setSelectedBoyId] = useState<number | null>(null);
    const [selectedAreas, setSelectedAreas] = useState<number[]>([]);
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
        start: currentPage,
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

    // Fetch service boy's current areas when modal is open
    const { data: areasData, isLoading: areasLoading } = useGetServiceBoyAreas(selectedBoyId!, {
        enabled: !!selectedBoyId && areasModalOpen,
    });
    const serviceBoyAreas = (areasData?.data?.data?.areas || areasData?.data?.areas || []) as { area_id: number; area_name: string }[];

    // Fetch all available sub areas for edit mode
    const { data: allAreasData, isLoading: allAreasLoading } = useGetSubAreas({
        limit: 100,
    });
    const allSubAreasRaw = allAreasData?.data?.data?.data || allAreasData?.data?.data || [];
    const allSubAreas = (Array.isArray(allSubAreasRaw) ? allSubAreasRaw : []) as { id: number; area_name: string }[];

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

    const exportMutation = useExportServiceBoys();

    const offMutation = useSetServiceBoyTemporaryOff({
        onSuccess: () => {
            toast.success("Temporary off time set successfully");
            setOffModalOpen(false);
            setDateFrom("");
            setDateTo("");
        },
        onError: () => toast.error("Failed to set temporary off time")
    });

    const updateAreasMutation = useUpdateServiceBoyAreas({
        onSuccess: () => {
            toast.success("Areas updated successfully");
            setAreasEditMode(false);
            queryClient.invalidateQueries({ queryKey: ["service-boy-areas", selectedBoyId] });
        },
        onError: () => toast.error("Failed to update areas")
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

    const handleEditAreasClick = (id: number) => {
        setSelectedBoyId(id);
        setAreasEditMode(false);
        setSelectedAreas([]);
        setAreasModalOpen(true);
    };

    const handleEnterEditMode = () => {
        setSelectedAreas(serviceBoyAreas.map(a => a.area_id));
        setAreasEditMode(true);
    };

    const handleAreaToggle = (areaId: number) => {
        setSelectedAreas(prev =>
            prev.includes(areaId)
                ? prev.filter(id => id !== areaId)
                : [...prev, areaId]
        );
    };

    const handleAreasConfirm = () => {
        if (!selectedBoyId) return;
        updateAreasMutation.mutate({
            id: selectedBoyId,
            data: { service_boy_areas: selectedAreas }
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
        toast.info(`Exporting as ${type}...`);
        exportMutation.mutate({
            type: exportType,
            params: { search, work_status: statusFilter }
        }, {
            onSuccess: (response: any) => {
                const blob = response?.data instanceof Blob ? response.data : response;
                if (blob instanceof Blob) {
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    const ext = exportType === 'csv' ? 'csv' : exportType === 'pdf' ? 'pdf' : 'xlsx';
                    link.setAttribute('download', `ServiceBoys_Export_${new Date().getTime()}.${ext}`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                    toast.success("Export successful! Your download should start shortly.");
                } else {
                    toast.error("Export failed: Unexpected response format.");
                }
            },
            onError: (error: any) => {
                toast.error(`Export failed: ${error?.message || "Unknown error"}`);
            }
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
                        onClick={() => handleEditAreasClick(record.user_id)}
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
    ], [handleDelete, handleStatusChange, handleOffTimeClick, handleEditAreasClick]);

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

            {/* Edit Areas Modal */}
            <GenericModal
                isOpen={areasModalOpen}
                onClose={() => { setAreasModalOpen(false); setAreasEditMode(false); }}
                title={areasEditMode ? "Edit Areas" : "Service Boy Areas"}
                subtitle={areasEditMode ? "Select the areas to assign to this Service Boy." : "Currently assigned areas."}
            >
                {areasLoading ? (
                    <div className="text-center py-8 text-gray-500">Loading areas...</div>
                ) : !areasEditMode ? (
                    /* View Mode — show current areas */
                    <>
                        {serviceBoyAreas.length === 0 ? (
                            <div className="text-center py-8 text-gray-400">No areas assigned yet.</div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {serviceBoyAreas.map(area => (
                                    <div
                                        key={area.area_id}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 bg-gray-50"
                                    >
                                        <MapPin size={16} className="text-[#9C27B0]" />
                                        <span className="font-medium text-gray-800">{area.area_name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="flex justify-end gap-4 mt-8">
                            <button
                                className="px-6 py-2 rounded-lg font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                                onClick={() => setAreasModalOpen(false)}
                            >
                                Close
                            </button>
                            <button
                                className="px-6 py-2 rounded-lg font-bold text-white bg-[#9C27B0] hover:bg-[#7B1FA2] transition-colors"
                                onClick={handleEnterEditMode}
                            >
                                Edit Areas
                            </button>
                        </div>
                    </>
                ) : (
                    /* Edit Mode — checkboxes for all sub areas */
                    <>
                        {allAreasLoading ? (
                            <div className="text-center py-8 text-gray-500">Loading all areas...</div>
                        ) : allSubAreas.length === 0 ? (
                            <div className="text-center py-8 text-gray-400">No areas available.</div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {allSubAreas.map(area => (
                                    <label
                                        key={area.id}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                                            selectedAreas.includes(area.id)
                                                ? "border-[#9C27B0] bg-[#F3E5F5]"
                                                : "border-gray-200 bg-white hover:bg-gray-50"
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedAreas.includes(area.id)}
                                            onChange={() => handleAreaToggle(area.id)}
                                            className="w-5 h-5 accent-[#9C27B0]"
                                        />
                                        <MapPin size={16} className="text-[#9C27B0]" />
                                        <span className="font-medium text-gray-800">{area.area_name}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                        <div className="flex justify-between items-center mt-8">
                            <span className="text-sm text-gray-500">
                                {selectedAreas.length} area{selectedAreas.length !== 1 ? "s" : ""} selected
                            </span>
                            <div className="flex gap-4">
                                <button
                                    className="px-6 py-2 rounded-lg font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                                    onClick={() => setAreasEditMode(false)}
                                >
                                    Back
                                </button>
                                <button
                                    className="px-6 py-2 rounded-lg font-bold text-white bg-[#9C27B0] hover:bg-[#7B1FA2] transition-colors disabled:opacity-50"
                                    onClick={handleAreasConfirm}
                                    disabled={updateAreasMutation.isPending}
                                >
                                    {updateAreasMutation.isPending ? "Saving..." : "Save Areas"}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </GenericModal>
        </main>
    );
};

export default ManageServiceBoy;
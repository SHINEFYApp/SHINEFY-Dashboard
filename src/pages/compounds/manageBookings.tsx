import { useState, useMemo, useEffect } from "react";
import { FilterHeader } from "../../common/FilterHeader";
import { CustomTable } from "../../common/CustomTable";
import { FormDropdown } from "../../common/FormDropdown";
import { FormDatePicker } from "../../common/FormDatePicker";
import { GenericModal } from "../../common/GenericModal";
import { FormInput } from "../../common/FormInput";
import { Formik, Form } from "formik";
import { useGetBookings, useBulkAssignServiceBoy, useGetCompounds } from "../../api/features/compounds.hooks";
import { useGetServiceBoys } from "../../api/features/serviceBoys.hooks";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, UserCheck, Search, User, X, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "0", label: "Pending" },
    { value: "1", label: "In Progress" },
    { value: "2", label: "Completed" },
    { value: "3", label: "Cancelled" },
];

const ManageCompoundBookings = () => {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [compoundFilter, setCompoundFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [bulkModalOpen, setBulkModalOpen] = useState(false);
    const [driverSearch, setDriverSearch] = useState("");
    const [selectedDriver, setSelectedDriver] = useState<{ user_id: number; name: string } | null>(null);
    const [showDriverResults, setShowDriverResults] = useState(false);
    const pageSize = 10;

    const { data: compoundsData } = useGetCompounds({ limit: 200 });
    const compoundsList = (compoundsData?.data?.data?.compounds || []) as any[];

    const { data: serviceBoysData, isFetching: isSearchingBoys } = useGetServiceBoys(
        { search: driverSearch || undefined, limit: 10 },
        { enabled: driverSearch.length > 1 }
    );
    const driverResults = (serviceBoysData?.data?.data?.data || []) as any[];

    const handleSearchSubmit = (values: any) => {
        setSearch(values.search);
        setCurrentPage(1);
    };

    const handleFilterSubmit = (values: any) => {
        setStatusFilter(values.status || "");
        setDateFilter(values.date || "");
        setCompoundFilter(values.compound_id || "");
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const { data, isLoading } = useGetBookings({
        limit: pageSize,
        page: currentPage,
        search: search || undefined,
        status: statusFilter || undefined,
        date: dateFilter || undefined,
        compound_id: compoundFilter || undefined,
    });

    const bookingsRaw = data?.data?.data?.bookings;
    const bookings = (Array.isArray(bookingsRaw) ? bookingsRaw : []) as any[];

    const pagination = data?.data?.data?.pagination;
    const totalEntries = pagination?.total_items || bookings.length;
    const totalPages = pagination?.total_pages || Math.ceil(totalEntries / pageSize);

    const bulkMutation = useBulkAssignServiceBoy({
        onSuccess: (res: any) => {
            const msg = res?.data?.data?.message || "Service boy assigned successfully";
            toast.success(msg);
            setBulkModalOpen(false);
            setSelectedDriver(null);
            setDriverSearch("");
            queryClient.invalidateQueries({ queryKey: ["compound-bookings"] });
        },
        onError: () => toast.error("Failed to assign service boy"),
    });

    const handleBulkAssign = (values: any) => {
        if (!selectedDriver) {
            toast.error("Please search and select a driver first");
            return;
        }
        bulkMutation.mutate({
            compound_id: Number(values.compound_id),
            date: values.date,
            service_boy_id: Number(selectedDriver.user_id),
        });
    };

    const statusLabels: Record<string, string> = {
        "0": "Pending",
        "1": "In Progress",
        "2": "Completed",
        "3": "Cancelled",
    };

    const statusColors: Record<string, string> = {
        "0": "text-yellow-600",
        "1": "text-blue-600",
        "2": "text-green-600",
        "3": "text-red-600",
    };

    const columns = useMemo(() => [
        { key: "id", title: "ID" },
        {
            key: "user",
            title: "User",
            render: (user: any) => user?.name || "-",
        },
        {
            key: "compound",
            title: "Compound",
            render: (compound: any) => compound?.name || "-",
        },
        { key: "service_type", title: "Service" },
        { key: "scheduled_date", title: "Date" },
        { key: "period", title: "Period" },
        {
            key: "status",
            title: "Status",
            render: (status: string) => (
                <span className={`font-bold ${statusColors[status] || ""}`}>
                    {statusLabels[status] || status}
                </span>
            ),
        },
        {
            key: "service_boy",
            title: "Service Boy",
            render: (sb: any) => sb?.name || "-",
        },
        {
            key: "action",
            title: "Action",
            render: (_: any, record: any) => (
                <div className="flex gap-2 items-center text-nowrap">
                    <Link
                        to={`/compounds/bookings/${record.id}`}
                        className="bg-[#D2E3FF] flex items-center gap-2 rounded-[2.75px] text-[#2196F3] border border-[#2196F3] capitalize hover:text-[#D2E3FF] hover:bg-[#2196F3] px-3.5 py-3 font-semibold transition-colors"
                    >
                        <Eye size={18} /> details
                    </Link>
                </div>
            ),
        },
    ], []);

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                <FilterHeader
                    subtitle="Manage Bookings"
                    searchInitialValues={{ search: "" }}
                    onSearchSubmit={handleSearchSubmit}
                    filterInitialValues={{ status: "", date: "", compound_id: "" }}
                    onFilterSubmit={handleFilterSubmit}
                    filterModalTitle="Filter Bookings"
                    filterFields={
                        <>
                            <FormDropdown
                                name="compound_id"
                                label="Compound"
                                placeholder="All Compounds"
                                options={compoundsList.map((c: any) => ({
                                    value: String(c.id),
                                    label: c.name_en,
                                }))}
                            />
                            <FormDropdown
                                name="status"
                                label="Status"
                                placeholder="All Statuses"
                                options={["0", "1", "2", "3"]}
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
                            label: "Bulk Assign",
                            variant: "secondary",
                            onClick: () => setBulkModalOpen(true),
                        },
                    ]}
                    showExport={false}
                />
                <div className="mt-6">
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <CustomTable
                            columns={columns}
                            data={bookings}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalEntries={totalEntries}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>

            {/* Bulk Assign Modal */}
            <GenericModal
                isOpen={bulkModalOpen}
                onClose={() => {
                    setBulkModalOpen(false);
                    setSelectedDriver(null);
                    setDriverSearch("");
                }}
                title="Bulk Assign Service Boy"
                subtitle="Assign a service boy to all pending bookings for a compound + date"
            >
                <Formik
                    initialValues={{ compound_id: "", date: "" }}
                    onSubmit={handleBulkAssign}
                >
                    {() => (
                        <Form>
                            <div className="flex flex-col gap-4">
                                <FormDropdown
                                    name="compound_id"
                                    label="Compound *"
                                    placeholder="Select Compound"
                                    options={compoundsList.map((c: any) => ({
                                        value: String(c.id),
                                        label: c.name_en,
                                    }))}
                                />
                                <FormDatePicker name="date" label="Date *" placeholder="Select date" checkmark={false} />

                                <div className="space-y-2 relative">
                                    <label className="text-sm font-medium text-gray-700">Driver *</label>
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                        <input
                                            type="text"
                                            value={selectedDriver ? selectedDriver.name : driverSearch}
                                            placeholder="Search driver by name..."
                                            onChange={(e) => {
                                                setDriverSearch(e.target.value);
                                                setSelectedDriver(null);
                                                setShowDriverResults(true);
                                            }}
                                            onFocus={() => setShowDriverResults(true)}
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 py-3.5 text-sm font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        />
                                        {selectedDriver && (
                                            <button
                                                type="button"
                                                onClick={() => { setSelectedDriver(null); setDriverSearch(""); }}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>

                                    {showDriverResults && !selectedDriver && driverSearch.length > 1 && (
                                        <div className="absolute z-50 w-full mt-1 rounded-xl border border-gray-200 bg-white shadow-lg max-h-48 overflow-auto">
                                            {isSearchingBoys ? (
                                                <div className="px-4 py-3 text-sm text-gray-400">Searching...</div>
                                            ) : driverResults.length > 0 ? (
                                                driverResults.map((boy: any) => (
                                                    <button
                                                        key={boy.user_id}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedDriver({ user_id: boy.user_id, name: boy.name });
                                                            setShowDriverResults(false);
                                                            setDriverSearch("");
                                                        }}
                                                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-3"
                                                    >
                                                        <User className="w-4 h-4 text-gray-400 shrink-0" />
                                                        <span className="font-medium">{boy.name}</span>
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="px-4 py-3 text-sm text-gray-400">No drivers found</div>
                                            )}
                                        </div>
                                    )}

                                    {selectedDriver && (
                                        <div className="rounded-xl border border-green-200 bg-green-50 p-3 flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                                                <Check className="w-4 h-4 text-green-600" />
                                            </div>
                                            <p className="text-sm font-medium text-gray-800">{selectedDriver.name}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-8">
                                <Button type="button" variant="outline" onClick={() => {
                                    setBulkModalOpen(false);
                                    setSelectedDriver(null);
                                    setDriverSearch("");
                                }}>Cancel</Button>
                                <Button type="submit" className="bg-primary text-secondary-900 hover:bg-primary-600" disabled={bulkMutation.isPending || !selectedDriver}>
                                    {bulkMutation.isPending ? "Assigning..." : "Assign"}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </GenericModal>
        </main>
    );
};

export default ManageCompoundBookings;

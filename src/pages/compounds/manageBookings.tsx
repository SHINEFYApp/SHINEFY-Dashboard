import { useState, useMemo } from "react";
import { FilterHeader } from "../../common/FilterHeader";
import { CustomTable } from "../../common/CustomTable";
import { FormDropdown } from "../../common/FormDropdown";
import { FormDatePicker } from "../../common/FormDatePicker";
import { GenericModal } from "../../common/GenericModal";
import { FormInput } from "../../common/FormInput";
import { Formik, Form } from "formik";
import { useGetBookings, useBulkAssignServiceBoy } from "../../api/features/compounds.hooks";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, UserCheck } from "lucide-react";
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
    const [currentPage, setCurrentPage] = useState(1);
    const [bulkModalOpen, setBulkModalOpen] = useState(false);
    const pageSize = 10;

    const handleSearchSubmit = (values: any) => {
        setSearch(values.search);
        setCurrentPage(1);
    };

    const handleFilterSubmit = (values: any) => {
        setStatusFilter(values.status || "");
        setDateFilter(values.date || "");
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
            queryClient.invalidateQueries({ queryKey: ["compound-bookings"] });
        },
        onError: () => toast.error("Failed to assign service boy"),
    });

    const handleBulkAssign = (values: any) => {
        bulkMutation.mutate({
            compound_id: Number(values.compound_id),
            date: values.date,
            service_boy_id: Number(values.service_boy_id),
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
                    filterInitialValues={{ status: "", date: "" }}
                    onFilterSubmit={handleFilterSubmit}
                    filterModalTitle="Filter Bookings"
                    filterFields={
                        <>
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
                onClose={() => setBulkModalOpen(false)}
                title="Bulk Assign Service Boy"
                subtitle="Assign a service boy to all pending bookings for a compound + date"
            >
                <Formik
                    initialValues={{ compound_id: "", date: "", service_boy_id: "" }}
                    onSubmit={handleBulkAssign}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="flex flex-col gap-4">
                                <FormInput name="compound_id" label="Compound ID *" type="number" placeholder="Enter compound ID" />
                                <FormDatePicker name="date" label="Date *" placeholder="Select date" checkmark={false} />
                                <FormInput name="service_boy_id" label="Service Boy ID *" type="number" placeholder="Enter service boy user ID" />
                            </div>
                            <div className="flex justify-end gap-4 mt-8">
                                <Button type="button" variant="outline" onClick={() => setBulkModalOpen(false)}>Cancel</Button>
                                <Button type="submit" className="bg-primary text-secondary-900 hover:bg-primary-600" disabled={isSubmitting}>
                                    {isSubmitting ? "Assigning..." : "Assign"}
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

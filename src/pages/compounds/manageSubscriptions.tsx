import { useState, useMemo } from "react";
import { exportTypes } from "../../constants/data";
import { FilterHeader } from "../../common/FilterHeader";
import { CustomTable } from "../../common/CustomTable";
import { FormDropdown } from "../../common/FormDropdown";
import { FormDatePicker } from "../../common/FormDatePicker";
import { useGetSubscriptions, useDeleteSubscription, useUpdateSubscriptionStatus } from "../../api/features/compounds.hooks";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, Trash2, Ban, CheckCircle, PauseCircle, Play } from "lucide-react";
import { Link } from "react-router-dom";

const statusOptions = ["active", "pending", "paused", "cancelled", "completed", "expired"];
const shiftOptions = ["day", "night"];

const ManageCompoundSubscriptions = () => {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [shiftFilter, setShiftFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const handleSearchSubmit = (values: any) => {
        setSearch(values.search);
        setCurrentPage(1);
    };

    const handleFilterSubmit = (values: any) => {
        setStatusFilter(values.status || "");
        setShiftFilter(values.shift || "");
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const { data, isLoading } = useGetSubscriptions({
        limit: pageSize,
        page: currentPage,
        search: search || undefined,
        status: statusFilter || undefined,
        shift: shiftFilter || undefined,
    });

    const subsRaw = data?.data?.data?.subscriptions;
    const subscriptions = (Array.isArray(subsRaw) ? subsRaw : []) as any[];

    const pagination = data?.data?.data?.pagination;
    const totalEntries = pagination?.total_items || subscriptions.length;
    const totalPages = pagination?.total_pages || Math.ceil(totalEntries / pageSize);

    const deleteMutation = useDeleteSubscription({
        onSuccess: () => {
            toast.success("Subscription deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["compound-subscriptions"] });
        },
        onError: () => toast.error("Failed to delete subscription"),
    });

    const statusMutation = useUpdateSubscriptionStatus({
        onSuccess: () => {
            toast.success("Status updated successfully");
            queryClient.invalidateQueries({ queryKey: ["compound-subscriptions"] });
        },
        onError: () => toast.error("Failed to update status"),
    });

    const handleDelete = (id: number) => {
        toast("Are you sure you want to delete this Subscription?", {
            action: {
                label: "Confirm",
                onClick: () => deleteMutation.mutate(id),
            },
        });
    };

    const handleStatusChange = (id: number, currentStatus: string) => {
        const nextStatus = currentStatus === "active" ? "paused" : "active";
        toast(`Change status to ${nextStatus}?`, {
            action: {
                label: "Confirm",
                onClick: () => statusMutation.mutate({ id, data: { status: nextStatus } }),
            },
        });
    };

    const statusColors: Record<string, string> = {
        active: "text-green-600",
        pending: "text-yellow-600",
        paused: "text-orange-600",
        cancelled: "text-red-600",
        completed: "text-blue-600",
        expired: "text-gray-500",
    };

    const columns = useMemo(() => [
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
        {
            key: "package",
            title: "Package",
            render: (pkg: any) => pkg?.name || "-",
        },
        { key: "start_date", title: "Start Date" },
        { key: "end_date", title: "End Date" },
        {
            key: "status",
            title: "Status",
            render: (status: string) => (
                <span className={`font-bold capitalize ${statusColors[status] || ""}`}>
                    {status}
                </span>
            ),
        },
        {
            key: "action",
            title: "Action",
            render: (_: any, record: any) => (
                <div className="flex gap-2 items-center text-nowrap">
                    <Link
                        to={`/compounds/subscriptions/${record.id}`}
                        className="bg-[#D2E3FF] flex items-center gap-2 rounded-[2.75px] text-[#2196F3] border border-[#2196F3] capitalize hover:text-[#D2E3FF] hover:bg-[#2196F3] px-3.5 py-3 font-semibold transition-colors"
                    >
                        <Eye size={18} /> view
                    </Link>
                    <button
                        className={`flex items-center gap-2 rounded-[2.75px] px-3.5 py-3 font-semibold capitalize transition-colors ${
                            record.status === "active"
                                ? "bg-[#FFE0B2] text-[#FF9800] border border-[#FF9800] hover:text-[#FFE0B2] hover:bg-[#FF9800]"
                                : "bg-[#C9FFCB] text-[#4CAF50] border border-[#4CAF50] hover:text-[#C9FFCB] hover:bg-[#4CAF50]"
                        }`}
                        onClick={() => handleStatusChange(record.id, record.status)}
                    >
                        {record.status === "active" ? <PauseCircle size={18} /> : <Play size={18} />}
                        {record.status === "active" ? "pause" : "activate"}
                    </button>
                    <button
                        className="bg-[#FFD5D2] flex items-center gap-2 rounded-[2.75px] text-[#F44336] border border-[#F44336] capitalize hover:text-[#FFD5D2] hover:bg-[#F44336] px-3.5 py-3 font-semibold transition-colors"
                        onClick={() => handleDelete(record.id)}
                    >
                        <Trash2 size={18} /> delete
                    </button>
                </div>
            ),
        },
    ], [handleDelete, handleStatusChange]);

    return (
        <main>
            <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 rounded-2xl">
                <FilterHeader
                    subtitle="Manage Subscriptions"
                    searchInitialValues={{ search: "" }}
                    onSearchSubmit={handleSearchSubmit}
                    filterInitialValues={{ status: "", shift: "" }}
                    onFilterSubmit={handleFilterSubmit}
                    filterModalTitle="Filter Subscriptions"
                    filterFields={
                        <>
                            <FormDropdown
                                name="status"
                                label="Status"
                                placeholder="All Statuses"
                                options={statusOptions}
                            />
                            <FormDropdown
                                name="shift"
                                label="Shift"
                                placeholder="All Shifts"
                                options={shiftOptions}
                            />
                        </>
                    }
                    actionButtons={[
                        {
                            label: "Add Subscription",
                            href: "/compounds/subscriptions/add",
                            variant: "primary",
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
                            data={subscriptions}
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

export default ManageCompoundSubscriptions;

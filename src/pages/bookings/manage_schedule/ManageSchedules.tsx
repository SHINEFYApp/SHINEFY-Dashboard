import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, CalendarClock, Package, RotateCcw, CalendarDays, XCircle, CheckCircle2, Search } from "lucide-react";
import { toast } from "sonner";
import { useGetSchedules, useCancelSchedule } from "../../../api/features/scheduleBookings.hooks";
import { CustomTable } from "../../../common/CustomTable";
import { TableLoading } from "../../../common/loader";
import { cn } from "../../../utils/utils";

const STATUS_CONFIG = {
    active: {
        label: "Active",
        classes: "bg-emerald-50 text-emerald-700 border border-emerald-200",
        icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    },
    cancelled: {
        label: "Cancelled",
        classes: "bg-red-50 text-red-600 border border-red-200",
        icon: <XCircle className="w-3.5 h-3.5" />,
    },
};

const TYPE_CONFIG = {
    normal: {
        label: "Normal",
        classes: "bg-blue-50 text-blue-700 border border-blue-200",
        icon: <CalendarDays className="w-3.5 h-3.5" />,
    },
    package: {
        label: "Package",
        classes: "bg-amber-50 text-amber-700 border border-amber-200",
        icon: <Package className="w-3.5 h-3.5" />,
    },
};

export default function ManageSchedules() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<"" | "active" | "cancelled">("");
    const [typeFilter, setTypeFilter] = useState<"" | "normal" | "package">("");
    const [search, setSearch] = useState("");
    const [cancellingId, setCancellingId] = useState<number | null>(null);

    const params = {
        page,
        ...(statusFilter && { status: statusFilter }),
        ...(typeFilter && { schedule_type: typeFilter }),
    };

    const { data, isLoading } = useGetSchedules(params);
    const { mutate: cancelSchedule, isPending: isCancelling } = useCancelSchedule({
        onSuccess: () => {
            toast.success("Schedule cancelled and pending bookings refunded.");
            setCancellingId(null);
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message ?? "Failed to cancel schedule.");
            setCancellingId(null);
        },
    });

    const schedules = (data?.data?.schedules?.data ?? []).filter(Boolean);
    const meta = data?.data?.schedules;

    const handleCancel = (id: number) => {
        if (!window.confirm("Cancel this schedule? All pending bookings will be cancelled.")) return;
        setCancellingId(id);
        cancelSchedule(id);
    };

    const filtered = search
        ? schedules.filter((s: any) =>
              s.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
              s.user?.phone_number?.includes(search) ||
              String(s.id).includes(search)
          )
        : schedules;

    const columns = [
        {
            key: "id",
            title: "#",
            width: "w-16",
            render: (_: any, row: any) => (
                <span className="font-mono text-xs text-gray-500">#{row?.id}</span>
            ),
        },
        {
            key: "user",
            title: "Client",
            render: (_: any, row: any) => (
                <div>
                    <p className="font-medium text-gray-800 text-sm">{row?.user?.name ?? "—"}</p>
                    <p className="text-xs text-gray-400">{row?.user?.phone_number}</p>
                </div>
            ),
        },
        {
            key: "schedule_type",
            title: "Type",
            render: (_: any, row: any) => {
                const cfg = TYPE_CONFIG[row?.schedule_type as keyof typeof TYPE_CONFIG];
                if (!cfg) return <span className="text-gray-400 text-xs">—</span>;
                return (
                    <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium", cfg.classes)}>
                        {cfg.icon} {cfg.label}
                    </span>
                );
            },
        },
        {
            key: "service",
            title: "Service",
            render: (_: any, row: any) => (
                <span className="text-sm text-gray-700">
                    {row?.service?.service_name ?? row?.user_package?.package_id ?? "—"}
                </span>
            ),
        },
        {
            key: "date_mode",
            title: "Mode",
            render: (_: any, row: any) => (
                <span className="text-xs text-gray-500 capitalize">
                    {row?.date_mode === "recurring" ? "🔄 Recurring" : row?.date_mode === "auto" ? "♾️ Auto" : "📅 Specific"}
                </span>
            ),
        },
        {
            key: "bookings_count",
            title: "Bookings",
            render: (_: any, row: any) => (
                <div className="flex items-center gap-1.5">
                    <CalendarClock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-semibold text-gray-700">
                        {row?.bookings_count ?? "—"}
                    </span>
                </div>
            ),
        },
        {
            key: "status",
            title: "Status",
            render: (_: any, row: any) => {
                const cfg = STATUS_CONFIG[row?.status as keyof typeof STATUS_CONFIG];
                if (!cfg) return null;
                return (
                    <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium", cfg.classes)}>
                        {cfg.icon} {cfg.label}
                    </span>
                );
            },
        },
        {
            key: "created_at",
            title: "Created",
            render: (_: any, row: any) => (
                <span className="text-xs text-gray-400">
                    {row?.created_at ? new Date(row.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                </span>
            ),
        },
        {
            key: "actions",
            title: "",
            width: "w-32",
            render: (_: any, row: any) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/bookings/schedules/${row?.id}`); }}
                        className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
                    >
                        View
                    </button>
                    {row?.status === "active" && (
                        <button
                            onClick={(e) => { e.stopPropagation(); handleCancel(row.id); }}
                            disabled={isCancelling && cancellingId === row?.id}
                            className="text-xs font-medium text-red-500 hover:text-red-600 transition-colors disabled:opacity-40"
                        >
                            {isCancelling && cancellingId === row?.id ? "..." : "Cancel"}
                        </button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <CalendarClock className="w-6 h-6 text-primary" />
                        Schedule Bookings
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">Manage recurring booking schedules for clients</p>
                </div>
                <button
                    onClick={() => navigate("/bookings/schedules/create")}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-black font-semibold rounded-xl text-sm shadow-sm hover:bg-primary/90 active:scale-[0.98] transition-all"
                >
                    <Plus className="w-4 h-4" />
                    New Schedule
                </button>
            </div>

            {/* Filters bar */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-5 flex flex-wrap gap-3 items-center">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search client name or phone..."
                        className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 bg-gray-50"
                    />
                </div>

                {/* Status filter */}
                <select
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value as any); setPage(1); }}
                    className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/30 text-gray-600"
                >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="cancelled">Cancelled</option>
                </select>

                {/* Type filter */}
                <select
                    value={typeFilter}
                    onChange={(e) => { setTypeFilter(e.target.value as any); setPage(1); }}
                    className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/30 text-gray-600"
                >
                    <option value="">All Types</option>
                    <option value="normal">Normal</option>
                    <option value="package">Package</option>
                </select>

                {/* Reset */}
                {(statusFilter || typeFilter || search) && (
                    <button
                        onClick={() => { setStatusFilter(""); setTypeFilter(""); setSearch(""); setPage(1); }}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <RotateCcw className="w-3.5 h-3.5" /> Reset
                    </button>
                )}
            </div>

            {/* Table */}
            {isLoading ? (
                <TableLoading />
            ) : (
                <CustomTable
                    columns={columns}
                    data={filtered}
                    currentPage={page}
                    totalPages={meta?.last_page ?? 1}
                    totalEntries={meta?.total ?? filtered.length}
                    pageSize={meta?.per_page ?? 20}
                    onPageChange={setPage}
                    onRowClick={(row) => navigate(`/bookings/schedules/${row.id}`)}
                />
            )}

            {!isLoading && filtered.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                    <CalendarClock className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-medium">No schedules found</p>
                    <p className="text-xs mt-1">Create your first schedule to get started</p>
                </div>
            )}
        </div>
    );
}

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft, CalendarClock, User, Package, Wrench,
    CalendarDays, Repeat2, Clock, XCircle, CheckCircle2,
    Calendar, Car, MapPin, AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { useGetScheduleDetails, useCancelSchedule } from "../../../api/features/scheduleBookings.hooks";
import { CustomTable } from "../../../common/CustomTable";
import { TableLoading, SkeletonDemo } from "../../../common/loader";
import { cn } from "../../../utils/utils";

const STATUS_COLORS: Record<string, string> = {
    "0": "bg-amber-50 text-amber-700 border border-amber-200",
    "1": "bg-blue-50 text-blue-700 border border-blue-200",
    "2": "bg-emerald-50 text-emerald-700 border border-emerald-200",
    "3": "bg-red-50 text-red-600 border border-red-200",
    pending: "bg-amber-50 text-amber-700 border border-amber-200",
    "in-progress": "bg-blue-50 text-blue-700 border border-blue-200",
    completed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    canceled: "bg-red-50 text-red-600 border border-red-200",
};
const STATUS_LABELS: Record<string, string> = {
    "0": "Pending", "1": "In Progress", "2": "Completed", "3": "Cancelled",
    pending: "Pending", "in-progress": "In Progress", completed: "Completed", canceled: "Cancelled",
};

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function InfoCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string | undefined; sub?: string }) {
    return (
        <div className="bg-gray-50 rounded-xl p-3.5 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 text-gray-500 shadow-xs">
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{value ?? "—"}</p>
                {sub && <p className="text-xs text-gray-400">{sub}</p>}
            </div>
        </div>
    );
}

export default function ScheduleDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [showCancelModal, setShowCancelModal] = useState(false);

    const { data, isLoading } = useGetScheduleDetails(id!);
    const { mutate: cancelSchedule, isPending: cancelling } = useCancelSchedule({
        onSuccess: (res: any) => {
            toast.success(`Schedule cancelled. ${res?.data?.bookings_cancelled ?? 0} bookings cancelled.`);
            setShowCancelModal(false);
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message ?? "Failed to cancel schedule.");
            setShowCancelModal(false);
        },
    });

    const schedule = data?.data?.schedule;

    const bookingsPerPage = 10;
    const allBookings = schedule?.bookings ?? [];
    const paginatedBookings = allBookings.slice((page - 1) * bookingsPerPage, page * bookingsPerPage);

    const bookingColumns = [
        {
            key: "booking_no",
            title: "Booking #",
            render: (_: any, row: any) => <span className="font-mono text-xs text-gray-500">{row?.booking_no}</span>,
        },
        {
            key: "booking_date",
            title: "Date",
            render: (_: any, row: any) => (
                <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-sm text-gray-700">
                        {row?.booking_date ? new Date(row.booking_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                    </span>
                </div>
            ),
        },
        {
            key: "booking_time",
            title: "Time",
            render: (_: any, row: any) => {
                if (!row?.booking_time) return <span className="text-xs text-gray-400">—</span>;
                const [h, m] = row.booking_time.split(":");
                const hours = parseInt(h, 10);
                const ampm = hours >= 12 ? "PM" : "AM";
                return <span className="text-sm text-gray-600">{`${hours % 12 || 12}:${m} ${ampm}`}</span>;
            },
        },
        {
            key: "status",
            title: "Status",
            render: (_: any, row: any) => {
                const key = String(row?.status);
                return (
                    <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium", STATUS_COLORS[key] ?? "bg-gray-100 text-gray-500")}>
                        {STATUS_LABELS[key] ?? key}
                    </span>
                );
            },
        },
        {
            key: "service_boy_id",
            title: "Service Boy",
            render: (_: any, row: any) => (
                <span className={cn("text-xs", row?.service_boy_id && row.service_boy_id !== 0 ? "text-gray-700" : "text-gray-400 italic")}>
                    {row?.service_boy_id && row.service_boy_id !== 0 ? `#${row.service_boy_id}` : "Unassigned"}
                </span>
            ),
        },
        {
            key: "view",
            title: "",
            render: (_: any, row: any) => (
                <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/bookings/manage/${row?.booking_id}`); }}
                    className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                    View
                </button>
            ),
        },
    ];

    if (isLoading) return <div className="p-6"><SkeletonDemo /></div>;
    if (!schedule) return (
        <div className="min-h-screen bg-gray-50/50 p-6 flex items-center justify-center">
            <div className="text-center text-gray-400">
                <CalendarClock className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Schedule not found</p>
                <button onClick={() => navigate("/bookings/schedules")} className="text-xs text-primary mt-2 hover:underline">
                    Back to schedules
                </button>
            </div>
        </div>
    );

    const isActive = schedule.status === "active";

    return (
        <div className="min-h-screen bg-gray-50/50 p-6">
            <div className="max-w-4xl mx-auto space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate("/bookings/schedules")} className="p-2 rounded-xl hover:bg-white border border-transparent hover:border-gray-200 text-gray-400 hover:text-gray-600 transition-all">
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <CalendarClock className="w-5 h-5 text-primary" />
                                Schedule #{schedule.id}
                            </h1>
                            <p className="text-xs text-gray-400 mt-0.5">
                                Created {new Date(schedule.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold",
                            isActive ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-600 border border-red-200"
                        )}>
                            {isActive ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                            {isActive ? "Active" : "Cancelled"}
                        </span>
                        {isActive && (
                            <button
                                onClick={() => setShowCancelModal(true)}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-all"
                            >
                                <XCircle className="w-4 h-4" /> Cancel Schedule
                            </button>
                        )}
                    </div>
                </div>

                {/* Info grid */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                    <h2 className="text-sm font-semibold text-gray-700 mb-4">Schedule Details</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <InfoCard icon={<User className="w-4 h-4" />} label="Client" value={schedule.user?.name} sub={schedule.user?.phone_number} />
                        <InfoCard
                            icon={schedule.schedule_type === "package" ? <Package className="w-4 h-4" /> : <Wrench className="w-4 h-4" />}
                            label="Type"
                            value={schedule.schedule_type === "package" ? "Package Booking" : "Normal Booking"}
                        />
                        <InfoCard
                            icon={<Wrench className="w-4 h-4" />}
                            label="Service"
                            value={schedule.service?.service_name ?? schedule.user_package?.package_id ?? "—"}
                        />
                        <InfoCard
                            icon={schedule.date_mode === "recurring" ? <Repeat2 className="w-4 h-4" /> : <CalendarDays className="w-4 h-4" />}
                            label="Mode"
                            value={schedule.date_mode === "recurring" ? "Recurring" : "Specific Dates"}
                            sub={
                                schedule.date_mode === "recurring"
                                    ? `${(schedule.recurrence_days ?? []).map((d: number) => DAY_NAMES[d]).join(", ")} · ${schedule.recurrence_start} → ${schedule.recurrence_end}`
                                    : undefined
                            }
                        />
                        {schedule.booking_time && (
                            <InfoCard icon={<Clock className="w-4 h-4" />} label="Time Slot" value={schedule.booking_time} />
                        )}
                        {schedule.address_loc && (
                            <InfoCard icon={<MapPin className="w-4 h-4" />} label="Address" value={schedule.address_loc} />
                        )}
                    </div>
                </div>

                {/* Stats strip */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: "Total Bookings", value: allBookings.length, color: "text-gray-800" },
                        { label: "Pending", value: allBookings.filter((b: any) => String(b.status) === "0" || b.status === "pending").length, color: "text-amber-600" },
                        { label: "Completed", value: allBookings.filter((b: any) => String(b.status) === "2" || b.status === "completed").length, color: "text-emerald-600" },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center">
                            <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Bookings table */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                    <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" /> Bookings
                    </h2>
                    {allBookings.length === 0 ? (
                        <div className="text-center py-10 text-gray-400">
                            <Calendar className="w-8 h-8 mx-auto mb-2 opacity-30" />
                            <p className="text-sm">No bookings in this schedule</p>
                        </div>
                    ) : (
                        <CustomTable
                            columns={bookingColumns}
                            data={paginatedBookings}
                            currentPage={page}
                            totalPages={Math.ceil(allBookings.length / bookingsPerPage)}
                            totalEntries={allBookings.length}
                            pageSize={bookingsPerPage}
                            onPageChange={setPage}
                            onRowClick={(row) => navigate(`/bookings/manage/${row.booking_id}`)}
                        />
                    )}
                </div>
            </div>

            {/* Cancel confirmation modal */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Cancel Schedule?</h3>
                                <p className="text-xs text-gray-500 mt-0.5">This will cancel all pending bookings</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-5">
                            All <strong>{allBookings.filter((b: any) => String(b.status) === "0" || b.status === "pending").length}</strong> pending booking(s) will be cancelled.
                            {schedule.schedule_type === "package" && " Package quantities will be refunded."}
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                Keep Schedule
                            </button>
                            <button
                                onClick={() => cancelSchedule(schedule.id)}
                                disabled={cancelling}
                                className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors disabled:opacity-40"
                            >
                                {cancelling ? "Cancelling..." : "Yes, Cancel"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

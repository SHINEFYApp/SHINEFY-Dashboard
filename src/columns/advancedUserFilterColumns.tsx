import type { AdvancedFilterUser } from "../api/features/advancedUserFilter.services";

export interface ExtraColumnDef {
    key: string;
    title: string;
    render?: (value: any, record: AdvancedFilterUser) => React.ReactNode;
}

export const extraColumnsMap: Record<string, ExtraColumnDef[]> = {
    vehicle_no_booking: [
        {
            key: "vehicles",
            title: "Vehicles",
            render: (value: any[]) =>
                value?.length ? (
                    <div className="flex flex-wrap gap-1">
                        {value.map((v: any, i: number) => (
                            <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                                {v.make} {v.model} ({v.plate_number || "N/A"})
                            </span>
                        ))}
                    </div>
                ) : undefined,
        },
    ],
    one_booking_cancelled: [
        {
            key: "cancelled_booking",
            title: "Cancelled Booking",
            render: (value: any) =>
                value ? (
                    <div className="text-xs leading-relaxed">
                        <div className="font-medium">{value.booking_no}</div>
                        <div className="text-gray-500">{value.service_name}</div>
                        <div className="text-gray-400">{value.booking_date} {value.booking_time}</div>
                        {value.cancel_reason && <div className="text-red-500">Reason: {value.cancel_reason}</div>}
                    </div>
                ) : undefined,
        },
    ],
    one_booking_bad_rating: [
        {
            key: "bad_rating_booking",
            title: "Bad Rating Booking",
            render: (value: any) =>
                value ? (
                    <div className="text-xs leading-relaxed">
                        <div className="font-medium">{value.booking_no}</div>
                        <div className="text-gray-500">{value.service_name}</div>
                        <div className="text-gray-400">{value.booking_date} {value.booking_time}</div>
                        <span className="text-red-500 font-semibold">Rating: {value.rating}/5</span>
                        {value.user_notes && <div className="text-gray-400 italic">"{value.user_notes}"</div>}
                    </div>
                ) : undefined,
        },
    ],
    package_expired: [
        {
            key: "expired_packages",
            title: "Expired Packages",
            render: (value: any[]) =>
                value?.length ? (
                    <div className="flex flex-col gap-1">
                        {value.map((p: any, i: number) => (
                            <div key={i} className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs">
                                <span className="font-medium">{p.package_name}</span>
                                {p.expired_days_ago != null && (
                                    <span className="ml-1">({p.expired_days_ago}d ago)</span>
                                )}
                            </div>
                        ))}
                    </div>
                ) : undefined,
        },
    ],
    n_bookings_date_range: [
        {
            key: "booking_stats",
            title: "Booking Stats",
            render: (value: any) =>
                value ? (
                    <div className="text-xs leading-relaxed">
                        <div className="font-semibold text-primary">{value.bookings_count} bookings</div>
                        <div className="text-gray-500">First: {value.first_booking_date}</div>
                        <div className="text-gray-500">Last: {value.last_booking_date}</div>
                    </div>
                ) : undefined,
        },
    ],
    package_active: [
        {
            key: "active_packages",
            title: "Active Packages",
            render: (value: any[]) =>
                value?.length ? (
                    <div className="flex flex-col gap-1">
                        {value.map((p: any, i: number) => (
                            <div key={i} className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">
                                <span className="font-medium">{p.package_name}</span>
                                {p.days_remaining != null && (
                                    <span className="ml-1">({p.days_remaining}d left)</span>
                                )}
                                {p.is_infinite && <span className="ml-1">(Infinite)</span>}
                            </div>
                        ))}
                    </div>
                ) : undefined,
        },
    ],
    all_bookings_waiting: [
        { key: "waiting_bookings_count", title: "Waiting Bookings" },
    ],
    package_expiring_soon: [
        {
            key: "expiring_packages",
            title: "Expiring Packages",
            render: (value: any[]) =>
                value?.length ? (
                    <div className="flex flex-col gap-1">
                        {value.map((p: any, i: number) => (
                            <div key={i} className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs">
                                <span className="font-medium">{p.package_name}</span>
                                <span className="ml-1">({p.days_remaining}d left)</span>
                            </div>
                        ))}
                    </div>
                ) : undefined,
        },
    ],
    high_cancellation: [
        { key: "total_bookings", title: "Total Bookings" },
        { key: "cancelled_bookings", title: "Cancelled" },
        {
            key: "cancel_percentage",
            title: "Cancel %",
            render: (value: number) => (
                <span className={`font-semibold ${value >= 50 ? "text-red-600" : value >= 20 ? "text-amber-600" : "text-green-600"}`}>
                    {value != null ? `${value}%` : undefined}
                </span>
            ),
        },
    ],
    service_boy_late: [
        { key: "late_bookings_count", title: "Late Bookings" },
        {
            key: "total_late_minutes",
            title: "Late Minutes",
            render: (value: number) => (
                <span className="font-semibold text-red-600">{value != null ? `${value} min` : undefined}</span>
            ),
        },
    ],
};
